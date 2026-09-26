# Week 3 — JSON + HTTP (Python)

**Time budget:** 8 hours (two 4-hour blocks)

JSON is how almost everything talks in the cloud: AWS APIs, OpenTofu state,
GitHub Actions, Lambda event payloads. This week you learn to read, write,
and fetch JSON — then prove it with pytest.

## Golden rule (from Week 2)

| Place | What belongs there |
|--------|---------------------|
| **Editor** (`.py` files) | Python code |
| **Terminal** | `python ...` and `pytest ...` only |

Never paste `def` / `return` / `if` into the terminal.

---

## Setup (once, ~10 min)

```bash
cd /Users/sireeshachatla/SireeshaTechLearning
source .venv/bin/activate
pip install -r week3/requirements.txt
```

---

## Block A (4 hours) — JSON files

### What you will build
Helpers that load a tiny "cloud config" JSON file and check required fields.
This is the same idea as missing AWS tags from Week 2.

### Files
- `week3/sample_config.json` — example config (do not break it)
- `week3/config_tools.py` — **you fill the TODOs**
- `week3/test_config_tools.py` — tests (do not edit)

### Loop
1. Open `config_tools.py` in the editor
2. Fill one function
3. Save (`Cmd + S`)
4. Run:

```bash
pytest week3/test_config_tools.py -v
```

5. Fix until green, next function

### Done when
```bash
pytest week3/test_config_tools.py -v
```
shows all PASSED.

---

## Block B (4 hours) — Fetch JSON from the internet

### What you will build
A tiny client that downloads JSON from a public URL (like calling an AWS API,
but simpler and free).

### Files
- `week3/fetch_json.py` — **you fill the TODOs**
- `week3/test_fetch_json.py` — tests (do not edit)

### Loop
Same as Block A. Run:

```bash
pytest week3/test_fetch_json.py -v
```

### Manual check (after tests pass)

```bash
python week3/fetch_json.py
```

You should see a small JSON printout (your public IP info from a free API).

---

## Concepts this week (plain English)

| Idea | Meaning |
|------|---------|
| JSON | Text format for structured data: `{"name": "sireesha"}` |
| `json.load` | Read JSON from a file into a Python dict |
| `json.dump` | Write a Python dict into a JSON file |
| HTTP GET | Ask a server for data |
| `requests.get` | Python library that does HTTP GET |
| status code | `200` means OK; `404` means not found |

---

## Done when (end of week)

- [ ] All Block A tests pass
- [ ] All Block B tests pass
- [ ] `python week3/fetch_json.py` prints JSON
- [ ] `week3/LOG.md` filled
- [ ] Commit + push (we'll do this together)

## Stuck rule
Try 20 minutes. Then paste the **full error** (no secrets) and what you tried.
