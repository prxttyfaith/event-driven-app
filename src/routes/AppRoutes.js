import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Routes from react-router-dom
import PathConstants from './PathConstants';
import Home from '../pages/Home';
import TaskManager from '../pages/TaskManager';
import EmployeeManager from '../pages/EmployeeManager';
import AddEmployee from '../pages/AddEmployee';
import EmployeeList from '../pages/EmployeeList';
import Page404 from '../pages/Page404';

const AppRoutes = () => { // Rename Routes to AppRoutes
  return (
    <Routes>
      <Route path={PathConstants.HOME} element={<Home />} />
      <Route path={PathConstants.TASKMANAGER} element={<TaskManager />} />
      <Route path={PathConstants.EMPLOYEEMANAGER} element={<EmployeeManager />} />
      <Route path={PathConstants.ADDEMPLOYEE} element={<AddEmployee />} />
      <Route path={PathConstants.EMPLOYEELIST} element={<EmployeeList />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes; // Export AppRoutes
