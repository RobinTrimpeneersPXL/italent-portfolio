#!/bin/bash

# Direct Setup Script (No ArgoCD)
# Run this to deploy everything directly to your cluster

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Starting Direct Deployment (No ArgoCD)...${NC}"

# Check for Helm
if ! command -v helm &> /dev/null; then
    echo -e "${RED}Error: helm is not installed.${NC}"
    echo "Please install it using: curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash"
    exit 1
fi

# 1. Create Cluster
echo -e "\n${CYAN}[1/5] Creating Cluster...${NC}"
k3d cluster delete portfolio 2>/dev/null
k3d cluster create portfolio -p "80:80@loadbalancer" -p "443:443@loadbalancer" --wait

# 2. Build and Import Images
echo -e "\n${CYAN}[2/5] Building and Importing Images...${NC}"
docker build -t portfolio-frontend:latest ./Portfolio
docker build -t portfolio-backend:latest ./api
k3d image import portfolio-frontend:latest portfolio-backend:latest -c portfolio

# 3. Install Prometheus & Grafana (via Helm)
echo -e "\n${CYAN}[3/5] Installing Monitoring Stack...${NC}"
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
kubectl create ns monitoring 2>/dev/null
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set grafana.ingress.enabled=true \
  --set grafana.ingress.hosts='{grafana.local}' \
  --set "grafana.grafana\.ini.security.allow_embedding=true" \
  --set "grafana.grafana\.ini.auth\.anonymous.enabled=true" \
  --set "grafana.grafana\.ini.auth\.anonymous.org_role=Admin"

# Get Grafana Password
echo -n "Retrieving Grafana Admin Password: "
GRAFANA_PWD=$(kubectl -n monitoring get secret kube-prometheus-stack-grafana -o jsonpath="{.data.admin-password}" | base64 -d)
echo -e "${YELLOW}$GRAFANA_PWD${NC}"

# 4. Install KEDA (via Helm)
echo -e "\n${CYAN}[4/5] Installing KEDA...${NC}"
helm repo add kedacore https://kedacore.github.io/charts
helm repo update
kubectl create ns keda 2>/dev/null
helm install keda kedacore/keda --namespace keda

# 5. Deploy App and Locust
echo -e "\n${CYAN}[5/5] Deploying Applications...${NC}"

kubectl create ns portfolio-prod 2>/dev/null
kubectl apply -k INFRA/kustomize/portfolio/overlays/prod

kubectl create ns locust 2>/dev/null
kubectl apply -k INFRA/kustomize/locust/overlays/loadtest

echo -e "\n${GREEN}Direct Deployment Complete!${NC}"
echo "----------------------------------------------------------------"
echo "Portfolio: http://portfolio.local"
echo "Grafana:   http://grafana.local (admin / prom-operator)"
echo "Locust UI: http://locust.local"
echo "----------------------------------------------------------------"
echo -e "${YELLOW}Note: It may take 1-2 minutes for all pods to start.${NC}"
