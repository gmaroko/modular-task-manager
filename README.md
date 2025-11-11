# Modular Task Manager

A lightweight, modular task manager built with vanilla JavaScript.

---

## Features

- Add, edit, complete, and delete tasks
- Filter by status: All / Completed / Pending
- Due date support with overdue highlighting
- Task categories (Work, Personal, Urgent)
- Live search with match count
- Inline editing on double-click
- LocalStorage persistence
- Drag-and-drop task reordering

---

## Project Structure
```bash
.
├── Dockerfile
├── index.html
├── README.md
├── src
│   ├── app.js
│   ├── store.js
│   ├── Task.js
│   ├── utils.js
│   └── view.js
└── style.css

```



---

## Setup

### Local Development

1. Clone the repo:
   ```bash
   git clone https://github.com/gmaroko/modular-task-manager.git
   cd task-manager
   ```

2. Open index.html in your browser — no build tools required.


### Docker Deployment

1. Build the image::
   ```bash
   docker build -t 06992014/modular-task-manager:latest .
   ```

   OR Pull Image
   ```bash
   docker pull 06992014/modular-task-manager:latest
   ```

2. Run the container:
    ```bash
    docker run -p 8080:80 06992014/modular-task-manager:latest
    ```
3. Visit http://localhost:8080

---

## Technologies
- HTML5
- CSS3
- JavaScript
- Nginx 

---
## License
[MIT](https://opensource.org/license/MIT) — free to use, modify, and distribute.

---