
# AWS Three-Tier Portfolio Website

A cloud-hosted portfolio website deployed on Amazon Web Services (AWS), using a multi-tier architecture with Amazon CloudFront, Amazon S3, Elastic Compute Cloud (EC2), Elastic Load Balancing, Auto Scaling, and Amazon RDS for MySQL.

**Live Website:** https://d24rflhxcpvhlm.cloudfront.net

**GitHub Repository:** https://github.com/Haroon1452/aws-portfolio-project

**AWS Region:** Europe (Stockholm) — `eu-north-1`

## Project Overview

This project demonstrates the deployment of a web application using multiple AWS services. The architecture separates static website delivery, web request handling, application processing, and database hosting.

CloudFront is used as the public content delivery entry point. Static website content is served from S3, while selected application paths are routed to an Application Load Balancer and the web tier.

The web tier communicates with the application tier through a separate load balancer. Amazon RDS for MySQL has been provisioned as the database service.

## Architecture Components

| AWS Service | Purpose |
|---|---|
| Amazon VPC | Isolated networking environment |
| Subnets | Network segmentation across Availability Zones |
| Internet Gateway | Internet connectivity for public subnets |
| NAT Gateway | Outbound internet access for private resources |
| Amazon EC2 | Hosts web and application tier instances |
| Launch Templates | Defines EC2 launch configurations |
| Auto Scaling Groups | Manages EC2 instance capacity |
| Application Load Balancer | Distributes incoming application traffic |
| Amazon S3 | Stores static website assets |
| Amazon CloudFront | Delivers content through a CDN |
| Amazon RDS for MySQL | Managed relational database service |
| AWS Secrets Manager | Stores application/database secrets |
| AWS IAM | Controls permissions for AWS resources |

## Architecture Flow

1. Users access the website through CloudFront.
2. CloudFront serves static content from the S3 origin.
3. Requests matching `/api/*` and `/admin*` are routed to the Web Load Balancer.
4. The Web Load Balancer distributes requests to the Web EC2 tier.
5. The Web tier forwards application requests to the Application Load Balancer.
6. The Application Load Balancer distributes requests to the Application EC2 tier.
7. The application tier is designed to use Amazon RDS for MySQL.
8. AWS Secrets Manager is used for secure credential storage where configured.

See [Architecture Documentation](docs/architecture.md) for details.

## Implementation Status

| Component | Status |
|---|---|
| VPC and networking resources | Created |
| Web tier | Working |
| Application tier | Working |
| CloudFront distribution | Working |
| S3 static content origin | Configured |
| RDS MySQL instance | Created |
| Database connectivity and application persistence | Requires validation |
| Exact Web/App subnet placement | Requires verification |

## Key Learning Outcomes

- Building an AWS VPC networking environment
- Working with public and private subnets
- Configuring Internet and NAT Gateways
- Deploying EC2 instances
- Creating Launch Templates and Auto Scaling Groups
- Configuring Application Load Balancers
- Hosting static content in Amazon S3
- Configuring CloudFront origins and cache behaviors
- Provisioning Amazon RDS for MySQL
- Understanding IAM roles and Secrets Manager
- Designing a multi-tier cloud architecture

## Security Considerations

- Avoid exposing database instances directly to the internet.
- Restrict database access to the application tier.
- Restrict EC2 management access; prefer AWS Systems Manager Session Manager over public SSH.
- Use IAM roles instead of hardcoded AWS credentials.
- Store sensitive configuration in AWS Secrets Manager.
- Never commit passwords, secret values, private keys, or database connection strings to GitHub.

## Documentation

- [Architecture](docs/architecture.md)
- [Deployment Guide](docs/deployment-guide.md)
- [Networking and Security](docs/networking-security.md)
- [Load Balancing and Auto Scaling](docs/load-balancing-auto-scaling.md)
- [Database and Secrets](docs/database-and-secrets.md)
- [Validation and Troubleshooting](docs/validation-troubleshooting.md)

## Project Information

**Developer:** Haroon Ali  
**Project Type:** AWS Cloud Engineering / Infrastructure Deployment  
**AWS Region:** `eu-north-1`

---

This project is part of my practical AWS Cloud Engineering learning journey.
