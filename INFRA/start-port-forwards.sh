#!/bin/bash

# Port Forwarding Script for Portfolio Project (Direct Deployment)
# Run this script in a bash shell

# Colors for output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${CYAN}Starting Port Forwards...${NC}"

pids=()

start_pf() {
    local name=$1
    local ns=$2
    local res=$3
    local port=$4
    
    echo -n "Starting $name ($port)..."
    kubectl -n "$ns" port-forward "$res" "$port" > /dev/null 2>&1 &
    local pid=$!
    pids+=($pid)
    
    sleep 3
    if ps -p $pid > /dev/null; then
        echo -e " [${GREEN}OK${NC}]"
    else
        echo -e " [${RED}FAILED${NC}]"
    fi
}

# Wait for namespaces to exist
echo "Checking for services..."
until kubectl get ns portfolio-prod >/dev/null 2>&1; do sleep 2; done

start_pf "Portfolio App" "portfolio-prod" "svc/frontend-service" "8080:80"
start_pf "Locust UI"     "locust"         "svc/locust"            "8090:8089"

# Optional: Port forward Monitoring if installed
if kubectl get ns monitoring >/dev/null 2>&1; then
    start_pf "Grafana"       "monitoring"     "svc/kube-prometheus-stack-grafana" "3000:80"
fi

echo -e "\n----------------------------------------------------------------"
echo -e "Port forwards are running in the background."
echo -e "Portfolio: http://localhost:8080"
echo -e "Locust:    http://localhost:8090"
if kubectl get ns monitoring >/dev/null 2>&1; then
echo -e "Grafana:   http://localhost:3000 (admin / prom-operator)"
fi
echo -e "----------------------------------------------------------------"
echo -e "Press Ctrl+C to stop all forwards..."

# Function to kill background processes on exit
cleanup() {
    echo -e "\nStopping jobs..."
    for pid in "${pids[@]}"; do
        kill $pid > /dev/null 2>&1
    done
    exit
}

trap cleanup SIGINT

# Keep script running
while true; do sleep 1; done
