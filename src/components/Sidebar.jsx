import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuSettings } from "react-icons/lu";
import { GoHome } from 'react-icons/go';
import { BiNews } from 'react-icons/bi';
import { MdSubscriptions } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

const navItems = [
  { to: '/', label: 'Dashboard', icon: <GoHome /> },
  { to: '/posts', label: 'Posts', icon: <BiNews /> },
  { to: '/subscriptions', label: 'Subscriptions', icon: <MdSubscriptions /> },
  { to: '/settings', label: 'Settings', icon: <LuSettings /> },
];

const Sidebar = () => {
  const location = useLocation();
  const handleAddPost = () => {
    // Dispatch a custom event to open the modal in Posts page
    window.dispatchEvent(new CustomEvent('openAddPostModal'));
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
                  className={`flex items-center px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${location.pathname === item.to ? 'bg-white text-black' : 'hover:text-black hover:bg-white'}`}
                >
                  <span className="mr-3 text-base">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex-1" />
      </div>
    </div>
  );
};

export default Sidebar; 