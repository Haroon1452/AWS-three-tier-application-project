# Deployment Guide

## Prerequisites

- AWS account
- AWS CLI (optional)
- Git
- EC2 access through Systems Manager or SSH
- Appropriate IAM permissions

## Deployment Overview

1. Create a VPC and networking resources.
2. Create public and private subnets across Availability Zones.
3. Configure Internet and NAT Gateways.
4. Create route tables and security groups.
5. Provision the RDS MySQL instance and DB subnet group.
6. Configure Secrets Manager and the EC2 IAM role.
7. Prepare the application EC2 instance.
8. Create the application Launch Template and Auto Scaling Group.
9. Configure the application target group and load balancer.
10. Prepare the web EC2 instance.
11. Create the web Launch Template and Auto Scaling Group.
12. Configure the web target group and load balancer.
13. Upload static website files to S3.
14. Configure CloudFront origins and cache behaviors.
15. Test the public website and application routes.

## Verification

After deployment, verify:

- CloudFront distribution is enabled and deployed.
- Static files load from the CloudFront URL.
- Application paths reach the Web tier.
- Web targets are healthy.
- Application targets are healthy.
- The application can connect to RDS, if database integration is enabled.
