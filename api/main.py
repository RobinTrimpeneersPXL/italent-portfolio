from fastapi import FastAPI, BackgroundTasks, HTTPException
from kubernetes import client, config
import os
import time
import threading
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI()

# Instrument the app
Instrumentator().instrument(app).expose(app)

# Load Kubernetes configuration
try:
    # Use in-cluster config if running inside K8s
    config.load_incluster_config()
except config.ConfigException:
    # Use local kubeconfig for local development
    config.load_kubeconfig()

v1 = client.CoreV1Api()
apps_v1 = client.AppsV1Api()

NAMESPACE = os.getenv("K8S_NAMESPACE", "default")
FRONTEND_DEPLOYMENT = os.getenv("FRONTEND_DEPLOYMENT", "frontend")

@app.get("/api/stats")
async def get_stats():
    try:
        deployment = apps_v1.read_namespaced_deployment(FRONTEND_DEPLOYMENT, NAMESPACE)
        pods = v1.list_namespaced_pod(NAMESPACE, label_selector=f"app={FRONTEND_DEPLOYMENT}")
        
        pod_list = []
        for pod in pods.items:
            pod_list.append({
                "name": pod.metadata.name,
                "status": pod.status.phase,
                "ip": pod.status.pod_ip
            })
            
        return {
            "replicas": deployment.spec.replicas,
            "ready_replicas": deployment.status.ready_replicas or 0,
            "pods": pod_list
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/scale")
async def scale_deployment(replicas: int):
    try:
        body = {"spec": {"replicas": replicas}}
        apps_v1.patch_namespaced_deployment_scale(FRONTEND_DEPLOYMENT, NAMESPACE, body)
        return {"message": f"Scaled to {replicas} replicas"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/pods/{pod_name}")
async def kill_pod(pod_name: str):
    try:
        v1.delete_namespaced_pod(pod_name, NAMESPACE)
        return {"message": f"Pod {pod_name} killed"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def cpu_stress(duration: int):
    end_time = time.time() + duration
    while time.time() < end_time:
        # Simple busy loop to consume CPU
        pass

@app.post("/api/stress")
async def start_stress(duration: int = 60):
    # This runs in the API container, which might not be what we want if we want to stress the FRONTEND.
    # But for a demo, stressing the API or a specific "stress-test" pod is fine.
    # To stress the cluster, we'd ideally launch a Job.
    threading.Thread(target=cpu_stress, args=(duration,)).start()
    return {"message": f"Stress test started for {duration} seconds"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
