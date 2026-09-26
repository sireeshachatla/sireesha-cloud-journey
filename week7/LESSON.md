# Week 7 — First AWS Lambda

**Time budget:** 8 hours

Lambda runs your code in AWS when something calls it. You do **not** start a
server or leave `npm start` running. AWS starts the code, runs it, and stops it.

This week you will:

1. Package a tiny Node function
2. Give Lambda permission to run it (an IAM **role**)
3. Create the function
4. **Invoke** it (like curl, but AWS runs the code)
5. **Delete** the function and role (cleanup)

Region: `us-east-1`

## Concepts

| Word | Meaning |
|------|---------|
| Lambda | Code that runs on demand in AWS |
| handler | The function AWS calls (`index.handler`) |
| invoke | "Run it now" |
| IAM role | Permission identity the function uses (not your login) |
| zip | How we upload the code |

## Block A — Deploy and invoke

From the repo root, in the terminal:

```bash
cd /Users/sireeshachatla/SireeshaTechLearning
source ~/.zprofile
bash week7/scripts/deploy-and-invoke.sh
```

You want to see JSON like:

```json
{"ok":true,"message":"hello Sireesha from week 7 lambda"}
```

Read `week7/hello-lambda/index.js` once so you know what ran.

## Block B — Cleanup (required)

```bash
bash week7/scripts/cleanup.sh
```

Confirm nothing is left:

```bash
aws lambda get-function --function-name sireesha-week7-hello --region us-east-1
```

That command **should fail** with `ResourceNotFoundException`. That means it is deleted.

## What you type vs what AWS does

| You did locally (Week 5) | AWS version (Week 7) |
|--------------------------|----------------------|
| `npm start` keeps a server on | Lambda starts only when invoked |
| `curl localhost:3001` | `aws lambda invoke` |
| data disappears when you Ctrl+C | function stays until you delete it |

## Done when

- [ ] Deploy script printed the hello JSON
- [ ] Cleanup script finished
- [ ] `get-function` says the function is gone
- [ ] `week7/LOG.md` filled

## Stuck rule

Paste the **full error** (no keys / secrets).
