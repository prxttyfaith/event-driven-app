// ./src/pages/Page404.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Page404.css';
import Sidebar from '../components/Sidebar';

const Page404 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // navigate(-1); // Go back to the previous page
    navigate('/'); // Go back to the homepage
  };

  return (
    <div>
      <Sidebar />
      {/* <h1><center>EDP</center></h1> */}
      <div className="page-404-container">
        <div className="error-message"><h2>Error 404: Page Not Found</h2></div>
        <button className="back-button" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default Page404;
