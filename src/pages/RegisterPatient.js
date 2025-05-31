import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import { connectContract, getWalletAddress } from '../utils/contract';

export default function RegisterPatient() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [wallet, setWallet] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  useEffect(() => {
    const checkMetaMask = async () => {
      if (!window.ethereum) {
        setStatus("❌ MetaMask not detected. Please install MetaMask.");
        return;
      }

      try {
        const address = await getWalletAddress();
        setWallet(address);
        setStatus("✅ Wallet connected: " + address.slice(0, 6) + "..." + address.slice(-4));
      } catch (err) {
        setStatus("⚠️ Please connect your MetaMask wallet.");
      }
    };

    checkMetaMask();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = form;

    if (!wallet) {
      setStatus("❌ Please connect your MetaMask wallet.");
      return;
    }

    if (!name || !email || !password || !confirm) {
      setStatus("❌ All fields are required.");
      return;
    }

    if (password !== confirm) {
      setStatus("❌ Passwords do not match.");
      return;
    }

    setLoading(true);
    setStatus("⏳ Registering on blockchain...");

    try {
      const contract = await connectContract();
      const tx = await contract.register(1); // 1 = Patient
      await tx.wait();

      setStatus("✅ Successfully registered as Patient. Redirecting...");
      setTimeout(() => {
        navigate("/dashboard/patient");
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus("❌ Registration failed. You may already be registered.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper fade-in-up">
      <div className="auth-card">
        <h2 className="auth-title">Register as a Patient</h2>

        <p className="wallet-display">
          <strong>Wallet:</strong> {wallet || "Not connected"}
        </p>

        <form className="auth-form" onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="auth-input"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="auth-input"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            className="auth-input"
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login/patient" className="auth-link">
            Login here
          </Link>
        </p>

        {status && <p className="status-message">{status}</p>}
      </div>
    </div>
  );
}
