# AWS Cloud Engineer Portfolio

A responsive, animated portfolio website built with **HTML, CSS, and vanilla JavaScript**. No framework, build step, or package installation is required.

## Files

- `index.html` — page structure and content
- `style.css` — responsive visual design
- `script.js` — mobile navigation, reveal animations, counters, project filters, project detail dialogs, email copy, and contact email preparation

## Run locally

### Option A: Open directly
Open `index.html` in a modern browser.

### Option B: Use a local server
From this folder, run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Personalize before publishing

Edit `index.html` and `script.js`:

1. Replace **Alex Morgan** with your name.
2. Replace `alex@example.com` with your real email in `script.js` and any visible links/text in `index.html`.
3. Replace example profile details, project statuses, skill levels, and timeline content with accurate information.
4. Add links to your real GitHub, LinkedIn, resume, and completed project repositories if desired.
5. Test the contact form. It opens the visitor's email application; it does not send mail itself and does not store submissions.

The sample metrics and project statuses are illustrative. Do not present planned work as completed work.

## Deploy on AWS

Recommended production approach: **private Amazon S3 bucket + Amazon CloudFront**. S3 stores the static files and CloudFront serves them over HTTPS. This is more secure than making the S3 bucket public.

### 1. Create an S3 bucket

1. Sign in to the AWS Management Console.
2. Open **Amazon S3** and choose **Create bucket**.
3. Choose a globally unique bucket name, such as `my-cloud-portfolio-unique-12345`.
4. Select your preferred AWS Region.
5. Keep **Block all public access** enabled.
6. Create the bucket.

### 2. Upload the website files

1. Open the bucket and choose **Upload**.
2. Upload `index.html`, `style.css`, and `script.js` (optionally upload `README.md` too, though it is not needed on the website).
3. Finish the upload.

### 3. Create a CloudFront distribution

1. Open **Amazon CloudFront** → **Create distribution**.
2. For the origin, select your S3 bucket. Choose the regular S3 bucket origin, **not** the S3 website endpoint.
3. Enable **Origin access control (OAC)** and create/select an OAC.
4. Choose the option that lets CloudFront update the S3 bucket policy, or apply the policy CloudFront provides after creating the distribution.
5. Set **Viewer protocol policy** to **Redirect HTTP to HTTPS**.
6. Set **Default root object** to `index.html`.
7. Create the distribution and wait until its status is **Deployed**.

### 4. Allow CloudFront to read the bucket

If the wizard did not update the policy automatically:

1. Open the distribution and copy its distribution ID.
2. Open the S3 bucket → **Permissions** → **Bucket policy**.
3. Apply the bucket policy generated for your distribution by AWS. It should grant `s3:GetObject` to the CloudFront service principal and restrict access using the `AWS:SourceArn` condition for your distribution ARN.
4. Keep S3 Block Public Access enabled. Do not add a public `Principal: "*"` policy for this setup.

AWS changes console labels occasionally, so follow the current console prompts and the official CloudFront + S3 Origin Access Control documentation.

### 5. Open the website

1. In CloudFront, copy the distribution domain name, for example `d123example.cloudfront.net`.
2. Open `https://YOUR-DISTRIBUTION-DOMAIN` in a browser.
3. Test the navigation, filters, project dialogs, copy-email action, contact form, and mobile layout.

### 6. Update the site later

Upload changed files to the same S3 bucket. CloudFront may cache previous versions. If changes do not appear, create a CloudFront invalidation for:

```text
/*
```

For frequent updates, consider versioned asset filenames or a Git-based deployment workflow.

## Optional: S3 static website hosting (learning-only alternative)

S3 website endpoints can host static content, but they require public read access for a simple direct setup and do not provide HTTPS directly. For a public portfolio, prefer private S3 + CloudFront with OAC.

## Cost and security notes

- AWS charges can apply for CloudFront requests/data transfer, S3 storage/requests, DNS, and domain registration. Review current pricing and your account's Free Tier eligibility before deploying.
- Create a billing budget/alert before experimenting.
- Do not upload AWS credentials, private keys, `.env` files, personal documents, or sensitive data to a public website bucket.
- This is a static frontend. It does not include a server, database, user authentication, or backend contact-form processing.

## Official AWS documentation

- S3: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html
- CloudFront with an S3 origin: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.SimpleDistribution.html
- CloudFront Origin Access Control: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
- CloudFront invalidations: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html
