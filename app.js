// define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event Listners
loadEventListners();

// Load all event Listeners
function loadEventListners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    // add task event
    form.addEventListener('submit',addTask);
    // remove task event
    taskList.addEventListener('click',removeTask);
    // clear task event
    clearBtn.addEventListener('click',clearTasks);
    // filter Task Event 
    filter.addEventListener('keyup',filterTasks);

}
// Get Tasks from LS
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null ) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 

    tasks.forEach(function(task){
        // create li element
    const li = document.createElement('li');
    // add class
    li.className ='collection-item';
    // create text node and appened to li 
    li.appendChild(document.createTextNode(task));
    // create a new Link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // Append the link to the li
    li.appendChild(link);


    // append li to ul
    taskList.appendChild(li);
    });
}

// add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task');
    }

    // create li element
    const li = document.createElement('li');
    // add class
    li.className ='collection-item';
    // create text node and appened to li 
    li.appendChild(document.createTextNode(taskInput.value));
    // create a new Link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // Append the link to the li
    li.appendChild(link);


    // append li to ul
    taskList.appendChild(li);

    // store in local Storage 
    storeTaskInLocalStorage(taskInput.value);

    // clear input 
    taskInput.value = '';

    e.preventDefault();

}

// store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null ) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}



// Remove Task 
function removeTask(e){
   if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you Sure?')){
        e.target.parentElement.parentElement.remove();
        
        // remove task from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }  
   } 
}

// remove form LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null ) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// clear task event
function clearTasks(){
//    taskList.innerHTML = '';
//  faster this method is faster than inner html
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // clear from LS
    clearTasksFromLocalStorage();
}

// clear task from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}