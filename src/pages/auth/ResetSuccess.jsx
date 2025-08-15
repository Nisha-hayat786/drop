import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../../assets/images/logo1.svg';

const ResetSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  font-sans">
      <div className="bg-white rounded-3xl shadow p-12 w-full max-w-lg flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <img src={logo1} alt="DROP logo" className='w-44'/>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">Password reset successful!</h2>
        <p className="text-sm text-gray-600 mb-8 text-center">Kindly log in to your account with your new password</p>
        <Link to="/auth/login" className="w-full bg-black text-white rounded-lg py-2 mt-2 font-semibold text-center">Log In</Link>
      </div>
    </div>
  );
};

export default ResetSuccess; 