import { Task } from "./Task.js";
import * as store from "./store.js";
import * as view from "./view.js";
import { uid } from "./utils.js";

const taskListEl = document.querySelector("#task-list");
const inputEl = document.querySelector("#task-input");
const dateEl = document.querySelector("#task-date");
const categoryEl = document.querySelector("#task-category");
const countEl = document.querySelector("#task-count");
const formEl = document.querySelector("#task-form");
const filtersEl = document.querySelector("#filters");
const searchEl = document.querySelector("#search-input");
const searchCountEl = document.querySelector("#search-count");

let tasks = store.loadTasks();
let currentFilter = "all";
let searchQuery = "";
let draggedId = null;

function getFilteredTasks() {
  let filtered = tasks;
  if (currentFilter === "completed") filtered = filtered.filter(t => t.done);
  if (currentFilter === "pending") filtered = filtered.filter(t => !t.done);
  if (searchQuery) filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery));
  return filtered;
}

function update() {
  const visibleTasks = getFilteredTasks();
  store.saveTasks(tasks);
  view.renderTasks(visibleTasks, taskListEl);
  view.renderCount(tasks, countEl);
  searchCountEl.textContent = `${visibleTasks.length} match${visibleTasks.length !== 1 ? "es" : ""}`;
}

formEl.addEventListener("submit", e => {
  e.preventDefault();
  const title = inputEl.value.trim();
  const dueDate = dateEl.value ? new Date(dateEl.value).toISOString() : null;
  const category = categoryEl.value;
  if (title) {
    tasks.push(new Task(uid(), title, false, dueDate, category));
    inputEl.value = "";
    dateEl.value = "";
    categoryEl.value = "";
    update();
  }
});

taskListEl.addEventListener("click", e => {
  const li = e.target.closest("li");
  const id = li?.dataset.id;
  if (!id) return;

  if (e.target.matches("input[type=checkbox]")) {
    const task = tasks.find(t => t.id === id);
    task?.toggle();
  } else if (e.target.matches(".delete")) {
    tasks = tasks.filter(t => t.id !== id);
  }

  update();
});

taskListEl.addEventListener("dblclick", e => {
  const span = e.target.closest(".title");
  if (span) {
    span.contentEditable = true;
    span.focus();
  }
});

taskListEl.addEventListener("blur", e => {
  const span = e.target.closest(".title");
  const li = span?.closest("li");
  const id = li?.dataset.id;
  if (span && id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.title = span.textContent.trim();
      update();
    }
    span.contentEditable = false;
  }
}, true);

filtersEl.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    currentFilter = e.target.dataset.filter;
    update();
  }
});

searchEl.addEventListener("input", e => {
  searchQuery = e.target.value.toLowerCase();
  update();
});

taskListEl.addEventListener("dragstart", e => {
  const li = e.target.closest("li");
  draggedId = li?.dataset.id;
});

taskListEl.addEventListener("dragover", e => {
  e.preventDefault();
});

taskListEl.addEventListener("drop", e => {
  const li = e.target.closest("li");
  const targetId = li?.dataset.id;
  if (draggedId && targetId && draggedId !== targetId) {
    const draggedIndex = tasks.findIndex(t => t.id === draggedId);
    const targetIndex = tasks.findIndex(t => t.id === targetId);
    const [moved] = tasks.splice(draggedIndex, 1);
    tasks.splice(targetIndex, 0, moved);
    update();
  }
  draggedId = null;
});

update();