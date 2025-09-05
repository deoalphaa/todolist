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
            noTask.innerHTML = "<p class='text-gray-300'>no task</p>";
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
    noTask.innerHTML = "<p class='text-gray-300'>no task</p>";
    saveData();
}

function filterTodo() {
    const filterTodo = document.getElementById('filter-toggle');
        if (filterTodo.textContent.trim() === 'filter') {
            filterTodo.textContent = 'all';
            const incompleteTodos = todoList.filter(item => !item.completed);
            const todoListContainer = document.getElementById('todo-list');
            todoListContainer.innerHTML = '';
            if(incompleteTodos.length === 0){
                todoListContainer.innerHTML = "<p class='text-gray-300'>no task</p>";
            } else{
                incompleteTodos.forEach((item) => {
                todoListContainer.innerHTML +=`
                <li>
                    <div class="flex justify-between">
                        <p class="m-0 text-gray-400"><strong>${item.task} - Due: ${item.dueDate}</strong></p>
                        <input type="checkbox" class="w-5 h-5 m-0" ${item.completed ? 'checked' : ''} onclick="toggleComplete(${todoList.indexOf(item)})">
                    </div>
                </li>
                `;
            });
            }
        } else if (filterTodo.textContent.trim() === 'all') {
            filterTodo.textContent = 'filter';
            renderTodoList();
        }
    }
function toggleComplete(index) {
    todoList[index].completed = !todoList[index].completed;
    saveData();
    renderTodoList();
}


function renderTodoList() {
    const todoListContainer = document.getElementById('todo-list');
    todoListContainer.innerHTML = '';

    todoList.forEach((item, index) => {
        todoListContainer.innerHTML +=`
        <li>
            <div class="flex justify-between">
                <p class="m-0 text-gray-400"><strong>${item.task} - Due: ${item.dueDate}</strong></p>
                <input type="checkbox" class="w-5 h-5 m-0" ${item.completed ? 'checked' : ''} data-index="${index}" onclick="toggleComplete(${index})">
            </div>
        </li>
        `;
    });
}