import { escapeHTML } from "./utils.js";

export function renderTasks(tasks, container) {
  container.innerHTML = tasks.map(task => {
    const overdueClass = task.isOverdue?.() ? "overdue" : "";
    const checkboxId = `task-check-${task.id}`;
    return `
      <li data-id="${task.id}" class="${task.done ? "done" : ""} ${overdueClass}" draggable="true">
        <div class="checkbox-group">
          <input type="checkbox" id="${checkboxId}" ${task.done ? "checked" : ""} />
          <label for="${checkboxId}" class="visually-hidden">Mark task "${escapeHTML(task.title)}" as done</label>
        </div>
        <span class="title" contenteditable="false">${escapeHTML(task.title)}</span>
        ${task.dueDate ? `<small class="due">Due: ${new Date(task.dueDate).toLocaleDateString()}</small>` : ""}
        ${task.category ? `<small class="category">${escapeHTML(task.category)}</small>` : ""}
        <button class="delete" aria-label="Delete task">🗑</button>
      </li>
    `;
  }).join("");
}


export function renderCount(tasks, countEl) {
  const remaining = tasks.filter(t => !t.done).length;
  countEl.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} remaining`;
}
