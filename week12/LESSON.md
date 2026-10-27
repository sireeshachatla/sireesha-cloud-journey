# Week 12 — OpenTofu (Infrastructure as Code)

OpenTofu lets you **describe** AWS resources in a file, then create and delete
them with commands. Same idea as writing a recipe instead of cooking from memory.

Week 6 created an S3 bucket with `aws s3api create-bucket`. This week a file
named `main.tf` describes that bucket, and OpenTofu creates or destroys it.

## Words

| Word | Meaning |
|------|---------|
| `.tf` file | the recipe (HCL language) |
| `tofu init` | download the AWS plugin once |
| `tofu plan` | preview what will change (safe) |
| `tofu apply` | create / update resources |
| `tofu destroy` | delete what this recipe created |
| state | OpenTofu’s memory of what it created |

## Lab

```bash
cd /Users/sireeshachatla/SireeshaTechLearning/week12/infra
source ~/.zprofile
export PATH="$HOME/.local/bin:$PATH"

tofu init
tofu plan
tofu apply -auto-approve
```

Then check the bucket exists:

```bash
aws s3 ls | grep sireesha-week12
```

## Cleanup (required)

```bash
cd /Users/sireeshachatla/SireeshaTechLearning/week12/infra
tofu destroy -auto-approve
```

Confirm gone:

```bash
aws s3 ls | grep sireesha-week12 || echo "no week12 bucket — cleanup OK"
```

## Done when

- [ ] `tofu apply` created the bucket
- [ ] `aws s3 ls` showed it
- [ ] `tofu destroy` removed it
- [ ] `week12/LOG.md` filled
