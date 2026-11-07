
# Database and Secrets Management

## Amazon RDS

An Amazon RDS for MySQL database instance has been created.

The intended application connection uses:

- Engine: MySQL
- Port: 3306
- Host: RDS endpoint
- Credentials: AWS Secrets Manager

## Database Connectivity

Verify connectivity from the application tier.

Confirm:

1. The RDS instance is available.
2. The DB subnet group uses private subnets in multiple Availability Zones.
3. The RDS security group allows TCP 3306 from the application EC2 security group.
4. The application uses the correct RDS endpoint.
5. The database name, username, and password are correct.

## Secrets Manager

Store database credentials in AWS Secrets Manager.

The application EC2 IAM role should receive only the permissions required to retrieve the relevant secret.

Never commit actual secret values to the repository.

## Database Integration Status

RDS provisioning is complete.

Application-to-database connectivity and successful read/write operations must be tested separately before describing the database integration as fully operational.
