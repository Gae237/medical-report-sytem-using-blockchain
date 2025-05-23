import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { wallet, role } = useContext(AuthContext);

  return (
    <nav>
      <div className="logo">
        <Link to="/" style={{ fontWeight: 'bold' }}>MedChain</Link>
      </div>
      <div>
        <Link to="/upload">Upload</Link>
        <Link to="/doctor">Doctor</Link>
        <Link to="/access-control">Access</Link>
        <Link to="/login">Login</Link>
      </div>
      <div style={{ fontSize: '0.9rem', marginLeft: '2rem' }}>
        {wallet && <span>{role} | {wallet.slice(0, 6)}...{wallet.slice(-4)}</span>}
      </div>
    </nav>
  );
}

export default Navbar;
