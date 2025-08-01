import React from 'react';
import { Link } from 'react-router-dom';
import emailVector from '../../assets/images/emailVector.svg';  

const CheckEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  font-sans">
      <div className="bg-white rounded-3xl shadow p-12 w-full max-w-lg flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
            <img src={emailVector} alt="" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">Check your email</h2>
        <p className="text-sm text-gray-600 mb-8 text-center">Check your email we sent you a link to change your password</p>
        <Link to="/auth/reset-password" className="w-full bg-black text-white rounded-lg py-2 mt-2 font-medium text-center">Reset</Link>
      </div>
    </div>
  );
};

export default CheckEmail; 