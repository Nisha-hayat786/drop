import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    
    if (userRole === 'superadmin') {
      navigate('/superadmin');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default RoleRedirect; 