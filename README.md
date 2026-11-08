# AWS K8s Platform

Production-ready infrastructure and application deployment setup using Terraform, Kubernetes (EKS), Helm, and Node.js.

## Project Structure
- app/ - Node.js Express backend API with PostgreSQL and Redis integration.
- helm/app-chart/ - Helm chart for deploying the application stack.
- terraform/ - Terraform configuration for AWS VPC, EKS cluster, and cost management (AWS Budgets).
- .github/workflows/ - CI/CD pipeline for automated Terraform and Helm validation.

## Prerequisites
- Terraform >= 1.0
- AWS CLI
- Helm v3
- Docker

## Quick Start (Dry-Run / Local Check)
1. Validate Terraform plan by running: cd terraform && terraform init && terraform plan
2. Test Helm chart rendering by running: helm template my-release helm/app-chart