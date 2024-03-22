import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Routes from react-router-dom
import PathConstants from './PathConstants';
import Page404 from '../pages/Page404';
import Home from '../pages/Home';
import TaskManager from '../pages/TaskManager';
import EmployeeManager from '../pages/EmployeeManager';
import AddEmployee from '../pages/AddEmployee';
import EmployeeList from '../pages/EmployeeList';
import AddSignatory from '../pages/AddSignatory';
import SignatoryList from '../pages/SignatoryList';
import LeaveRequest from '../pages/LeaveRequest';
import LeaveRequestList from '../pages/LeaveRequestList';

const AppRoutes = () => { // Rename Routes to AppRoutes
  return (
    <Routes>
      <Route path={PathConstants.HOME} element={<Home />} />
      <Route path={PathConstants.TASKMANAGER} element={<TaskManager />} />
      <Route path={PathConstants.EMPLOYEEMANAGER} element={<EmployeeManager />} />
      <Route path={PathConstants.ADDEMPLOYEE} element={<AddEmployee />} />
      <Route path={PathConstants.EMPLOYEELIST} element={<EmployeeList />} />
      <Route path={PathConstants.ADDSIGNATORY} element={<AddSignatory />} />
      <Route path={PathConstants.SIGNATORYLIST} element={<SignatoryList />} />
      <Route path={PathConstants.LEAVEREQUEST} element={<LeaveRequest />} />
      <Route path={PathConstants.LEAVEREQUESTLIST} element={<LeaveRequestList />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes; // Export AppRoutes
