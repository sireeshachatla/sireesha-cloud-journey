# Week 6 — First AWS resources (CLI + S3)

**Time budget:** 8 hours

You build and delete real AWS resources with the CLI. Goal: understand
**who you are**, **where you work** (region), and **create → use → destroy**
so you never leave paid clutter behind.

## Cost / safety rules

- Prefer IAM user `sireesha-learner` (not root) for daily work
- Stay in `us-east-1` unless told otherwise
- Always **delete** what you create at the end of the session
- Never commit access keys

---

## Block 0 — Who am I? (~30 min)

```bash
source ~/.zprofile
aws sts get-caller-identity
aws configure get region
```

**Good:** Arn ends with `user/sireesha-learner`  
**Needs fix:** Arn ends with `root` → create/use IAM user access keys again (`aws configure`)

Also enable MFA on root in the console if you have not already.

---

## Block A — S3 lab (3–4 hours)

S3 = object storage (files in the cloud). Bucket names are **globally unique**.

### A1. Pick a bucket name

Use your account id so it is unique, for example:

```text
sireesha-learning-504150922093
```

Or generate one:

```bash
BUCKET="sireesha-learning-$(aws sts get-caller-identity --query Account --output text)"
echo "$BUCKET"
```

### A2. Create bucket (us-east-1 special syntax)

```bash
aws s3api create-bucket --bucket "$BUCKET" --region us-east-1
```

### A3. Upload a file

```bash
echo "hello from week6" > /tmp/week6-hello.txt
aws s3 cp /tmp/week6-hello.txt "s3://$BUCKET/hello.txt"
aws s3 ls "s3://$BUCKET/"
```

### A4. Download and check

```bash
aws s3 cp "s3://$BUCKET/hello.txt" /tmp/week6-down.txt
cat /tmp/week6-down.txt
```

### A5. Tear down (do this every time)

```bash
aws s3 rm "s3://$BUCKET" --recursive
aws s3api delete-bucket --bucket "$BUCKET" --region us-east-1
```

Confirm gone:

```bash
aws s3 ls | grep sireesha-learning || echo "no learning buckets listed"
```

---

## Block B — Read the AWS mental model (1–2 hours)

Open `week6/NOTES.md` and fill the blanks in your own words after the S3 lab.

Then skim (do not deep-dive yet):
- What is a region?
- What is IAM?
- What is S3 vs EC2 (storage vs a virtual computer)?

---

## Stretch (optional) — Hello Lambda sketch

Folder `week6/hello-lambda/` has a tiny Node handler. You do **not** need to
deploy it this week unless you finish A+B early. Deployment is Week 7+.

---

## Done when

- [ ] `aws sts get-caller-identity` works (ideally IAM user)
- [ ] Created S3 bucket, uploaded file, listed it
- [ ] Deleted bucket + objects
- [ ] `week6/NOTES.md` and `week6/LOG.md` filled
- [ ] commit + push

## Stuck rule
Paste the **full error** (no secrets / no keys).
