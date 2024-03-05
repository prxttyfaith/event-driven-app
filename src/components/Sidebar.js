import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faList, faUser, faUserPlus, faHome, faTasks, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(JSON.parse(localStorage.getItem('isSubmenuOpen')) !== null ? JSON.parse(localStorage.getItem('isSubmenuOpen')) : true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (collapsed) {
      setIsSubmenuOpen(false);
    }
  }, [collapsed]);

  const toggleSubmenu = (e) => {
    e.preventDefault();
    const newState = !isSubmenuOpen;
    setIsSubmenuOpen(newState);
    localStorage.setItem('isSubmenuOpen', JSON.stringify(newState));
  };

  const handleMenuItemClick = () => {
    if (collapsed) {
      toggleSidebar();
    }
  };

  return (
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      
      <div className="sidebar-header" onClick={toggleSidebar}>
        {!collapsed && <h2>UNICODE</h2>}
        <span className="toggle-icon">
          {collapsed ?  <KeyboardArrowRightIcon fontSize="large" /> : <KeyboardArrowLeftIcon fontSize="large" />}
        </span>
      </div>

      <ul className={`sidebar-menu ${collapsed ? 'collapsed' : ''}`}>

        <li className="sidebar-menu-item" onClick={handleMenuItemClick}>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
            {!collapsed && <span className="sidebar-spaces">Home</span>}
          </Link>
        </li>

        <li className="sidebar-menu-item" onClick={e => {toggleSubmenu(e); handleMenuItemClick();}} aria-expanded={isSubmenuOpen}>
            <Link to="/employee-manager/employee-list">
                <FontAwesomeIcon icon={faUserPlus} className="sidebar-icon" />
                {!collapsed && <span className="sidebar-spaces">Employee Manager</span>}
                {!collapsed && <FontAwesomeIcon icon={isSubmenuOpen ? faCaretUp : faCaretDown} />}
            </Link>

            {isSubmenuOpen && (
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
            </ul>
        )}
        </li>

        <li className="sidebar-menu-item" onClick={handleMenuItemClick}>
          <Link to="/task-manager">
            <FontAwesomeIcon icon={faTasks} className="sidebar-icon" />
            {!collapsed && <span className="sidebar-spaces">Task Manager</span>}
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;