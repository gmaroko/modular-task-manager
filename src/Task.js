export class Task {
  constructor(id, title, done = false, dueDate = null, category = "") {
    if (!title || typeof title !== "string") throw new Error("Invalid title");
    this.id = id;
    this.title = title.trim();
    this.done = done;
    this.dueDate = dueDate;
    this.category = category;
  }

  toggle() {
    this.done = !this.done;
  }

  isOverdue() {
    return this.dueDate && !this.done && new Date(this.dueDate) < new Date();
  }
}
