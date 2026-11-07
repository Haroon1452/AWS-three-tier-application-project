# Load Balancing and Auto Scaling

## Web Tier

The Web tier uses:

- Launch Template: `portfolio-web-lt`
- Target Group: `portfolio-web-tg`
- Auto Scaling Group: `portfolio-web-asg` (verify actual name)
- Application Load Balancer: Web ALB
- Listener: HTTP port 80

The load balancer distributes incoming web requests across registered EC2 instances.

## Application Tier

The Application tier uses:

- Application Launch Template
- Target Group: `portfolio-app-tg`
- Auto Scaling Group: `portfolio-app-asg`
- Application Load Balancer: internal App ALB
- Listener: HTTP port 4000

## Health Checks

Configure target group health checks to use an endpoint that actually exists in the application.

Verify:

- Health check path
- Health check port
- Expected HTTP response code
- Target registration
- Target health status

Do not assume `/health` is valid unless the application implements it.

## Auto Scaling

Auto Scaling Groups manage EC2 capacity based on their configured minimum, maximum, desired capacity, and scaling policies.

For a highly available deployment, use appropriate subnets across multiple Availability Zones.
