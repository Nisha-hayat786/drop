import React from 'react';

const LoadingSpinner = ({ size = 'h-32 w-32', color = 'border-blue-600' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={`animate-spin rounded-full border-b-2 ${color} ${size}`}></div>
    </div>
  );
};

export default LoadingSpinner;
