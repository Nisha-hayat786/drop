import React from 'react';
import { FaBell, FaRegBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/images/user.svg';

const Header = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/auth/login');
  };

  return (

    <header className=" fixed left-[240px] bg-[#ebedf0] right-5 top-0 z-40">
      <div className="mx-7 border-b border-gray-300 w-full px-8 flex items-center justify-end py-4">

        <span className="mr-8 text-xl"><FaRegBell /></span>
        <span className="mr-3 text-sm">Nick McMillan</span>
        <span className="w-10 h-10 rounded-full bg-gray-200 inline-block overflow-hidden me-4 cursor-pointer" onClick={() => userRole === 'venue' && navigate("/profile")}>
          <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
        </span>
        <button 
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-500 transition-colors"
          title="Logout"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  )
};

export default Header; 