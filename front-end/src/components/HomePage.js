// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToDeliveryPerson = () => {
    navigate('/deliveryperson');
  };

  return (
    <div className="container"> {/* Apply the CSS class */}
      <h1>Hello</h1>
      <button onClick={navigateToDeliveryPerson}>Click Me</button>
    </div>
  );
};

export default HomePage;
