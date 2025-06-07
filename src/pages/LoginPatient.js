import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';
import { connectContract, getWalletAddress } from '../utils/contract';

export default function LoginPatient() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setStatus("🦊 Connecting to MetaMask...");

    try {
      const wallet = await getWalletAddress();
      const contract = await connectContract();

      setStatus("🔍 Verifying your role...");
      const user = await contract.getUser(wallet);

      if (user.role === 1n) {
        setStatus("✅ Logged in successfully as Patient. Redirecting...");
        setTimeout(() => {
          navigate("/dashboard/patient");
        }, 2000);
      } else if (user.role === 2n) {
        setStatus("⚠️ This wallet is registered as a Doctor. Please use the Doctor login.");
      } else {
        setStatus("❌ This wallet is not registered. Please register as a Patient.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Login failed. Please ensure MetaMask is connected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper fade-in-up">
      <div className="auth-card">
        <h2 className="auth-title">Patient Login</h2>

        <button className="auth-button" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login with MetaMask"}
        </button>

        <p className="auth-footer">
          Don’t have an account?{' '}
          <Link to="/register/patient" className="auth-link">
            Register here
          </Link>
        </p>

        {status && <p className="status-message">{status}</p>}
      </div>
    </div>
  );
}
