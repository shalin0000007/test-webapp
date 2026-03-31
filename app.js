// Task Manager Application
// Bug 1: Counter not updating when task is deleted
// Bug 2: LocalStorage not implemented (data lost on refresh)
// Bug 3: Enter key doesn't work for adding tasks

let tasks = [];
let totalTasks = 0;
let completedTasks = 0;

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');

// Add task function
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;
    
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    tasks.push(task);
    totalTasks++;
    
    renderTask(task);
    updateStats();
    
    taskInput.value = '';
}

// Render single task
function renderTask(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text">${task.text}</span>
        <button class="delete-btn">Delete</button>
    `;
    
    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => toggleTask(task.id));
    
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    taskList.appendChild(li);
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        const li = document.querySelector(`li[data-id="${id}"]`);
        li.classList.toggle('completed');
        
        if (task.completed) {
            completedTasks++;
        } else {
            completedTasks--;
        }
        updateStats();
    }
}

// Delete task - BUG: Doesn't update counters!
function deleteTask(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        const task = tasks[taskIndex];
        
        // BUG: Should update totalTasks and completedTasks before removing
        // Missing counter update logic here!
        
        tasks.splice(taskIndex, 1);
        
        const li = document.querySelector(`li[data-id="${id}"]`);
        li.remove();
        
        // BUG: Not calling updateStats() after deletion
        // updateStats();  <-- This should be called here
    }
}

// Update statistics display
function updateStats() {
    totalCount.textContent = totalTasks;
    completedCount.textContent = completedTasks;
}

// Event listeners
addBtn.addEventListener('click', addTask);

// BUG: Enter key not working - missing event listener
// Should add: taskInput.addEventListener('keypress', ...)

// Initialize
updateStats();
