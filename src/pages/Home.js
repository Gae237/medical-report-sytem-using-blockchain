import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-card fade-in-up">
        <h1 className="title">Welcome to MedBlock</h1>

        <p className="subtitle">
          Your digital health records — secured with blockchain technology.
        </p>

        <p className="subtitle fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
          Patients and doctors can access and manage reports anytime, anywhere, with full privacy and trust.
        </p>

        <div className="buttons fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
          <Link to="/login/patient" className="patient-btn">
            I'm a Patient
          </Link>
          <Link to="/login/doctor" className="doctor-btn">
            I'm a Doctor
          </Link>
        </div>

        <div className="features fade-in-up" style={{ animationDelay: '1.2s', animationFillMode: 'backwards' }}>
  <h2 className="features-title">Why MedBlock?</h2>
  <div className="features-grid">
    <div className="feature">
     <h3>
  <span role="img" aria-label="lock">🔐</span> Privacy & Security
</h3>

      <p>Your medical data is encrypted and stored on decentralized infrastructure.</p>
    </div>
    <div className="feature">
     <h3>
  <span role="img" aria-label="document">📄</span> Report Access
</h3>

      <p>Access your reports anytime, anywhere — all in one place.</p>
    </div>
    <div className="feature">
     <h3>
  <span role="img" aria-label="blockchain">⛓️</span> Powered by Blockchain
</h3>

      <p>No more data loss or tampering — full transparency and control.</p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}
