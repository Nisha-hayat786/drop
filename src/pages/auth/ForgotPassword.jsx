import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../../assets/images/logo1.svg';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  font-sans">
      <div className="bg-white rounded-3xl shadow p-12 w-full max-w-lg flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <img src={logo1} alt="DROP logo" className='w-44' />
        </div>
        <h2 className="text-2xl font-bold mb-2">Forgot password?</h2>
        <p className="text-sm text-gray-600 mb-8 text-center">Kindly enter email address to reset your password</p>
        <form className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Email</label>
            <input type="email" placeholder="enter your email" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <Link to="/auth/check-email" className="w-full bg-black text-white rounded-lg py-2 mt-2 font-semibold text-center">Submit</Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 