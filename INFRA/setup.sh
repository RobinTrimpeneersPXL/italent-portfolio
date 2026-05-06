#!/bin/bash

# Setup Script for Portfolio GitOps Infrastructure
# Run this script in a bash shell (Linux, macOS, or Git Bash on Windows)

# Colors for output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Setup...${NC}"

# 1. Create Cluster
echo -e "\n${CYAN}[1/4] Creating Cluster...${NC}"

if k3d cluster list | grep -q "portfolio"; then
    echo -e "${YELLOW}Deleting existing 'portfolio' cluster...${NC}"
    k3d cluster delete portfolio
fi

echo "Creating 'portfolio' cluster..."
k3d cluster create portfolio -p "80:80@loadbalancer" -p "443:443@loadbalancer" --wait

# 2. Install ArgoCD
echo -e "\n${CYAN}[2/4] Installing ArgoCD...${NC}"

kubectl create namespace argocd 2>/dev/null || true
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml --server-side

echo "Waiting for ArgoCD components to start (30s)..."
sleep 30

# 3. Deploy Applications
echo -e "\n${CYAN}[3/4] Deploying Root Application...${NC}"

kubectl apply -f INFRA/argocd/root.yaml

# 4. Finalization
echo -e "\n${CYAN}[4/4] Finalizing...${NC}"

# Get ArgoCD Password
echo -n "Retrieving ArgoCD Admin Password: "
ARGOCD_PWD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)
echo -e "${YELLOW}$ARGOCD_PWD${NC}"

echo -e "\n${GREEN}Setup Complete!${NC}"
echo "----------------------------------------------------------------"
echo "IMPORTANT: Add to hosts file: 127.0.0.1 portfolio.local test.portfolio.local grafana.local locust.local"
echo "Portfolio App (PROD): http://portfolio.local"
echo "Portfolio App (TEST): http://test.portfolio.local"
echo "Grafana: http://grafana.local (admin / prom-operator)"
echo "Locust UI: http://locust.local"
echo "ArgoCD UI: https://localhost:8085 (admin / $ARGOCD_PWD)"
echo "----------------------------------------------------------------"
