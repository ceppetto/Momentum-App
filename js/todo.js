const toDoForm = document.getElementById("todo-form");
const toDOList = document.getElementById("todo-list");
const toDoInput = document.querySelector("#todo-form input");
let toDos = [];

const TODOS_KEY = "todos";

function saveTodo() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
    const deleteLi = event.target.parentElement;
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(deleteLi.id)); // typeof(toDo.id) === String
    deleteLi.remove();
    saveTodo();
}

function paintTodo(newTodoObj) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    span.innerText = newTodoObj.text;
    button.innerText = "❌";
    li.id = newTodoObj.id;

    li.appendChild(span);
    li.appendChild(button);
    toDOList.appendChild(li);

    button.addEventListener("click", deleteTodo);
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodo();
}

toDoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    parsedTodos.forEach((item) => {
        toDos.push(item);
        paintTodo(item);
    });
}