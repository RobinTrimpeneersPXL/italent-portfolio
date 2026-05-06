#!/bin/bash

# Define color codes for terminal output
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 Portfolio Deployment Utility${NC}"
echo -e "-------------------------------"

echo -e "\nSelect Deployment Mode:"
echo "1. Manual Local (k3d + kubectl)"
echo "2. GitOps Infrastructure (ArgoCD + Prometheus + KEDA)"
read -p "Enter choice (1 or 2): " choice

if [ "$choice" == "2" ]; then
    echo -e "\n${GREEN}📦 Launching GitOps Setup...${NC}"
    chmod +x ./INFRA/setup.sh
    ./INFRA/setup.sh
    exit
fi

echo -e "\n${CYAN}🚀 Starting Manual Deployment...${NC}"

# Set the script directory path
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

# 1. Create k3d cluster if it does not exist
CLUSTER_NAME="my-portfolio"

if k3d cluster list | grep -q "$CLUSTER_NAME"; then
    echo -e "${YELLOW}✅ Cluster '$CLUSTER_NAME' already exists. Skipping creation.${NC}"
else
    echo -e "${MAGENTA}📦 Creating k3d cluster '$CLUSTER_NAME' on port 8082...${NC}"
    k3d cluster create "$CLUSTER_NAME" -p "8082:80@loadbalancer" --agents 2
fi

# 2. Build Docker Images
echo -e "${MAGENTA}🏗️ Building Frontend Image...${NC}"
docker build -t frontend:latest "$SCRIPT_DIR/Portfolio"

echo -e "${MAGENTA}🏗️ Building Backend Image...${NC}"
docker build -t backend:latest "$SCRIPT_DIR/api"

# 3. Import Images into k3d
echo -e "${MAGENTA}🚚 Importing images into cluster...${NC}"
k3d image import frontend:latest backend:latest -c "$CLUSTER_NAME"

# 4. Apply K8s Manifests
echo -e "${MAGENTA}☸️ Applying Kubernetes Manifests...${NC}"
(
    cd "$SCRIPT_DIR/k8s" || exit
    kubectl apply -f rbac.yaml
    kubectl apply -f api.yaml
    kubectl apply -f frontend.yaml
    kubectl apply -f ingress.yaml
)

echo -e "\n${GREEN}✨ Deployment Complete! ✨${NC}"
echo "--------------------------------------------------"
echo "Access your portfolio at: http://localhost:8082"
echo "--------------------------------------------------"
echo -e "\n${CYAN}To expose via Cloudflare, run:${NC}"
echo "cloudflared tunnel --url http://localhost:8082"