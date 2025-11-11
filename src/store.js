
const STORAGE_KEY = "5UP3R5CR3T-2305";

// Load tasks
export function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save tasks
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
