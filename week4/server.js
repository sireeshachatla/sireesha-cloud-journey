/**
 * Tiny Express server — stretch goal for Week 4.
 *
 * Start: npm start
 * Check: curl http://localhost:3000/health
 */

import express from "express";
import { makeName } from "./tags.js";

const app = express();
const PORT = 3000;

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "week4" });
});

app.get("/name", (req, res) => {
  const prefix = req.query.prefix || "acme";
  const environment = req.query.env || "dev";
  const resource = req.query.resource || "api";
  try {
    res.json({
      name: makeName(prefix, environment, resource),
    });
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
  console.log("Try: curl http://localhost:3000/health");
});
