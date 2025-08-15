import React from 'react';
import { FaBell, FaRegBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUser, selectRole } from '../store/slices/authSlice';
import avatar from '../assets/images/user.svg';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const role = useSelector(selectRole);



  const handleProfileClick = () => {
    if (role === 'venue') {
      navigate('/profile');
    } else if (role === 'admin') {
      navigate('/superadmin');
    }
  };

  // Get display name from user data
  const getDisplayName = () => {
    if (!user) return 'User';
    
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user.firstName) {
      return user.firstName;
    } else if (user.lastName) {
      return user.lastName;
    } else if (user.venueName) {
      return user.venueName;
    } else if (user.email) {
      return user.email.split('@')[0]; // Show email username part
    }
    
    return 'User';
  };

  return (
    <header className="fixed left-[240px] bg-[#ebedf0] right-5 top-0 z-40">
      <div className="mx-7 border-b border-gray-300 w-full px-8 flex items-center justify-end py-4">
        <span className="mr-8 text-xl"><FaRegBell /></span>
        <span className="mr-3 text-sm">
          {getDisplayName()}
        </span>
        <span 
          className="w-10 h-10 rounded-full bg-gray-200 inline-block overflow-hidden me-4 cursor-pointer" 
          onClick={handleProfileClick}
        >
          {/* <img src={avatar} alt="avatar" className="w-full h-full object-cover" /> */}
          <div className="w-full h-full bg-black flex items-center justify-center">
            <span className="text-white">
              {getDisplayName().charAt(0).toUpperCase()}
            </span>
          </div>
        </span>
        {/* <button 
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-500 transition-colors"
          title="Logout"
        >
          <FaSignOutAlt />
        </button> */}
      </div>
    </header>
  );
};

export default Header; 