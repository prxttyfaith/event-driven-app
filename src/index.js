// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './routes/AppRoutes'; // Import AppRoutes
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <AppRoutes /> {/* Use AppRoutes component here */}
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
