/**
 * Week 5 Task API
 *
 * Start: npm start
 * Port: 3001
 */

import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from "./tasks.js";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "week5-task-api" });
});

app.get("/tasks", (_req, res) => {
  res.json({ tasks: listTasks() });
});

app.post("/tasks", (req, res) => {
  try {
    const task = createTask(req.body?.title);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/tasks/:id", (req, res) => {
  try {
    res.json(getTask(req.params.id));
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.patch("/tasks/:id", (req, res) => {
  try {
    const task = updateTask(req.params.id, {
      title: req.body?.title,
      done: req.body?.done,
    });
    res.json(task);
  } catch (err) {
    const code = err.message === "task not found" ? 404 : 400;
    res.status(code).json({ error: err.message });
  }
});

app.delete("/tasks/:id", (req, res) => {
  try {
    deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
  console.log("Try: curl http://localhost:3001/health");
});
