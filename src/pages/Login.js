// src/pages/Login.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectContract, getWalletAddress } from '../utils/contract';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { setWallet, setRole } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState('patient');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleConnect = async () => {
    try {
      setLoading(true);
      setMessage('');
      
      const wallet = await getWalletAddress();
      const contract = await connectContract();

      // Check if already registered
      const user = await contract.users(wallet);
      const isRegistered = user.role !== 0; // Role.None = 0

      if (!isRegistered) {
        // Register user on-chain
        const tx = await contract.register(selectedRole === 'patient' ? 1 : 2);
        await tx.wait();
        setMessage('✅ Registration successful!');
      } else {
        setMessage('✅ Already registered.');
      }

      setWallet(wallet);
      setRole(selectedRole);
      navigate('/dashboard');

    } catch (err) {
      console.error('Login error:', err);
      setMessage('❌ Login failed. Check MetaMask or contract.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login or Register</h2>

      <label>Select Role:</label>
      <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <br /><br />
      <button onClick={handleConnect} disabled={loading}>
        {loading ? 'Connecting...' : 'Connect MetaMask'}
      </button>

      {message && (
        <p style={{ marginTop: '1rem', color: message.startsWith('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;
