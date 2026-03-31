function deleteTask(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        updateCounters();
        const li = document.querySelector(`li[data-id="${id}"]`);
        li.remove();
    }
}

function updateCounters() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    document.getElementById('total-tasks').innerText = totalTasks;
    document.getElementById('completed-tasks').innerText = completedTasks;
}