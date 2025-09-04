let todoList = [];

document.addEventListener("DOMContentLoaded", loadData);

function saveData() {
    localStorage.setItem("todolist", JSON.stringify(todoList));
}
function loadData() {
    const storedTodos = localStorage.getItem("todolist");
    if (storedTodos) {
        todoList = JSON.parse(storedTodos);
        if(todoList.length === 0){
            const noTask = document.getElementById('todo-list');
            noTask.innerHTML = "<p>no task</p>";
        } else{
            renderTodoList();
        }
    }
}

function validateInput() {
    const todoInput = document.getElementById('todo-input').value;
    const todoDateInput = document.getElementById('todo-date-input').value;

    if (todoInput === '' || todoDateInput === '') {
        alert('please fill in all blank form')
    } else {
        addTodo(todoInput, todoDateInput);
    }
}

function addTodo(todo, dueDate) {
    document.getElementById('todo-input').value = '';
    document.getElementById('todo-date-input').value = '';
    const todoItem = {
        task: todo,
        dueDate: dueDate,
        completed: false
    }
    todoList.push(todoItem);
    saveData();
    renderTodoList();
}

function deleteAllTodo() {
    todoList = [];
    localStorage.removeItem("todolist");
    const noTask = document.getElementById('todo-list');
    noTask.innerHTML = "<p>no task</p>";
    saveData();
}

function filterTodo() {
}


function renderTodoList() {
    const todoListContainer = document.getElementById('todo-list');
    todoListContainer.innerHTML = '';

    todoList.forEach((item) => {
        todoListContainer.innerHTML +=`
        <div class="flex justify-between">
        <p class="m-0">${item.task} - Due: ${item.dueDate}</p>
        <input type="checkbox" id="check" class="w-5 h-5 m-0">
        </div>
        `;
    });
}