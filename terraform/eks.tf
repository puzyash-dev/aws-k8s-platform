module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "${var.project_name}-${var.environment}-cluster"
  cluster_version = "1.31"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.public_subnets

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true
  cluster_endpoint_public_access_cidrs = ["0.0.0.0/0"] 

  enable_cluster_creator_admin_permissions = true

  eks_managed_node_groups = {
    default = {
      min_size     = 1
      max_size     = 3
      desired_size = 1

      instance_types = ["t3.small"]
      capacity_type  = "ON_DEMAND"
    }
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}