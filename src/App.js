import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPatient from './pages/LoginPatient';
import RegisterPatient from './pages/RegisterPatient';
import LoginDoctor from './pages/LoginDoctor';
import RegisterDoctor from './pages/RegisterDoctor';
import DashboardPatient from './pages/DashboardPatient';
import DashboardDoctor from './pages/DashboardDoctor';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/patient" element={<LoginPatient />} />
        <Route path="/register/patient" element={<RegisterPatient />} />
        <Route path="/login/doctor" element={<LoginDoctor />} />
        <Route path="/register/doctor" element={<RegisterDoctor />} />
        <Route path="/dashboard/patient" element={<DashboardPatient />} />
        <Route path="/dashboard/doctor" element={<DashboardDoctor />} />
      </Routes>
    </>
  );
}

export default App;
