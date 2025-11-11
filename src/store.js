import { Task } from "./Task.js";

const STORAGE_KEY = "5UP3R5CR3T-2305";

// Load tasks
export function loadTasks() {
  const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return raw.map(t => new Task(t.id, t.title, t.done, t.dueDate, t.category));
}
// Save tasks
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
