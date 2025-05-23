import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import UploadReport from './pages/UploadReport';
import DoctorDashboard from './pages/DoctorDashboard';
import AccessControl from './pages/AccessControl';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/upload"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <UploadReport />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/access-control"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <AccessControl />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['patient', 'doctor']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
