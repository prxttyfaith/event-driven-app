function addTask() {
    var taskInput = document.getElementById('taskInput').value;
    if (taskInput.trim() !== '') {
        var table = document.getElementById('taskTable');
        var row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = taskInput;
        cell2.innerHTML = '<button onclick="editTask(this)">Edit</button> <button onclick="deleteTask(this)">Delete</button>';
        document.getElementById('taskInput').value = '';
    }
}

function editTask(button) {
    var row = button.parentNode.parentNode;
    var task = row.cells[0].innerHTML;
    var updatedTask = prompt('Edit task:', task);
    if (updatedTask !== null) {
        row.cells[0].innerHTML = updatedTask;
    }
}

function deleteTask(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
