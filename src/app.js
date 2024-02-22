import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log('Fetching tasks from API...');
    fetch('http://localhost:3000/to-do-list')
      .then(response => {
        console.log('API Response:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Data:', data);
        setTasks(data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;