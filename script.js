const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const clearAllButton = document.getElementById("clear-all");


let todos = JSON.parse(localStorage.getItem
    ("todos")
) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function rederTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo) => {
        const li = doceument.createElement("li");

        if(todo.completed) {
            li.classList.add("completed");
        }

        


    })
}