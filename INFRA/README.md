# GitOps Infrastructure for Portfolio Project

This directory contains the infrastructure-as-code manifests for the Portfolio project, including ArgoCD configuration, monitoring with Prometheus/Grafana, and load testing with Locust.

## Architecture

### Kustomize Structure
- **`portfolio/base`**: Base Kubernetes resources (Deployments, Services, Ingress, RBAC).
- **`portfolio/overlays/prod`**: Production-specific configurations.
- **`locust/base`**: Locust deployment and script (ConfigMap).
- **`locust/overlays/loadtest`**: Loadtest-specific configuration.

### GitOps Workflow
- **ArgoCD** is used to manage the deployment of all components.
- The **App of Apps** pattern is implemented via `INFRA/argocd/root.yaml`, which points to the `INFRA/argocd/applications/` directory.

### Monitoring
- **Prometheus** and **Grafana** are deployed using the `kube-prometheus-stack` Helm chart.
- Grafana is accessible via Ingress at `http://grafana.local`.

### Load Testing
- **Locust** is deployed and accessible via Ingress at `http://locust.local`.
- A custom `locustfile.py` is provided to test the application's endpoints.

## Setup
Follow the instructions in [OPERATIONS.md](./OPERATIONS.md) to set up the environment.
