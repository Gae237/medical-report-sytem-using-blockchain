import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Auth.css';
import { connectContract, getWalletAddress } from '../utils/contract';

export default function LoginDoctor() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    toast.info("🦊 Connecting to MetaMask...");

    try {
      const wallet = await getWalletAddress(); // Get connected wallet address
      const contract = await connectContract(); // Connect to deployed contract
      const user = await contract.getUser(wallet); // Check user's role

      if (user.role === 2n) {
        toast.success("✅ Login successful as Doctor. Redirecting...");
        setTimeout(() => navigate("/dashboard/doctor"), 2000);
      } else if (user.role === 1n) {
        toast.warn("⚠️ This wallet is registered as a Patient.");
      } else {
        toast.error("❌ Wallet not registered. Please register as a Doctor.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Login failed. Please ensure MetaMask is connected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper fade-in-up">
      <ToastContainer />
      <div className="auth-card">
        <h2 className="auth-title">Doctor Login</h2>

        <button onClick={handleLogin} className="auth-button" disabled={loading}>
          {loading ? 'Connecting...' : 'Login with MetaMask'}
        </button>

        <p className="auth-footer">
          Don’t have an account?{' '}
          <Link to="/register/doctor" className="auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
