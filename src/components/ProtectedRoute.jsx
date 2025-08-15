import React, { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated, selectRole, selectIsLoading } from '../store/slices/authSlice';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/auth/login',
  requireAuth = true 
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle root path redirection
  useEffect(() => {
    if (location.pathname === '/' && isAuthenticated && role && !isLoading) {
      if (role === 'admin') {
        navigate('/superadmin', { replace: true });
      } else if (role === 'venue') {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [location.pathname, isAuthenticated, role, isLoading, navigate]);

  // Memoize the redirect logic to prevent unnecessary re-renders
  const redirectElement = useMemo(() => {
    // If authentication is not required, render children
    if (!requireAuth) {
      return children;
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // If roles are specified, check if user has access
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      // Redirect based on user role
      if (role === 'admin') {
        return <Navigate to="/superadmin" replace />;
      } else if (role === 'venue') {
        return <Navigate to="/dashboard" replace />;
      } else {
        return <Navigate to="/dashboard" replace />;
      }
    }

    return children;
  }, [isAuthenticated, role, allowedRoles, requireAuth, redirectTo, location, children]);

  // Show loading spinner while checking auth status
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return redirectElement;
};

export default ProtectedRoute;
