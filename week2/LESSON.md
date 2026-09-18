# Week 2 — Python fundamentals

**Time budget:** 8 hours, split into two 4-hour blocks.

Python is your primary language for this whole journey: AWS Lambda handlers,
scripts that call AWS APIs, and later your QA automation suites.

## What you will be able to do by Sunday

1. Create and use a virtual environment (and explain why it exists)
2. Write functions with arguments, return values, and error handling
3. Use lists, dictionaries, and loops confidently
4. Read a failing test, understand the error, and make it pass
5. Commit and push your work without help

---

## Block A (4 hours) — Language basics

### A1. Virtual environments (30 min)

A virtual environment is a private folder of Python packages for one project.
Without it, every project shares one global set of packages, and two projects
that need different versions of the same library will break each other.

From the repo root:

```bash
cd /Users/sireeshachatla/SireeshaTechLearning
python3 -m venv .venv
source .venv/bin/activate
```

Your prompt now shows `(.venv)`. That means you are inside the environment.
Install this week's tools:

```bash
pip install -r week2/requirements.txt
```

To leave the environment later: `deactivate`

**Every new terminal needs `source .venv/bin/activate` again.** Forgetting this
is the single most common Python beginner confusion — "it worked yesterday"
usually means "I am not in my venv."

### A2. Warm-up exercises (3.5 hours)

Open `week2/warmup.py`. It has short exercises with `TODO` markers.
Work top to bottom. Run the file to check yourself:

```bash
python week2/warmup.py
```

It prints PASS or FAIL for each exercise. Do not move on until a section passes.

Topics in order: variables and types, strings, lists, dictionaries,
conditionals, loops, functions, exceptions.

---

## Block B (4 hours) — Your first tested module

### B1. Why tests exist (20 min — read, do not skip)

A test is code that checks other code. Instead of running your program and
eyeballing the output, you write a small function that asserts what should be
true. Then a tool runs all of them in one second.

This matters twice over for you:

- As a **developer**, tests catch your mistakes before they reach AWS
- As a **QA engineer**, writing and reading tests *is* the job

We use `pytest`, the standard Python testing tool. It is also what most cloud
teams use for testing Lambda functions and API integrations.

### B2. Make the failing tests pass (3.5 hours)

Open two files side by side:

- `week2/tags.py` — four functions, all unfinished
- `week2/test_tags.py` — tests that describe exactly what they should do

These functions build and check **AWS resource tags**. Tags are key/value
labels on cloud resources (`Owner=sireesha`, `Environment=dev`). Real teams
require them so they can track cost and ownership. You will meet them again in
the OpenTofu phase.

Run the tests:

```bash
pytest week2/ -v
```

Everything fails at first. That is intentional and correct.

Your loop for each function:

1. Run `pytest week2/ -v` and read the **first** failure only
2. Open `test_tags.py` and read what that test expects
3. Write the code in `tags.py`
4. Run the tests again

Work one function at a time, in the order they appear in `tags.py`.
Do not try to fix everything at once.

### B3. Commit and push (20 min)

```bash
git add week2
git commit -m "Week 2: Python basics and first pytest suite"
git push
```

---

## Reading a pytest failure

This trips up every beginner, so learn the shape of it now:

```
week2/test_tags.py:12: in test_make_name_joins_parts
    assert make_name("acme", "dev", "bucket") == "acme-dev-bucket"
E   AssertionError: assert 'ACME-dev-bucket' == 'acme-dev-bucket'
E     - acme-dev-bucket
E     + ACME-dev-bucket
```

Read it bottom-up:

- `AssertionError` — a check failed
- The `-` line is what the test **expected**
- The `+` line is what your code **actually returned**
- The top line tells you the file, line number, and test name

Here the difference is uppercase `ACME`, so the fix is lowercasing the input.
That habit — expected versus actual — is literally how you will write bug
reports later.

---

## Done when

- [ ] `python week2/warmup.py` prints PASS for every exercise
- [ ] `pytest week2/ -v` shows all tests passing
- [ ] Work committed and pushed to GitHub
- [ ] `week2/LOG.md` filled in

## Stuck rule

Try for 20 minutes. Then paste the **full error text** to your tutor along with
what you tried. Learning to describe a problem precisely is a skill worth as
much as the fix.
