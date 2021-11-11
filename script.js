const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
    todos.forEach(todo => {
        addTodo(todo)
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo(todo) {

    let toDoText = input.value;

    if(todo) {
        toDoText = todo.text;
    }

    if(toDoText) {
        const todoEL = document.createElement ("li");

        if(todo && todo.completed) {
            todoEL.classList.add("completed");
        }

        todoEL.innerText = toDoText;

        todoEL.addEventListener("click", () => {
            todoEL.classList.toggle("completed")

            uptadeLS();
        });

        todoEL.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEL.remove();

            uptadeLS();
        });

        todosUL.appendChild(todoEL);

        input.value = "";

        uptadeLS();
    }
}

function uptadeLS() {
    const todosEL = document.querySelectorAll('li');

    const todos = [];

    todosEL.forEach(todoEL => {
        todos.push({
            text: todoEL.innerText, 
            completed: todoEL.classList.contains("completed")
        })
    });

    localStorage.setItem("todos", JSON.stringify (todos));
}