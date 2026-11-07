
# Networking and Security

## VPC

The project uses a custom VPC named `portfolio-vpc`.

Networking components include:

- Internet Gateway
- NAT Gateway
- Public and private route tables
- Multiple subnets across Availability Zones
- Security Groups

## Intended Subnet Design

The following is the recommended logical layout. It should not be interpreted as a verified record of the current deployment.

| Subnet Group | Intended Purpose |
|---|---|
| Public subnets | Public-facing load balancer and NAT Gateway |
| Web private subnets | Web EC2 instances |
| Application private subnets | Application EC2 instances and internal load balancer |
| Database private subnets | RDS MySQL |

For high availability, private application and database resources should use subnets in at least two Availability Zones where supported.

## Routing

### Public Route Table

The public route table should include:

`0.0.0.0/0 → Internet Gateway`

### Private Route Table

Private subnets that require outbound internet connectivity should use:

`0.0.0.0/0 → NAT Gateway`

The NAT Gateway must be deployed in a public subnet.

### Database Route Table

Database subnets should remain private. They should not have a default route to an Internet Gateway.

## Security Group Design

| Security Group | Recommended Inbound |
|---|---|
| Web ALB SG | HTTP/HTTPS from approved CloudFront origin traffic |
| Web EC2 SG | Web application port from Web ALB SG |
| App ALB SG | TCP 4000 from Web tier SG |
| App EC2 SG | Application port from App ALB SG |
| RDS SG | TCP 3306 from App EC2 SG |

Use security group references instead of broad CIDR ranges wherever possible.

## Administrative Access

Avoid allowing SSH from `0.0.0.0/0`.

Prefer AWS Systems Manager Session Manager. If SSH is necessary, restrict port 22 to a trusted fixed IP address.

## Important Security Notes

- Keep RDS private.
- Do not expose database port 3306 publicly.
- Avoid hardcoded AWS credentials.
- Use IAM roles for EC2 permissions.
- Store secrets in AWS Secrets Manager.
- Do not upload `.pem`, `.env`, passwords, or secret JSON values to GitHub.
