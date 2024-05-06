import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/Home.css';

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  // const toggleSidebar = () => {
  //   setCollapsed(!collapsed);
  // };

  return (
    <div>
      <Sidebar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>UNICODE TOOLS</h1>
          <p></p>
          <div className="cta-buttons">
            <Link to="/employee-manager/employee-list" className="cta-button">Employee Manager</Link>
            <Link to="/payroll-manager/payroll-report" className="cta-button">Payroll Manager</Link>
            <Link to="/task-manager" className="cta-button">Task Manager</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
