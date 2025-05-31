import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaWallet } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { getWalletAddress, connectContract } from '../utils/contract';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Auth.css';

export default function RegisterDoctor() {
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  // Check wallet connection on load
  useEffect(() => {
    async function fetchWallet() {
      try {
        const address = await getWalletAddress();
        setWallet(address);
      } catch (err) {
        toast.error("🦊 Please connect your MetaMask wallet");
      }
    }
    fetchWallet();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, confirm } = form;

    if (!wallet) {
      toast.error('MetaMask wallet not connected');
      setLoading(false);
      return;
    }

    if (!name || !email || !password || !confirm) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const contract = await connectContract();

      // 🔐 Register as doctor (2 = Role.Doctor)
      const tx = await contract.register(2);
      await tx.wait();

      toast.success(`✅ Doctor registered! Wallet: ${wallet.slice(0, 6)}...`);
    } catch (err) {
      console.error(err);
      toast.error('❌ Registration failed: maybe already registered?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper fade-in-up">
      <ToastContainer />
      <div className="auth-card">
        <h2 className="auth-title">Register as a Doctor</h2>

        {wallet && (
          <p className="wallet-connected">
            <FaWallet style={{ marginRight: '8px' }} />
            Wallet Connected: <strong>{wallet.slice(0, 6)}...{wallet.slice(-4)}</strong>
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <FaUser className="auth-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="auth-input with-icon"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="auth-input-group">
            <FaLock className="auth-icon" />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              className="auth-input with-icon"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login/doctor" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
