// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal'; // Import Modal
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Import AppRoutes
import reportWebVitals from './reportWebVitals';

Modal.setAppElement('#root'); // Set app element for react-modal

ReactDOM.render(
  <BrowserRouter>
    <AppRoutes /> {/* Use AppRoutes component here */}
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();