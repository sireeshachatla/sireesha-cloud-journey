# Week 1 — Setup checklist

Goal: tools installed, AWS account ready, first GitHub repo pushed.

Time budget: ~8 hours (can split across 2 days).

## Already done on this Mac

- [x] Python 3
- [x] Node.js + npm
- [x] Git
- [x] This learning folder + README
- [x] OpenTofu v1.12.6 (installed to `~/.local/bin`)
- [x] AWS CLI (pip user install; PATH added to `~/.zprofile`)
- [x] Homebrew 6.0.22

## Your tasks (do these in order)

### 1–3. Tools — DONE

Python, Node, Git, AWS CLI, OpenTofu, and Homebrew are installed.
### 4. Create AWS account — DONE

- IAM user `sireesha-learner` created
- CLI configured; `aws sts get-caller-identity` succeeded

### 5. Initialize Git in this folder (~10 min)

In Cursor terminal, from this project folder:

```bash
cd /Users/sireeshachatla/SireeshaTechLearning
git init
git add README.md week1/CHECKLIST.md
git commit -m "Week 1: start cloud journey setup"
```

### 6. Create GitHub repo + push (~15 min)

1. On GitHub: New repository named `sireesha-cloud-journey` (public or private)
2. Do **not** add a README on GitHub (we already have one)
3. Then run (replace YOUR_GITHUB_USERNAME):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/sireesha-cloud-journey.git
git push -u origin main
```

If GitHub asks you to sign in, complete that flow.

### 7. Week 1 learning log (5 min)

Copy `week1/LOG_TEMPLATE.md` to fill in, or edit it in place.

## Done when

- [ ] `aws --version` and `tofu version` work
- [ ] `aws sts get-caller-identity` works
- [ ] Root MFA enabled; daily work uses IAM user
- [ ] Repo pushed to GitHub
- [ ] Learning log filled for Week 1

## When you finish

Reply to your tutor with:
1. Output of the four version commands + aws + tofu
2. Whether `aws sts get-caller-identity` succeeded (yes/no)
3. GitHub repo link
4. Anything that blocked you

Then we start **Week 2 — Python**.
