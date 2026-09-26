import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  resetStore,
  updateTask,
} from "./tasks.js";

describe("task store", () => {
  beforeEach(() => {
    resetStore();
  });

  it("creates a task with id and done=false", () => {
    const task = createTask("learn AWS");
    assert.equal(task.title, "learn AWS");
    assert.equal(task.done, false);
    assert.equal(task.id, "1");
  });

  it("rejects empty title", () => {
    assert.throws(() => createTask("   "), /title is required/);
  });

  it("lists tasks in creation order", () => {
    createTask("one");
    createTask("two");
    const all = listTasks();
    assert.equal(all.length, 2);
    assert.equal(all[0].title, "one");
    assert.equal(all[1].title, "two");
  });

  it("gets a task by id", () => {
    const created = createTask("find me");
    const found = getTask(created.id);
    assert.equal(found.title, "find me");
  });

  it("throws when get unknown id", () => {
    assert.throws(() => getTask("999"), /task not found/);
  });

  it("updates title and done", () => {
    const created = createTask("old");
    const updated = updateTask(created.id, { title: "new", done: true });
    assert.equal(updated.title, "new");
    assert.equal(updated.done, true);
  });

  it("deletes a task", () => {
    const created = createTask("gone");
    deleteTask(created.id);
    assert.throws(() => getTask(created.id), /task not found/);
    assert.equal(listTasks().length, 0);
  });
});
