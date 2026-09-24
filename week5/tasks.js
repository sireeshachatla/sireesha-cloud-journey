/**
 * In-memory task store.
 *
 * Each task looks like:
 *   { id: "1", title: "learn AWS", done: false }
 */

let nextId = 1;
/** @type {Map<string, { id: string, title: string, done: boolean }>} */
const tasks = new Map();

/** Remove all tasks and reset ids. Used by tests. */
export function resetStore() {
  tasks.clear();
  nextId = 1;
}

/**
 * Create a task.
 * @param {string} title
 * @returns {{ id: string, title: string, done: boolean }}
 */
export function createTask(title) {
  const cleaned = String(title ?? "").trim();
  if (!cleaned) {
    throw new Error("title is required");
  }
  const task = {
    id: String(nextId++),
    title: cleaned,
    done: false,
  };
  tasks.set(task.id, task);
  return { ...task };
}

/** @returns {Array<{ id: string, title: string, done: boolean }>} */
export function listTasks() {
  return Array.from(tasks.values()).map((t) => ({ ...t }));
}

/**
 * @param {string} id
 * @returns {{ id: string, title: string, done: boolean }}
 */
export function getTask(id) {
  const task = tasks.get(String(id));
  if (!task) {
    throw new Error("task not found");
  }
  return { ...task };
}

/**
 * @param {string} id
 * @param {{ title?: string, done?: boolean }} updates
 */
export function updateTask(id, updates = {}) {
  const task = tasks.get(String(id));
  if (!task) {
    throw new Error("task not found");
  }
  if (updates.title !== undefined) {
    const cleaned = String(updates.title).trim();
    if (!cleaned) {
      throw new Error("title is required");
    }
    task.title = cleaned;
  }
  if (updates.done !== undefined) {
    task.done = Boolean(updates.done);
  }
  return { ...task };
}

/** @param {string} id */
export function deleteTask(id) {
  const key = String(id);
  if (!tasks.has(key)) {
    throw new Error("task not found");
  }
  tasks.delete(key);
}
