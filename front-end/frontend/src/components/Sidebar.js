import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li className={location.pathname === '/suppliers' ? 'active' : ''}>
          <Link to="/suppliers">Suppliers</Link>
        </li>
        <li className={location.pathname === '/products' ? 'active' : ''}>
          <Link to="/products">Products</Link>
        </li>
        <li className={location.pathname === '/delivery' ? 'active' : ''}>
          <Link to="/delivery">Delivery</Link>
        </li>
        <li className={location.pathname === '/employee' ? 'active' : ''}>
          <Link to="/employee">Employee</Link>
        </li>
        <li className={location.pathname === '/orders' ? 'active' : ''}>
          <Link to="/orders">Orders</Link>
        </li>
        <li className={location.pathname === '/deliveryperson' ? 'active' : ''}>
          <Link to="/deliveryperson">Delivery Person</Link>
        </li>
        <li className="icons">
          <Link to="/profile" className="profile-icon"><FaUser /></Link>
          <Link to="/logout" className="logout-icon"><FaSignOutAlt /></Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
