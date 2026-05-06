# Interactive K8s Portfolio Startup Script

Write-Host "🚀 Portfolio Deployment Utility" -ForegroundColor Cyan
Write-Host "-------------------------------"

$choice = Read-Host "`nSelect Deployment Mode:`n1. Manual Local (k3d + kubectl)`n2. GitOps Infrastructure (ArgoCD + Prometheus + KEDA)`nEnter choice (1 or 2)"

if ($choice -eq "2") {
    Write-Host "`n📦 Launching GitOps Setup..." -ForegroundColor Green
    .\INFRA\setup.ps1
    exit
}

Write-Host "`n🚀 Starting Manual Deployment..." -ForegroundColor Cyan

# Use $PSScriptRoot to make paths relative to the script's folder
$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = "." }

# 1. Create k3d cluster if it doesn't exist
$clusterName = "my-portfolio"
$clusters = k3d cluster list --no-headers
if ($clusters -match $clusterName) {
    Write-Host "✅ Cluster '$clusterName' already exists. Skipping creation." -ForegroundColor Yellow
} else {
    Write-Host "📦 Creating k3d cluster '$clusterName' on port 8082..." -ForegroundColor Magenta
    k3d cluster create $clusterName -p "8082:80@loadbalancer" --agents 2
}

# 2. Build Docker Images
Write-Host "🏗️ Building Frontend Image..." -ForegroundColor Magenta
Push-Location "$scriptDir/Portfolio"
docker build -t frontend:latest .
Pop-Location

Write-Host "🏗️ Building Backend Image..." -ForegroundColor Magenta
Push-Location "$scriptDir/api"
docker build -t backend:latest .
Pop-Location

# 3. Import Images into k3d
Write-Host "🚚 Importing images into cluster..." -ForegroundColor Magenta
k3d image import frontend:latest backend:latest -c $clusterName

# 4. Apply K8s Manifests
Write-Host "☸️ Applying Kubernetes Manifests..." -ForegroundColor Magenta
Push-Location "$scriptDir/k8s"
kubectl apply -f rbac.yaml
kubectl apply -f api.yaml
kubectl apply -f frontend.yaml
kubectl apply -f ingress.yaml
Pop-Location

Write-Host "`n✨ Deployment Complete! ✨" -ForegroundColor Green
Write-Host "--------------------------------------------------"
Write-Host "Access your portfolio at: http://localhost:8082"
Write-Host "--------------------------------------------------"
Write-Host "`nTo expose via Cloudflare, run:" -ForegroundColor Cyan
Write-Host "cloudflared tunnel --url http://localhost:8082"
