import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white rounded-3xl shadow p-12 w-full max-w-lg flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <img src="/src/assets/images/logo1.svg" alt="" className='w-44'/>
        </div>
        <h2 className="text-2xl font-bold mb-8">Sign Up</h2>
        <button className="w-64 bg-gray-900 text-white rounded-xl py-2 mb-3 flex items-center justify-center gap-2 text-xs tracking-wide">
          Continue with Google <span className="text-lg"> <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.82 2.09 30.28 0 24 0 14.82 0 6.73 5.1 2.69 12.55l7.98 6.2C12.13 13.09 17.62 9.5 24 9.5z"></path><path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.74H24v9.04h12.4c-.54 2.9-2.18 5.36-4.64 7.04l7.18 5.59C43.91 37.09 46.1 31.27 46.1 24.5z"></path><path fill="#FBBC05" d="M10.67 28.75c-1.13-3.37-1.13-7.13 0-10.5l-7.98-6.2C.64 16.09 0 19.95 0 24s.64 7.91 2.69 12.55l7.98-6.2z"></path><path fill="#EA4335" d="M24 48c6.28 0 11.82-2.09 15.85-5.7l-7.18-5.59c-2.01 1.35-4.59 2.14-8.67 2.14-6.38 0-11.87-3.59-14.33-8.75l-7.98 6.2C6.73 42.9 14.82 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg></span>
        </button>
        <button className="w-64 bg-gray-900 text-white rounded-xl py-2 mb-6 flex items-center justify-center gap-2 text-xs tracking-wide">
          Continue with Apple <span className="text-lg"></span>
        </button>
        <Link to="/auth/signup" className="text-sm underline text-black mb-10">Sign up with email or log in here.</Link>
        <div className="text-xs text-center text-gray-700 mt-8">
          By continuing you agree to our terms and conditions.<br />
          This app uses cookies, the data is stored in the EU. &copy; Drop 2025
        </div>
      </div>
    </div>
  );
};

export default Auth;