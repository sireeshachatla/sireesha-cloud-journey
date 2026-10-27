# OpenTofu creates this S3 learning bucket, then destroy removes it.

terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

data "aws_caller_identity" "current" {}

resource "aws_s3_bucket" "learning" {
  bucket = "sireesha-week12-${data.aws_caller_identity.current.account_id}"

  tags = {
    Owner       = "sireesha"
    Environment = "dev"
    Project     = "learning"
    Week        = "12"
  }
}

output "bucket_name" {
  value = aws_s3_bucket.learning.bucket
}
