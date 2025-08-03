import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/images/logo1.svg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, check email to determine role
      if (formData.email && formData.password) {
        if (formData.email.includes('admin') || formData.email.includes('super')) {
          // SuperAdmin role
          localStorage.setItem('userRole', 'superadmin');
          localStorage.setItem('userEmail', formData.email);
          navigate('/superadmin');
        } else {
          // Venue role (default)
          localStorage.setItem('userRole', 'venue');
          localStorage.setItem('userEmail', formData.email);
          navigate('/');
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      <div className="bg-white rounded-3xl shadow p-12 w-full max-w-lg flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <img src={logo1} alt="DROP logo" className='w-44' />
        </div>
        <h2 className="text-2xl font-bold mb-8">Log In</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="enter your email" 
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password" 
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black pr-10" 
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPassword(v => !v)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link to="/auth/forgot-password" className="text-xs text-black underline">Forgot password?</Link>
            </div>
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white rounded-lg py-2 mt-2 font-medium text-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Log In'}
          </button>
        </form>
        <p className='text-sm text-gray-500 mt-4'>Don't have an account? <Link to="/auth/signup" className='text-black underline'>Register</Link></p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Demo Credentials:</strong><br />
            • <strong>SuperAdmin:</strong> admin@drop.com / any password<br />
            • <strong>Venue:</strong> venue@drop.com / any password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;