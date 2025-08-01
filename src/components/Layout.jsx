import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => (
  <div className="flex min-h-screen ">
    <Sidebar />
    <div className="flex-1 ml-[240px] pt-16">
      <Header />
      <main className="p-4">{children}</main>
    </div>
  </div>
);

export default Layout; 