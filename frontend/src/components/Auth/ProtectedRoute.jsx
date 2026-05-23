import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const location = useLocation();

  // No session at all → redirect to login
  if (!token || !userString) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const user = JSON.parse(userString);

    // Role restriction check
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Send them to their own dashboard, not a dead end
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  } catch (error) {
    // Corrupted localStorage — clean up and send to login
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
