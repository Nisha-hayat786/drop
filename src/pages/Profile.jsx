import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';

const profile = {
  name: 'Nguyen Van Khuong',
  org: 'Nikki Beach Dubai',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  header: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
  description: `Directors are responsible for overseeing the development of an organization's business goals and objectives. They typically work to increase business revenue, identify and develop business opportunities, and expand the company's presence and its brands.`,
  mobile: '(+84) 866 069 999',
  email: 'khuongnv@cpss.com',
  address: '999 Tran Hoang, Ninh kieu, Can Tho, Viet Nam',
};

function ImageModal({ open, src, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <img src={src} alt="Profile header" className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-lg" />
      <button onClick={onClose} className="absolute top-8 right-8 text-white text-3xl font-bold">&times;</button>
    </div>
  );
}

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <div className="relative">
        <img
          src={profile.header}
          alt="Header"
          className="w-full h-64 object-cover rounded-2xl cursor-pointer"
          onClick={() => setModalOpen(true)}
        />
        <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-100"><FiEdit2 className="text-xl text-gray-600" /></button>
        <div className="absolute left-20 -bottom-12 right-20 bg-white rounded-xl shadow flex items-center gap-4 px-8 py-4">
          <img src={profile.avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow" />
          <div>
            <div className="font-semibold text-[16px] mb-1">{profile.name}</div>
            <div className="text-gray-500 text-sm">{profile.org}</div>
          </div>
        </div>
      </div>
      <div className="h-16" />
      <div className="bg-white rounded-2xl shadow p-8 mt-4 mx-20">
        <div className="font-bold text-lg mb-2">Description</div>
        <div className="text-gray-600 mb-4">{profile.description}</div>
        {/* <hr className="my-4" /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-1/2 font-semibold mt-8 text-sm">
          <div>Full Name:</div>
          <div>{profile.name}</div>
          <div>Mobile:</div>
          <div>{profile.mobile}</div>
          <div>Email:</div>
          <div>{profile.email}</div>
          <div>Address:</div>
          <div>{profile.address}</div>
        </div>
      </div>
      <ImageModal open={modalOpen} src={profile.header} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Profile; 