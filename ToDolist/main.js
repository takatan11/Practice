"use strict";
let nextId = 0;
const todos = [];
const form = document.getElementById("new-todo-form");
const input = document.getElementById("new-todo-title");
const list = document.getElementById("todo-list");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value == "") {
        return;
    }
    let todo = {
        id: nextId++,
        title: input.value,
        completed: false
    };
    todos.push(todo);
    input.value = "";
    const item = document.createElement("li");
    item.textContent = (todo.title);
    list.append(item);
});
//# sourceMappingURL=main.js.map