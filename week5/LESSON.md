# Week 5 — Node task API (CRUD)

**Time budget:** 8 hours (two 4-hour blocks)

You already have Node basics. This week you build a tiny **Task API**:
create, list, get, update, and delete tasks — stored in memory (resets when
the server stops). Later you’ll put the same ideas on AWS (API Gateway + Lambda + DynamoDB).

## Golden rule

| Editor | Terminal |
|--------|----------|
| `.js` files | `npm test`, `npm start`, `curl ...` |

---

## Setup

```bash
cd /Users/sireeshachatla/SireeshaTechLearning/week5
npm install
```

---

## Block A — Task store (no server yet)

Logic lives in `tasks.js` (create/list/get/update/remove).

```bash
cd week5
npm test
```

All tests should pass. Read `tasks.js` and match each function to a test in `tasks.test.js`.

---

## Block B — HTTP API with Express

`server.js` exposes the store over HTTP:

| Method | Path | Meaning |
|--------|------|---------|
| GET | `/health` | server alive |
| GET | `/tasks` | list all |
| POST | `/tasks` | create (JSON body: `{"title":"..."}`) |
| GET | `/tasks/:id` | get one |
| PATCH | `/tasks/:id` | update title / done |
| DELETE | `/tasks/:id` | remove |

### Start server (Terminal 1)

```bash
cd week5
npm start
```

### Call it (Terminal 2)

```bash
curl -s http://localhost:3001/health

curl -s -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"learn AWS"}'

curl -s http://localhost:3001/tasks
```

Port is **3001** (Week 4 used 3000) so both can exist without fighting.

Stop server: `Ctrl + C` in Terminal 1.

---

## Concepts

| Word | Meaning |
|------|---------|
| CRUD | Create, Read, Update, Delete |
| route | URL + HTTP method your API handles |
| JSON body | data sent with POST/PATCH |
| status code | 200 OK, 201 created, 404 not found, 400 bad request |
| in-memory | data lives in a variable; gone when process exits |

---

## Done when

- [ ] `npm test` → all pass
- [ ] `npm start` + curl create/list works
- [ ] `week5/LOG.md` filled
- [ ] commit + push

## Stuck rule
20 minutes, then paste the full error.
