import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

export default function RegisterPatient() {
  return (
    <div className="auth-wrapper fade-in-up">
      <div className="auth-card">
        <h2 className="auth-title">Register as a Patient</h2>

        <form className="auth-form">
          <input type="text" placeholder="Full Name" className="auth-input" required />
          <input type="email" placeholder="Email Address" className="auth-input" required />
          <input type="password" placeholder="Password" className="auth-input" required />
          <input type="password" placeholder="Confirm Password" className="auth-input" required />
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login/patient" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
