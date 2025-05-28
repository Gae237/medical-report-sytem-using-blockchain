import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
  };

  return (
    <nav className="navbar fade-in-up">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span role="img" aria-label="stethoscope">🩺</span> MedBlock
        </Link>

        <ul className="navbar-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/login/patient" className="nav-link">Patient Login</Link></li>
          <li><Link to="/login/doctor" className="nav-link">Doctor Login</Link></li>
          <li><Link to="/dashboard/patient" className="nav-link">Patient Dashboard</Link></li>
          <li><Link to="/dashboard/doctor" className="nav-link">Doctor Dashboard</Link></li>
        </ul>

        <button onClick={toggleDarkMode} className="toggle-theme-btn">
          <span role="img" aria-label="moon">🌙</span> Toggle Theme
        </button>
      </div>
    </nav>
  );
}
