import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faList, faUsers, faMoneyBillWave, faHome, faTasks, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isEmployeeSubmenuOpen, setIsEmployeeSubmenuOpen] = useState(JSON.parse(localStorage.getItem('isEmployeeSubmenuOpen')) !== null ? JSON.parse(localStorage.getItem('isEmployeeSubmenuOpen')) : true);
  const [isPayrollSubmenuOpen, setIsPayrollSubmenuOpen] = useState(JSON.parse(localStorage.getItem('isPayrollSubmenuOpen')) !== null ? JSON.parse(localStorage.getItem('isPayrollSubmenuOpen')) : true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (collapsed) {
      setIsEmployeeSubmenuOpen(false);
      setIsPayrollSubmenuOpen(false);
    }
  }, [collapsed]);

  const toggleEmployeeSubmenu = (e) => {
    e.preventDefault();
    const newState = !isEmployeeSubmenuOpen;
    setIsEmployeeSubmenuOpen(newState);
    localStorage.setItem('isEmployeeSubmenuOpen', JSON.stringify(newState));
  };

  const togglePayrollSubmenu = (e) => {
    e.preventDefault();
    const newState = !isPayrollSubmenuOpen;
    setIsPayrollSubmenuOpen(newState);
    localStorage.setItem('isPayrollSubmenuOpen', JSON.stringify(newState));
  };

  const handleMenuItemClick = () => {
    if (collapsed) {
      toggleSidebar();
    }
  };

  return (
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      
      <div className="sidebar-header" onClick={toggleSidebar}>
        <Link to="/" className="no-underline">
          {collapsed ? <h2>U</h2> : <h2>UNICODE</h2>}
        </Link>
        <span className="toggle-icon sidebar-spaces-flex">
          {collapsed ?  <KeyboardArrowRightIcon fontSize="large" /> : <KeyboardArrowLeftIcon fontSize="large" />}
        </span>
      </div>

      <ul className={`sidebar-menu ${collapsed ? 'collapsed' : ''}`}>

        <li className="sidebar-menu-item" onClick={handleMenuItemClick}>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
            <div className="sidebar-spaces sidebar-spaces-flex">
              {!collapsed && <span className="sidebar-spaces">Home</span>}
            </div>
          </Link>
        </li>
        <li className="sidebar-menu-item" onClick={e => {toggleEmployeeSubmenu(e); handleMenuItemClick();}} aria-expanded={isEmployeeSubmenuOpen}>
          <Link to="/employee-manager/employee-list">
            <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
            <div className="sidebar-spaces sidebar-spaces-flex">
              {!collapsed && <span className="sidebar-spaces">Employee Manager</span>}
              {!collapsed && <FontAwesomeIcon icon={isEmployeeSubmenuOpen ? faCaretUp : faCaretDown} />}
            </div>
          </Link>

          {isEmployeeSubmenuOpen && (
            <ul className="sidebar-submenu">
              <li>
              <Link to="/employee-manager/add-employee" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Add Employee</span>
                  </Link>
              </li>
              <li>
                  <Link to="/employee-manager/employee-list" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Employee List</span>
                  </Link>
              </li>
              <li>
                  <Link to="/employee-manager/add-signatory" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Add Signatory</span>
                  </Link>
              </li>
              <li>
                  <Link to="/employee-manager/signatory-list" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Signatory List</span>
                  </Link>
              </li>
              <li>
                  <Link to="/employee-manager/leave-request" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Leave Request</span>
                  </Link>
              </li>
              <li>
                  <Link to="/employee-manager/leave-request-status" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Leave Request Status</span>
                  </Link>
              </li>
              {/* <li>
                  <Link to="/payroll-manager/add-earnings-deductions" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Earnings & Deductions</span>
                  </Link>
              </li>
              <li>
                  <Link to="/employee-manager/generate-payroll" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Generate Payroll</span>
                  </Link>
              </li>
              <li>
                  <Link to="/employee-manager/employee-payslip" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Employee Payslip</span>
                  </Link>
              </li>
              <li>
                  <Link to="/employee-manager/payroll-report" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Payroll Report</span>
                  </Link>
              </li> */}

            </ul>
        )}
        </li>


        <li className="sidebar-menu-item" onClick={e => {togglePayrollSubmenu(e); handleMenuItemClick();}} aria-expanded={isPayrollSubmenuOpen}>
          <Link to="/payroll-manager/payroll-report">
            <FontAwesomeIcon icon={faMoneyBillWave} className="sidebar-icon" />
            <div className="sidebar-spaces sidebar-spaces-flex">
              {!collapsed && <span className="sidebar-spaces">Payroll Manager</span>}
              {!collapsed && <FontAwesomeIcon icon={isPayrollSubmenuOpen ? faCaretUp : faCaretDown} />}
            </div>
          </Link>

          {isPayrollSubmenuOpen && (
            <ul className="sidebar-submenu">
              <li>
                  <Link to="/payroll-manager/add-earnings-deductions" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Earnings & Deductions</span>
                  </Link>
              </li>
              <li>
                  <Link to="/payroll-manager/generate-payroll" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Generate Payroll</span>
                  </Link>
              </li>
              <li>
                  <Link to="/payroll-manager/employee-payslip" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Employee Payslip</span>
                  </Link>
              </li>
              <li>
                  <Link to="/payroll-manager/payroll-report" onClick={e => e.stopPropagation()}>
                  <span className="sidebar-spaces">Payroll Report</span>
                  </Link>
              </li>

            </ul>
        )}
        </li>


        <li className="sidebar-menu-item" onClick={handleMenuItemClick}>
          <Link to="/task-manager">
            <FontAwesomeIcon icon={faTasks} className="sidebar-icon" />
            <div className="sidebar-spaces sidebar-spaces-flex">
              {!collapsed && <span className="sidebar-spaces">Task Manager</span>}
            </div>
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;