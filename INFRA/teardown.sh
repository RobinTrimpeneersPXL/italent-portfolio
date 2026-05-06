#!/bin/bash

# Teardown Script for Portfolio Project
# Run this script in a bash shell

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${RED}Starting Teardown...${NC}"

if k3d cluster list | grep -q "portfolio"; then
    echo -e "${YELLOW}Deleting 'portfolio' cluster...${NC}"
    k3d cluster delete portfolio
else
    echo " 'portfolio' cluster not found."
fi

echo -e "\n${GREEN}Teardown Complete!${NC}"
