# Operations Manual - Portfolio GitOps Infrastructure

## Prerequisites
- Docker
- k3d
- kubectl

## Quick Setup
Run the setup script to automatically create the cluster and deploy the applications via ArgoCD.

**PowerShell:**
```powershell
.\INFRA\setup.ps1
```

**Bash:**
```bash
chmod +x INFRA/setup.sh
./INFRA/setup.sh
```

## Manual Steps

### 1. Cluster Creation
```bash
k3d cluster create portfolio -p "80:80@loadbalancer" -p "443:443@loadbalancer"
```

### 2. ArgoCD Installation
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### 3. Application Deployment
Apply the root application to start the "App of Apps" sync:
```bash
kubectl apply -f INFRA/argocd/root.yaml
```

## Port Forwarding
If you haven't configured your hosts file or prefer direct access, you can use the provided port forwarding scripts:

**PowerShell:**
```powershell
.\INFRA\start-port-forwards.ps1
```

**Bash:**
```bash
chmod +x INFRA/start-port-forwards.sh
./INFRA/start-port-forwards.sh
```

## Teardown
To clean up and delete the cluster:

**PowerShell:**
```powershell
.\INFRA\teardown.ps1
```

**Bash:**
```bash
chmod +x INFRA/teardown.sh
./INFRA/teardown.sh
```

## Cloudflare Zero Trust Setup (Optional)

To expose your services securely to the internet using Cloudflare Tunnels:

1.  **Create a Tunnel**: In the Cloudflare Zero Trust Dashboard, go to **Networks > Tunnels** and create a new tunnel.
2.  **Get Token**: Copy the **Tunnel Token** provided by Cloudflare.
3.  **Update Secret**: Edit `INFRA/kustomize/cloudflared/base/secret.yaml` and replace `REPLACE_WITH_YOUR_CLOUDFLARE_TUNNEL_TOKEN` with your actual token.
4.  **Configure Hostnames**: In the Cloudflare Tunnel configuration (Public Hostnames tab), add:
    *   `portfolio.yourdomain.com` -> `http://portfolio-ingress.portfolio-prod.svc.cluster.local`
    *   `grafana.yourdomain.com` -> `http://kube-prometheus-stack-grafana.monitoring.svc.cluster.local`
    *   `locust.yourdomain.com` -> `http://locust.locust.svc.cluster.local:8089`
5.  **Enable App**: The `cloudflare-tunnel` application is now part of the ArgoCD root and will be deployed automatically if tracked in your repo.

## Verification

### Host Configuration
Add the following to your hosts file:
```
127.0.0.1 portfolio.local grafana.local locust.local
```

### Accessing Services
- **Portfolio App (PROD):** [http://portfolio.local](http://portfolio.local)
- **Portfolio App (TEST):** [http://test.portfolio.local](http://test.portfolio.local)
- **Grafana:** [http://grafana.local](http://grafana.local)
  - Default User: `admin`
  - Default Password: `prom-operator`
- **Locust UI:** [http://locust.local](http://locust.local)
- **ArgoCD UI:** Access via port-forward:
  ```bash
  kubectl port-forward svc/argocd-server -n argocd 8080:443
  ```
  Open [https://localhost:8080](https://localhost:8080)

## Monitoring & Observability

The infrastructure includes a pre-configured monitoring stack:

1.  **Metrics Endpoint**: The FastAPI backend is instrumented and exposes metrics at `http://portfolio.local/metrics`.
2.  **Service Discovery**: A `ServiceMonitor` is deployed to allow Prometheus to automatically scrape the backend.
3.  **Grafana Dashboard**: A custom "Portfolio Backend - Golden Signals" dashboard is automatically imported into Grafana.
    *   To view: Log in to Grafana at `http://grafana.local` and search for "Portfolio Backend".

## Event-Driven Scaling (KEDA)

The frontend is configured to scale automatically based on traffic:
1.  **Threshold**: 10 requests per second.
2.  **Range**: 1 to 5 replicas.
3.  **Mechanism**: KEDA monitors Prometheus metrics and adjusts the deployment size in real-time.

## CI/CD Workflow

The project uses GitHub Actions for automated building and deployment:

1.  **Build and Deploy**:
    *   Triggered by tags starting with `TEST_v*` or `PROD_v*`.
    *   Builds Docker images for frontend and backend.
    *   Pushes images to GitHub Container Registry (GHCR).
    *   Updates the image tags in the corresponding Kustomize overlays.
    *   Commits changes back to the repository, triggering ArgoCD to sync.

2.  **Pipeline Gating**:
    *   Triggered after a successful "Build and Deploy" workflow.
    *   Runs a Locust load test against the `TEST` environment.
    *   **Thresholds**: Fails if Average Response Time > 500ms or Error Rate > 1%.
    *   Uploads a detailed load test report as a workflow artifact.

## Load Testing
1. Access the Locust UI at [http://locust.local](http://locust.local).
2. Set the target host to `http://portfolio-ingress.portfolio-prod.svc.cluster.local` (internal) or `http://portfolio.local`.
3. Start swarming.
