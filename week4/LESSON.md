# Week 4 — Node.js fundamentals

**Time budget:** 8 hours (two 4-hour blocks)

Node.js is JavaScript on your computer (not only in the browser).
You will use it for AWS Lambda and small APIs.

Python and Node side-by-side:

| Python | Node (JavaScript) |
|--------|-------------------|
| `def make_name(...):` | `function makeName(...) { }` |
| `None` | `null` / `undefined` |
| `True` / `False` | `true` / `false` |
| `len(list)` | `list.length` |
| `pytest` | `node --test` |

## Golden rule

| Place | What belongs there |
|--------|---------------------|
| **Editor** (`.js` files) | JavaScript code |
| **Terminal** | `node ...` and `npm ...` only |

---

## Setup (once)

```bash
cd /Users/sireeshachatla/SireeshaTechLearning/week4
npm install
```

From the repo root you can also run scripts with:

```bash
cd /Users/sireeshachatla/SireeshaTechLearning/week4
npm run warmup
npm test
```

---

## Block A (4 hours) — Language warmup

Open `week4/warmup.js`, fill TODOs (same style as Week 2 Python).

```bash
cd week4
node warmup.js
```

Fix until every line says PASS.

---

## Block B (4 hours) — Tag helpers in JavaScript

Same AWS tagging ideas as Week 2, rewritten in Node:

- `week4/tags.js` — **you fill TODOs** (or tutor fills, you run tests)
- `week4/tags.test.js` — tests (do not edit)

```bash
cd week4
npm test
```

---

## Stretch (if time) — tiny HTTP server

```bash
cd week4
npm start
```

Then in another terminal:

```bash
curl http://localhost:3000/health
```

You should see JSON like `{"ok":true}`.

---

## Done when

- [ ] `node warmup.js` → all PASS
- [ ] `npm test` → all tests pass
- [ ] (optional) `/health` responds
- [ ] `week4/LOG.md` filled
- [ ] commit + push

## Stuck rule
20 minutes, then paste the full error (no secrets).
