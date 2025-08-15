import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/images/logo1.svg';
import api from '../../utils/axios';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    venueName: '',
    phone: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.venueName || !formData.email || !formData.password) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'All fields are required.',
        confirmButtonColor: '#EF4444'
      });
      return;
    }

    if (!formData.email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter a valid email address.',
        confirmButtonColor: '#EF4444'
      });
      return;
    }

    if (formData.password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Password must be at least 6 characters long.',
        confirmButtonColor: '#EF4444'
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare the data according to API specification
             const userData = {
         firstName: formData.firstName,
         lastName: formData.lastName,
         venueName: formData.venueName,
         venueImage: '', // Not provided in form
         email: formData.email,
         address: '', // Not provided in form
         phone: formData.phone || '', // From form
         countryCode: '', // Not provided in form
         dob: '', // Not provided in form
         image: '', // Not provided in form
         password: formData.password,
         role: 'user', // Default role for signup
         city: '', // Not provided in form
         state: '', // Not provided in form
         zipCode: '', // Not provided in form
         country: '', // Not provided in form
         description: '', // Not provided in form
         website: '' // Not provided in form
       };

      const response = await api.post('/auth/register', userData);

      if (response.data.status) {
        // Show success message
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Account created successfully! You can now login.',
          timer: 2000,
          showConfirmButton: false
        });

        // Navigate to login page
        navigate('/auth/login');
      } else {
        throw new Error(response.data.message || 'Failed to create account');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      
      let errorMessage = 'Failed to create account. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage,
        confirmButtonColor: '#EF4444'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      <div className="bg-white rounded-3xl shadow p-12 w-full max-w-lg flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <img src={logo1} alt="DROP logo" className='w-44' />
        </div>
        <h2 className="text-2xl font-bold mb-8">Sign Up</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1">First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter First Name" 
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" 
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter Last Name" 
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" 
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Venue Name</label>
            <input 
              type="text" 
              name="venueName"
              value={formData.venueName}
              onChange={handleInputChange}
              placeholder="Enter Venue Name" 
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter Phone Number" 
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Your Email" 
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password (min 6 characters)" 
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black pr-10" 
                required
                minLength={6}
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" 
                onClick={() => setShowPassword(v => !v)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white rounded-lg py-2 mt-2 font-semibold text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <div className="text-xs text-center text-gray-700 mt-8">
          By continuing you agree to our terms and conditions.<br />
          This app uses cookies, the data is stored in the EU. &copy; Drop 2025
        </div>
      </div>
    </div>
  );
};

export default SignUp;