# Week 13 — CI/CD with GitHub Actions

CI/CD means a robot on GitHub runs checks when you push code.

- **CI** (Continuous Integration): run tests automatically
- **CD** (Continuous Delivery/Deploy): later — apply infra or ship an app

Until now you ran `pytest` and `npm test` on your Mac. This week GitHub
runs them for you on every push.

## Words

| Word | Meaning |
|------|---------|
| workflow | a YAML file that describes the robot’s jobs |
| job | one set of steps (e.g. “run Python tests”) |
| runner | the temporary computer GitHub starts for you |
| green / red | passed / failed |

## What we added

File: `.github/workflows/ci.yml`

On push and pull requests it will:

1. Install Python → run `pytest` for week2 and week3  
2. Install Node → run `npm test` for week4 and week5  
3. Install OpenTofu → `tofu init` + `tofu validate` for week12  

It does **not** create AWS resources (no `apply`). That stays for a later week
with safer cloud login (OIDC).

## What you do

1. Commit Week 12–13 files and push your branch  
2. Open GitHub → **Actions** tab  
3. Click the latest workflow run  
4. Confirm the jobs are green  

## Done when

- [ ] Actions run shows green checks
- [ ] You can explain: push → GitHub runs tests → pass or fail
- [ ] `week13/LOG.md` filled
