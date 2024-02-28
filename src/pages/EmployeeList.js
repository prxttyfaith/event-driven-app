import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EmployeeManager.css';
import Sidebar from '../components/Sidebar';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        console.log('Fetching employees from API...');
        GetEmployeeList();
      }, []);
    
      const GetEmployeeList = () => {
        axios.get('http://localhost:3000/employee')
          .then(response => {
            console.log('API Response:', response);
            setEmployees(response.data.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };

      return (
        <div>
          <Sidebar />
          <center>
              {/* <h1>EDP</h1> */}
              <h2>Employee List</h2>
          </center>
          <div className="todo-container">
    
            <ul id="list">
              {employees.map(employee => (
                <li key={employee.id}>
                  {employee.first_name}
                  {employee.middle_name}
                  {employee.last_name}
                  {employee.birthdate} 
                  {employee.address_line}
                  {employee.city}
                  {employee.state} 
                  {employee.country}
                  {employee.zip_code} 
                  {employee.employee_type}
                  {employee.status}
                  {employee.designation_id}
                  {employee.designation_name}
                  {employee.department_name}
                  
                  <div className="tasks-lists-container">
                    {/* <button className="edit-button" onClick={() => handleEditTask(task.id)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
    );
};

export default EmployeeList; 