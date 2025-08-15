import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { GoHome } from 'react-icons/go';
import { FaUsers, FaBuilding, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
  { to: '/superadmin', label: 'Dashboard', icon: <GoHome /> },
  { to: '/superadmin/users', label: 'Manage App Users', icon: <FaUsers /> },
  { to: '/superadmin/venues', label: 'Manage Venues', icon: <FaBuilding /> },
  { to: '/superadmin/posts', label: 'Manage Posts', icon: <FaFileAlt /> },
];

const SuperAdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="w-[240px] text-white fixed bottom-3 left-3 top-3 z-50">
      <div className='bg-black py-8 px-4 flex flex-col items-center rounded-xl h-full'>
        <img src="/src/assets/images/logo.svg" alt="" className='w-28 mb-10' />

        {/* Navigation */}
        <nav className="w-full">
          <ul className="list-none p-0 w-full">
            {navItems.map((item) => (
              <li key={item.to} className="mb-2 last:mb-0">
                <Link
                  to={item.to}
                  className={`flex items-center px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    location.pathname === item.to 
                      ? 'bg-white text-black' 
                      : 'text-white hover:text-black hover:bg-white'
                  }`}
                >
                  <span className="mr-3 text-base">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex-1" />
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-2 rounded-lg text-sm font-medium text-white hover:text-black hover:bg-white transition-colors duration-150"
        >
          <span className="mr-3 text-base"><FaSignOutAlt /></span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SuperAdminSidebar; 