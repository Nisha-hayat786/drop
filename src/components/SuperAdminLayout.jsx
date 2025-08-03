import React from 'react';
import SuperAdminSidebar from './SuperAdminSidebar';
import Header from './Header';

const SuperAdminLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <SuperAdminSidebar />
    <div className="flex-1 ml-[240px] pt-16">
      <Header />
      <main className="p-4">{children}</main>
    </div>
  </div>
);

export default SuperAdminLayout; 