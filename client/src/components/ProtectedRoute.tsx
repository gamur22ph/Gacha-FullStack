import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../helpers/TokenValidatorUtils';
import type { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children } : { children: ReactNode }) => {
  const {token, handleLogout} = useAuth();
  console.log("Protected Route");
  if (!token) {
    console.log("No token");
    handleLogout();
    return <Navigate to="/" replace />;
  }

  if (!isTokenValid(token)) {
    console.log("token invalid");
    handleLogout();
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;