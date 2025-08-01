import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center  font-sans">
      <div className="bg-white rounded-3xl shadow p-12 w-full max-w-lg flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <img src="/src/assets/images/logo1.svg" alt="DROP logo" className='w-44' />
        </div>
        <h2 className="text-2xl font-bold mb-8 text-center">Reset password</h2>
        <form className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">New password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="New password" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black pr-10" />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPassword(v => !v)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Confirm password</label>
            <div className="relative">
              <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm password" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black pr-10" />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowConfirm(v => !v)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </button>
            </div>
          </div>
          <Link to="/auth/reset-success" className="w-full bg-black text-white rounded-lg py-2 mt-2 font-medium text-center">Reset Password</Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 