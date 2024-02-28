// ./src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`home-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar" style={{ width: collapsed ? '50px' : '180px' }}>
        <div className="sidebar-header" onClick={toggleSidebar}>
          <h2 className="sidebar-heading">
            EDP
          </h2>
          <span className="toggle-icon">{collapsed ? '☰' : '←'}</span>
        </div>
        <ul className={`sidebar-menu ${collapsed ? 'collapsed' : ''}`}>
          <li className="sidebar-menu-item">
            <Link to="/">Home</Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/task-manager">Task Manager</Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/create-employee">Employee Manager</Link>
          </li>
          <div className={`sidebar-menu-item ${collapsed ? 'collapsed' : ''}`}>
            <ul style={{ paddingLeft: '20px' }}>
                <li><Link to="/employee-manager/create-employee">Create Employee</Link></li>
                <li><Link to="/employee-manager/employee-list">Employee List</Link></li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
