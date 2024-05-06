
// ./src/pages/TaskManager.js
import '../styles/Main.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import config from '../config';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    console.log('Fetching tasks from API...');
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get(`${config.apiUrl}/to-do-list`)
      .then(response => {
        console.log('API Response:', response);
        setTasks(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  // Add task to the list
  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    fetch(`${config.apiUrl}/to-do-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: taskInput }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add task');
        }
        return response.json();
      })
      .then(() => {
        fetchTasks();
        setTaskInput('');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  function onClick(id) {
    const taskExists = tasks.some(task => task.id === id);

    if (taskExists) {
      handleDeleteTask(id);
    } else {
      console.error(`Task with id ${id} does not exist.`);
    }
  }

  // Delete a task by its id
  const handleDeleteTask = async (idToDelete) => {
    try {
      // Make a DELETE request to the API endpoint
      await axios.delete(`${config.apiUrl}/to-do-list/${idToDelete}`);

      // Remove the deleted task from the tasks state
      setTasks(tasks.filter(task => task.id !== idToDelete));

      console.log(`Task with id ${idToDelete} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // edit task on the list
  const handleEditTask = async (idToEdit) => {
    try {
      // Find the task with the given ID
      const taskToEdit = tasks.find(task => task.id === idToEdit);

      // Prompt the user for the new task name, with the current name as the default value
      const newTaskName = prompt('Edit task:', taskToEdit.name);

      // Naay bug dire, so if the user cancelled the prompt, don't proceed with the edit
      if (newTaskName === null) {
        return;
      }

      // Make a PUT request to the API endpoint
      await axios.put(`${config.apiUrl}/to-do-list/${idToEdit}`, { name: newTaskName });

      // Update the task in the tasks state
      setTasks(tasks.map(task => task.id === idToEdit ? { ...task, name: newTaskName } : task));

      console.log(`Task with id ${idToEdit} edited successfully.`);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <div>
      <Sidebar/>
      <div className="task-manager-container">
          <h2>Task Manager</h2>

        <div className="todo-container">
          <div>
            <input
              type="text"
              className="task-input"
              placeholder="Enter new task..."
              value={taskInput}
              onChange={handleInputChange}
            />
            <button className="add-button" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
          <ul id="list">
            {tasks.map(task => (
              <li id="item" key={task.id}>
                {task.name}
                <div className="tasks-lists-container">
                  <button className="edit-button" onClick={() => handleEditTask(task.id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;