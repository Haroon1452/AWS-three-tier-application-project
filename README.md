# AWS Three-Tier Portfolio Website

A hands-on AWS Cloud Engineering project demonstrating a cloud-hosted portfolio website, content delivery, web and application tiers, load balancing, Auto Scaling, and managed database infrastructure.

**Live Website:** [https://d24rflhxcpvhlm.cloudfront.net](https://d24rflhxcpvhlm.cloudfront.net)

**GitHub Repository:** [aws-portfolio-project](https://github.com/Haroon1452/aws-portfolio-project)

**AWS Region:** Europe (Stockholm) — `eu-north-1`

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture Diagram](#architecture-diagram)
- [AWS Services](#aws-services)
- [Request Flow](#request-flow)
- [Implementation Status](#implementation-status)
- [Security Considerations](#security-considerations)
- [Repository Structure](#repository-structure)
- [Documentation](#documentation)
- [Key Learning Outcomes](#key-learning-outcomes)
- [Deployment and Validation](#deployment-and-validation)
- [Cost Considerations](#cost-considerations)
- [Future Improvements](#future-improvements)

## Project Overview

The goal of this project is to build and document a portfolio website hosted on AWS while practising cloud infrastructure, networking, scalability, and security concepts.

The architecture separates static content delivery, web request handling, application processing, and database infrastructure.

The project uses Amazon CloudFront as the public content delivery entry point. Amazon S3 stores the static website assets, while Elastic Compute Cloud (EC2) instances, Application Load Balancers, and Auto Scaling Groups provide the web and application tiers.

Amazon RDS for MySQL has been provisioned as the database service. Application-to-database connectivity and persistent data operations remain subject to validation.

## Architecture Diagram

![AWS Three-Tier Portfolio Website Architecture](docs/images/AWS%20Portfolio%20Website%20Architecture.png)

The intended request flow is:

1. Website visitors access the portfolio through CloudFront.
2. CloudFront serves static content from the S3 origin.
3. Requests matching `/api/*` and `/admin*` are routed to the web-tier load balancer.
4. The web-tier load balancer distributes requests to web EC2 instances.
5. The web tier forwards application requests to the application-tier load balancer.
6. The application-tier load balancer distributes requests to application EC2 instances.
7. The application tier is intended to communicate with Amazon RDS for MySQL.
8. AWS Secrets Manager provides secure storage for application secrets where configured.

See the [Architecture Guide](docs/architecture.md) for additional details.

## AWS Services

| Service | Purpose |
|---|---|
| Amazon VPC | Isolated networking environment |
| Public and private subnets | Network segmentation and resource placement |
| Internet Gateway | Internet connectivity for public subnets |
| NAT Gateway | Outbound internet access for eligible private resources |
| Amazon EC2 | Hosts web and application workloads |
| EC2 Launch Templates | Defines instance launch configuration |
| Auto Scaling Groups | Manages EC2 instance capacity |
| Application Load Balancer | Distributes traffic across target instances |
| Amazon S3 | Stores static website assets |
| Amazon CloudFront | Content delivery and public website access |
| Amazon RDS for MySQL | Managed relational database |
| AWS Secrets Manager | Stores application secrets where configured |
| AWS IAM | Controls permissions for AWS resources |

## Request Flow

### Static website delivery

**Visitor → CloudFront → S3**

CloudFront serves the portfolio's static assets through its distribution. The S3 origin should remain private when configured with CloudFront Origin Access Control (OAC).

### Web and application tiers

**CloudFront → Web ALB → Web EC2 → Internal App ALB → App EC2**

The web tier handles incoming application requests and forwards appropriate requests to the application tier. Load balancers distribute traffic across registered targets.

### Database and secrets

**App EC2 → RDS for MySQL**

The application is intended to use RDS for database operations. Database connectivity, credentials retrieval, and successful data persistence must be verified before treating this integration as complete.

## Implementation Status

The following status reflects the current project progress.

| Component | Status |
|---|---|
| AWS VPC and networking resources | Created |
| Web tier | Working |
| Application tier | Working |
| CloudFront distribution | Working |
| S3 static content origin | Configured |
| RDS for MySQL | Created |
| Database connectivity and application persistence | Requires validation |
| Exact web/app subnet placement | Requires verification |
| End-to-end database and secrets integration | Requires validation |

This distinction is intentional: a provisioned resource does not necessarily mean its full application integration has been tested.

## Security Considerations

Security practices to implement and verify include:

- Keep database instances private and avoid direct public access.
- Restrict inbound database traffic to the application tier's security group.
- Use separate security groups and least-privilege rules for each tier.
- Prefer AWS Systems Manager Session Manager over publicly exposed SSH.
- Use IAM roles for EC2 workloads rather than hardcoded AWS credentials.
- Store database credentials in AWS Secrets Manager and grant only the required access.
- Keep S3 private when serving content through CloudFront OAC.
- Avoid committing passwords, private keys, secret values, or sensitive connection strings to GitHub.
- Review AWS billing, access permissions, and security-group rules regularly.

These are security objectives; confirm each configuration in the AWS console before claiming it is fully implemented.

## Repository Structure

The intended documentation layout is:

```text
aws-portfolio-project/
├── README.md
├── index.html
├── script.js
├── style.css
├── architecture/
│   └── aws-architecture.mmd
└── docs/
    ├── architecture.md
    ├── deployment-guide.md
    ├── networking-security.md
    ├── load-balancing-auto-scaling.md
    ├── database-and-secrets.md
    ├── validation-troubleshooting.md
    └── images/
        └── AWS Portfolio Website Architecture.png
```

This is a reference layout. Keep the actual paths in your repository consistent with the links below.

## Documentation

Use these guides to explore the project in more detail:

- [Architecture Guide](docs/architecture.md) — architecture components and traffic flow.
- [Deployment Guide](docs/deployment-guide.md) — infrastructure deployment steps.
- [Networking and Security](docs/networking-security.md) — VPC, subnet design, routing, and security groups.
- [Load Balancing and Auto Scaling](docs/load-balancing-auto-scaling.md) — load balancers, target groups, and scaling.
- [Database and Secrets](docs/database-and-secrets.md) — RDS, credentials, and secrets management.
- [Validation and Troubleshooting](docs/validation-troubleshooting.md) — verification steps and common issues.

## Key Learning Outcomes

Through this project, I have gained practical experience with:

- Designing AWS VPC networking environments.
- Understanding public and private subnet routing.
- Working with Internet Gateways and NAT Gateways.
- Deploying workloads on EC2.
- Configuring Launch Templates and Auto Scaling Groups.
- Working with Application Load Balancers and target groups.
- Hosting static content in Amazon S3.
- Configuring CloudFront distributions and origins.
- Provisioning Amazon RDS for MySQL.
- Understanding IAM roles and Secrets Manager.
- Documenting cloud architectures and validating deployments.
- Troubleshooting connectivity and infrastructure issues.

## Deployment and Validation

The deployed website can be accessed at:

**[Open the live portfolio website](https://d24rflhxcpvhlm.cloudfront.net)**

Before considering the full application deployment production-ready, validate:

- CloudFront serves the expected website and updated assets.
- The required load balancer targets are healthy.
- Web and application instances are running in the intended subnets.
- Security groups allow only the necessary communication between tiers.
- The application can connect to RDS using securely retrieved credentials.
- Database read/write operations succeed.
- Any contact-form or API submission persists data as intended.
- Auto Scaling behaves as expected when instance capacity changes.

## Cost Considerations

AWS resources may incur charges, including EC2 instances, load balancers, NAT Gateways, RDS, S3 storage, and CloudFront data transfer.

To manage costs:

- Create AWS Budgets and billing alerts.
- Review resource usage and pricing in the Stockholm region.
- Remove unused resources when they are no longer required.
- Check whether any temporary testing infrastructure is still running.
- Review the pricing of continuously running resources before keeping the project deployed.

Actual costs depend on resource sizes, usage, data transfer, and the applicable AWS pricing.

## Future Improvements

Planned improvements may include:

- Completing end-to-end database connectivity and persistence testing.
- Verifying and documenting exact subnet placement.
- Completing and testing Secrets Manager integration.
- Automating infrastructure provisioning with Terraform or AWS CloudFormation.
- Adding a CI/CD workflow for deployment updates.
- Implementing automated health checks and monitoring.
- Adding documented cost estimates and security validation results.

## About

**Developer:** Haroon Ali  
**Project Type:** AWS Cloud Engineering / Infrastructure Deployment  
**AWS Region:** Europe (Stockholm) — `eu-north-1`

This project is part of my practical AWS Cloud Engineering learning journey and demonstrates my experience building, testing, and documenting cloud infrastructure.
