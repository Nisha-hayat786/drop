import React from 'react';
import { FaBell, FaRegBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  return (

    <header className=" fixed left-[240px] right-0 top-0 z-40">
      <div className="mx-7 border-b border-gray-300 w-full px-8 flex items-center justify-end py-4">

        <span className="mr-8 text-xl"><FaRegBell /></span>
        <span className="mr-3 text-sm">Nick McMillan</span>
        <span className="w-10 h-10 rounded-full bg-gray-200 inline-block overflow-hidden me-4 cursor-pointer" onClick={() => navigate("/profile")}>
          <img src="/src/assets/images/user.svg" alt="avatar" className="w-full h-full object-cover" />
        </span>
      </div>
    </header>
  )
};

export default Header; 