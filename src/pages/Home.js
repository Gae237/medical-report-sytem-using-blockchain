// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '2em' }}>
      <h1>Welcome to the Medical Report System</h1>
      <p>This platform uses blockchain for secure medical data sharing.</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default Home;
