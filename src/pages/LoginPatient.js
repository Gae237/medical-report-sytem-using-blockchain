import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Auth.css';

export default function LoginPatient() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.email || !form.password) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      toast.success('Login successful');
    }, 1500);
  };

  return (
    <div className="auth-wrapper fade-in-up">
      <ToastContainer />
      <div className="auth-card">
        <h2 className="auth-title">Patient Login</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <FaEnvelope className="auth-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="auth-input with-icon"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-input-group">
            <FaLock className="auth-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="auth-input with-icon"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{' '}
          <Link to="/register/patient" className="auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
