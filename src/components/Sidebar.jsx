import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuSettings } from "react-icons/lu";
import { GoHome } from 'react-icons/go';
import { BiNews } from 'react-icons/bi';
import { MdSubscriptions } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <GoHome /> },
  { to: '/posts', label: 'Posts', icon: <BiNews /> },
  { to: '/subscriptions', label: 'Subscriptions', icon: <MdSubscriptions /> },
  { to: '/settings', label: 'Settings', icon: <LuSettings /> },
];

const Sidebar = () => {
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

        <img src="/src/assets/images/logo.svg" alt="" className='w-28' />
        <button className="w-full py-2 rounded-lg bg-[#838383] text-white border-none mb-8 mt-10 text-base cursor-pointer flex items-center justify-center gap-2"><IoMdAdd /> Add New Post</button>
        <nav className="w-full">
          <ul className="list-none p-0 w-full">
            {navItems.map((item) => (
              <li key={item.to} className="mb-2 last:mb-0">
                <Link
                  to={item.to}
                  className={`flex items-center px-6 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${location.pathname === item.to ? 'bg-white text-black' : 'hover:text-black hover:bg-white'}`}
                >
                  <span className="mr-3 text-base">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex-1" >

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="fixed bottom-10 left-7 w-fit flex items-center px-6 py-2 rounded-lg text-sm font-semibold text-white hover:text-black hover:bg-white transition-colors duration-150"
          >
            <span className="mr-3 text-base"><FaSignOutAlt /></span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 