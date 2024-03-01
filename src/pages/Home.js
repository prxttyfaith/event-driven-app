import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Sidebar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to EDP</h1>
          <p>Empower our project using Event Driven Programming solutions. :)</p>
          <div className="cta-buttons">
            <Link to="/task-manager" className="cta-button">Task Manager</Link>
            <Link to="/employee-manager" className="cta-button">Employee Manager</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
