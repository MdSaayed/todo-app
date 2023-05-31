const todoInput = document.querySelector('#todo-input');
const addTodoBtn = document.querySelector('#add-todo-btn');
const todoLists = document.querySelector('#todo-lists');

// add todo function
const addTodo = (e) => {
  e.preventDefault();
  var todoValue = todoInput.value;
  var todoId = Date.now().toString();
  createTodoElement(todoValue, todoId);
  saveTodoToLocalStorage(todoValue, todoId);
}

// delete todo function
const deleteTodoSystem = (e) => {
  const selectedTodo = e.target.parentElement.parentElement;
  todoLists.removeChild(selectedTodo);

  const todoId = selectedTodo.id;
  var todos = getTodosFromLocalStorage();
  todos = todos.filter((todo) => todo.todoId !== todoId);
  localStorage.setItem('todoItem', JSON.stringify(todos));
}

// create todo element
const createTodoElement = (todoValue, todoId) => {
  const todoElement = document.createElement('li');
  todoElement.classList.add('list-item');
  todoElement.id = todoId;
  todoElement.innerHTML = `<span>${todoValue}</span><span><i class="fa-regular fa-trash-can delete-todo"></i></span>`;
  todoLists.appendChild(todoElement);

  // delete todo 
  const deleteTodo = todoElement.querySelector('.delete-todo');
  deleteTodo.addEventListener('click', deleteTodoSystem);

  todoInput.value = '';
}





//get todo from local storage
function getTodosFromLocalStorage() {
    return localStorage.getItem('todoItem') ? JSON.parse(localStorage.getItem('todoItem')) : [];
  }
  
//save todo to local storage
  function saveTodoToLocalStorage(todoValue, todoId) {
    const todos = getTodosFromLocalStorage();
    todos.unshift({ todoValue, todoId });
    localStorage.setItem('todoItem', JSON.stringify(todos));
  }
  
  //load todo 
  function loadTodos() {
    const todos = getTodosFromLocalStorage();
    todos.forEach((todo) => createTodoElement(todo.todoValue, todo.todoId));
  }
  

// adding event listener
addTodoBtn.addEventListener('click', addTodo);

window.addEventListener('DOMContentLoaded', loadTodos);
