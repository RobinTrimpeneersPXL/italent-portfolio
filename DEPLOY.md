# Deployment Guide: Interactive Kubernetes Portfolio

Follow these steps to deploy your interactive portfolio on a local `k3d` cluster and expose it via Cloudflare.

## Option 1: GitOps Infrastructure (Recommended)

This method uses ArgoCD, Prometheus, Grafana, and KEDA for a production-like setup.

### 1. Prerequisites
- [k3d](https://k3d.io/), [Docker](https://www.docker.com/), [kubectl](https://kubernetes.io/) installed.
- [ArgoCD CLI](https://argo-cd.readthedocs.io/en/stable/cli_installation/) (optional).

### 2. Automatic Setup
Run the comprehensive setup script:

**PowerShell:**
```powershell
.\INFRA\setup.ps1
```

**Bash:**
```bash
chmod +x INFRA/setup.sh
./INFRA/setup.sh
```

### 3. Port Forwarding & Access
Use the provided scripts to access all services:
```bash
# Bash
./INFRA/start-port-forwards.sh

# PowerShell
.\INFRA\start-port-forwards.ps1
```

Access URLs:
- **Portfolio App**: http://localhost:8080
- **Grafana**: http://localhost:3000 (admin / prom-operator)
- **Locust**: http://localhost:8090
- **ArgoCD**: https://localhost:8085

---

## Option 2: Manual Local Deployment

## 1. Create a k3d Cluster
Expose port 8080 on your host to the Traefik Ingress controller on the cluster.
```bash
k3d cluster create my-portfolio -p "8080:80@loadbalancer" --agents 2
```

## 2. Build Docker Images
Build the frontend and backend images locally.
```bash
# Build Frontend
cd Portfolio
docker build -t frontend:latest .

# Build Backend
cd ../api
docker build -t backend:latest .
```

## 3. Load Images into k3d
```bash
k3d image import frontend:latest backend:latest -c my-portfolio
```

## 4. Apply Kubernetes Manifests
Apply the RBAC and application manifests.
```bash
cd ..
kubectl apply -f k8s/rbac.yaml
kubectl apply -f k8s/api.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/ingress.yaml
```

## 5. Expose via Cloudflare Tunnel
Run the tunnel on your host machine to point to the k3d ingress.
```bash
cloudflared tunnel --url http://localhost:8080
```
*Note: For a permanent setup, use `cloudflared tunnel run <tunnel-name>` after configuring it with your domain.*

## 6. Verify
1. Open `http://localhost:8080` or your Cloudflare URL.
2. Navigate to the **K8s Playground**.
3. Try scaling the deployment, killing a pod, or running a stress test.
4. Watch the "Active Pods" list update in real-time as Kubernetes manages your containers!
