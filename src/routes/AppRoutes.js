import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Routes from react-router-dom
import PathConstants from './PathConstants';
import Page404 from '../pages/Page404';
import Home from '../pages/Home';
import TaskManager from '../pages/TaskManager';
import AddEmployee from '../pages/EmployeeManager/AddEmployee';
import EmployeeList from '../pages/EmployeeManager/EmployeeList';
import AddSignatory from '../pages/EmployeeManager/AddSignatory';
import SignatoryList from '../pages/EmployeeManager/SignatoryList';
import LeaveRequest from '../pages/EmployeeManager/LeaveRequest';
import LeaveRequestStatus from '../pages/EmployeeManager/LeaveRequestStatus';
import AddEarningsDeductions from '../pages/PayrollManager/AddEarningsDeductions';
import GeneratePayroll from '../pages/PayrollManager/GeneratePayroll';
import EmployeePayslip from '../pages/PayrollManager/EmployeePayslip';
import PayrollReport from '../pages/PayrollManager/PayrollReport';

const AppRoutes = () => { // Rename Routes to AppRoutes
  return (
    <Routes>
      <Route path={PathConstants.HOME} element={<Home />} />
      <Route path={PathConstants.TASKMANAGER} element={<TaskManager />} />
      <Route path={PathConstants.ADDEMPLOYEE} element={<AddEmployee />} />
      <Route path={PathConstants.EMPLOYEELIST} element={<EmployeeList />} />
      <Route path={PathConstants.ADDSIGNATORY} element={<AddSignatory />} />
      <Route path={PathConstants.SIGNATORYLIST} element={<SignatoryList />} />
      <Route path={PathConstants.LEAVEREQUEST} element={<LeaveRequest />} />
      <Route path={PathConstants.LEAVEREQUESTSTATUS} element={<LeaveRequestStatus />} />
      <Route path={PathConstants.ADDEARNINGSDEDUCTIONS} element={<AddEarningsDeductions />} />
      <Route path={PathConstants.GENERATEPAYROLL} element={<GeneratePayroll />} />
      <Route path={PathConstants.EMPLOYEEPAYSLIP} element={<EmployeePayslip />} />
      <Route path={PathConstants.PAYROLLREPORT} element={<PayrollReport />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes; // Export AppRoutes
