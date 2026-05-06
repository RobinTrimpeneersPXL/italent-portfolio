# Setup Script for Portfolio GitOps Infrastructure
# Run this script in PowerShell

Write-Host "Starting Setup..." -ForegroundColor Green

# 1. Create Cluster
Write-Host "`n[1/4] Creating Cluster..." -ForegroundColor Cyan

if (k3d cluster list | Select-String "portfolio") {
    Write-Host "Deleting existing 'portfolio' cluster..." -ForegroundColor Yellow
    k3d cluster delete portfolio
}

Write-Host "Creating 'portfolio' cluster..."
k3d cluster create portfolio -p "80:80@loadbalancer" -p "443:443@loadbalancer" --wait

# 2. Install ArgoCD
Write-Host "`n[2/4] Installing ArgoCD..." -ForegroundColor Cyan

kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

Write-Host "Waiting for ArgoCD components to start (30s)..."
Start-Sleep -Seconds 30

# 3. Deploy Applications
Write-Host "`n[3/4] Deploying Root Application..." -ForegroundColor Cyan

kubectl apply -f INFRA/argocd/root.yaml

# 4. Finalization
Write-Host "`n[4/4] Finalizing..." -ForegroundColor Cyan

Write-Host "`nSetup Complete!" -ForegroundColor Green
Write-Host "----------------------------------------------------------------"
Write-Host "IMPORTANT: Add to hosts file: 127.0.0.1 portfolio.local test.portfolio.local grafana.local locust.local"
Write-Host "Portfolio App (PROD): http://portfolio.local"
Write-Host "Portfolio App (TEST): http://test.portfolio.local"
Write-Host "Grafana: http://grafana.local (admin / prom-operator)"
Write-Host "Locust UI: http://locust.local"
Write-Host "ArgoCD UI: kubectl port-forward svc/argocd-server -n argocd 8080:443"
Write-Host "----------------------------------------------------------------"
