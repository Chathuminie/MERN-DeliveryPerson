// src/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import DeliveryPerson from './components/DeliveryPerson';
import Sidebar from './components/Sidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const showSidebar = location.pathname === '/deliveryperson';

  return (
    <div style={{ display: 'flex' }}>
      {showSidebar && <Sidebar />}
      <div style={{ marginLeft: showSidebar ? '250px' : '0', padding: '20px', width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

const AppRoutes = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/deliveryperson" element={<DeliveryPerson />} />
        {/* Add other routes here */}
      </Routes>
    </Layout>
  </Router>
);

export default AppRoutes;
