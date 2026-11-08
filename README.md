# AWS K8s Platform

Production-ready infrastructure and application deployment setup using Terraform, Kubernetes (EKS), Helm, and Node.js.

## Architecture
[ AWS VPC ] 
  ├── Public Subnets (NAT Gateway, ALB)
  └── Private Subnets
        └── EKS Cluster (Kubernetes)
              ├── Node Group (t3.medium)
              └── Pods (Node.js API + PostgreSQL + Redis)

## Prerequisites & AWS Setup
1. Install tools: Terraform >= 1.0, AWS CLI, Helm v3, Docker.
2. Configure your AWS credentials by running: aws configure (ensure your region is set to ap-northeast-1).

## Project Structure
- app/ - Node.js Express backend API with PostgreSQL and Redis integration.
- helm/app-chart/ - Helm chart for deploying the application stack.
- terraform/ - Terraform configuration for AWS VPC, EKS cluster, and cost management.
- .github/workflows/ - CI/CD pipeline for automated Terraform and Helm validation.

## Configuration (.env.example)
Copy app/.env.example to app/.env and adjust variables if running locally.

## Quick Start (Dry-Run / Local Check)
1. Validate Terraform plan: cd terraform && terraform init && terraform plan
2. Test Helm chart rendering: helm template my-release helm/app-chart

## Cloud Deployment Guide (AWS EKS)

⚠️ COST WARNING: Running an EKS control plane costs ~$0.10/hour (~$72/month) plus node instances (t3.medium) and NAT Gateway. Always destroy your infrastructure when not in use!

1. Deploy Infrastructure (Terraform): cd terraform && terraform apply
2. Configure kubectl to connect to your EKS cluster: aws eks update-kubeconfig --region ap-northeast-1 --name aws-k8s-platform-dev-cluster
3. Deploy Application (Helm): helm install my-app helm/app-chart
4. Cleanup / Destroy (Save your money!): cd terraform && terraform destroy