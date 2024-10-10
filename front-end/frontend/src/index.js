// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './AppRoutes';

import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals(console.log);
