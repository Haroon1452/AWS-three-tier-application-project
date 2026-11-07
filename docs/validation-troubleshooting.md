# Validation and Troubleshooting

## CloudFront

Check:

- Distribution status
- Origin configuration
- Default root object (`index.html`)
- Cache behavior path patterns
- Origin connectivity
- Cache invalidation after static website updates

## Load Balancers

Check:

- Listener configuration
- Target group registration
- Target health
- Security group rules
- Health check path and port

## EC2

Check:

- Instance state
- System and application logs
- IAM instance profile
- User Data execution
- Required packages and application files

## RDS

Check:

- Database instance status
- Endpoint and port
- Subnet group
- Security group
- Application connection configuration

## Security

Check that:

- Database access is not public.
- SSH is not open to the entire internet.
- Secrets are not stored in Git.
- IAM policies follow least privilege.

## Useful AWS Console Locations

- VPC → Your VPCs / Subnets / Route Tables
- EC2 → Instances / Launch Templates / Auto Scaling Groups
- EC2 → Load Balancers / Target Groups
- RDS → Databases / Subnet Groups
- Secrets Manager → Secrets
- CloudFront → Distributions
- S3 → Buckets
