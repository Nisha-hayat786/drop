import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { FaUsers, FaBuilding, FaFileAlt } from 'react-icons/fa';

const navItems = [
  { to: '/superadmin', label: 'Dashboard', icon: <GoHome /> },
  { to: '/superadmin/users', label: 'Manage App Users', icon: <FaUsers /> },
  { to: '/superadmin/venues', label: 'Manage Venues', icon: <FaBuilding /> },
  { to: '/superadmin/posts', label: 'Manage Posts', icon: <FaFileAlt /> },
];

const SuperAdminSidebar = () => {
  const location = useLocation();

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
      </div>
    </div>
  );
};

export default SuperAdminSidebar; 