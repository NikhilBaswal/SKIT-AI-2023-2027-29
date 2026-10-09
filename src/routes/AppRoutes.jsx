import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Complaints from '../pages/Complaints';
import Assets from '../pages/Assets';
import Maintenance from '../pages/Maintenance';
import Monitoring from '../pages/Monitoring';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
      <Route path="/assets" element={<ProtectedRoute allowedRoles={['ADMIN', 'OPERATOR']}><Assets /></ProtectedRoute>} />
      <Route path="/monitoring" element={<ProtectedRoute allowedRoles={['ADMIN', 'OPERATOR']}><Monitoring /></ProtectedRoute>} />
      <Route path="/maintenance" element={<ProtectedRoute allowedRoles={['ADMIN']}><Maintenance /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;