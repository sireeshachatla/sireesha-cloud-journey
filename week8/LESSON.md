# Week 8 — HTTP API in front of Lambda

Lambda from Week 7 only ran when you used `aws lambda invoke`.
This week AWS gives you a **URL**. A browser or `curl` hits that URL,
API Gateway calls Lambda, and you get JSON back.

This is the same shape as a real cloud app:
browser → API Gateway → Lambda.

## Deploy

```bash
cd /Users/sireeshachatla/SireeshaTechLearning
source ~/.zprofile
bash week8/scripts/deploy.sh
```

The script prints a URL. Then:

```bash
curl -s "PASTE_URL_HERE/hello?name=Sireesha"
```

You want:

```json
{"ok":true,"message":"hello Sireesha from week 8","path":"/hello"}
```

## Cleanup (required before you stop)

```bash
bash week8/scripts/cleanup.sh
```

## Done when

- [ ] `curl` printed the hello JSON
- [ ] cleanup finished
- [ ] `week8/LOG.md` filled
