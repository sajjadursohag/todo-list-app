
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const clearAllButton = document.getElementById("clear-all");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    if (todo.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement("span");
    span.textContent = todo.text;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
      const updatedText = prompt("Edit your task:", todo.text);

      if (updatedText !== null && updatedText.trim()) {
        todo.text = updatedText.trim();
        saveTodos();
        renderTodos();
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    li.append(checkbox, span, editButton, deleteButton);
    todoList.appendChild(li);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (!text) return;

  todos.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  saveTodos();
  renderTodos();
  input.value = "";
  input.focus();
});

clearAllButton.addEventListener("click", () => {
  if (todos.length === 0) return;

  if (confirm("Delete all tasks?")) {
    todos = [];
    saveTodos();
    renderTodos();
  }
});

renderTodos();
