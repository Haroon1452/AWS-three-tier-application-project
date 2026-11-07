
# AWS Architecture

## Overview

The portfolio website is deployed using a multi-tier architecture in AWS Region `eu-north-1` (Europe/Stockholm).

The architecture separates content delivery, web request handling, application processing, and database services.

## Request Flow

### 1. Content Delivery — CloudFront and S3

Amazon CloudFront acts as the public entry point.

Configured origins and behaviors:

- Default behavior: Amazon S3 origin.
- `/api/*`: Web Application Load Balancer origin.
- `/admin*`: Web Application Load Balancer origin.

The default behavior uses a caching policy suitable for static content. The application path behaviors use a disabled caching policy and allow the required HTTP methods.

### 2. Web Tier

The Web tier runs on Amazon EC2 instances.

Its infrastructure includes:

- Web Launch Template
- Web Auto Scaling Group
- Web Target Group
- Web Application Load Balancer

The Web Load Balancer listens on HTTP port 80 and forwards requests to healthy web instances.

### 3. Application Tier

The Application tier runs separately from the Web tier.

Its infrastructure includes:

- Application Launch Template
- Application Auto Scaling Group
- Application Target Group
- Internal Application Load Balancer

The Application Load Balancer is configured to receive traffic on port 4000.

The Web tier uses this load balancer to communicate with the application tier.

### 4. Database Tier

Amazon RDS for MySQL has been provisioned.

The intended architecture is for the application tier to connect to the database over TCP port 3306.

Database connectivity, schema initialization, and application data persistence must be tested before claiming full database integration.

### 5. Secrets Management

AWS Secrets Manager is intended to hold sensitive database configuration.

The application EC2 role should have narrowly scoped permission to retrieve only the required secret.

## Networking

The project uses a custom VPC named `portfolio-vpc`.

The VPC includes multiple subnets across Availability Zones, an Internet Gateway, a NAT Gateway, and separate route tables.

The exact subnet assignment of the Web and Application tiers must be confirmed from the deployed EC2 instances and load balancer subnet mappings.

## Architecture Status

| Layer | Implementation |
|---|---|
| Content delivery | CloudFront working |
| Static storage | S3 origin configured |
| Web | Working |
| Application | Working |
| Database | RDS created; connectivity needs validation |
| Networking | VPC resources created; tier placement needs verification |
