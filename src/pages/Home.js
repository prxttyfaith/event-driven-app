import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/Home.css';

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
          <h1>Welcome...</h1>
          <p></p>
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
