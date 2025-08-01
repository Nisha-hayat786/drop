import React, { useState } from 'react';
import CreateEvent from './CreateEvent';

const Settings = () => {
  const [tab, setTab] = useState('Profile');
  const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const [workingHours, setWorkingHours] = useState([
    { day: 'Monday', enabled: true, start: '8:30 AM', end: '8:30 PM' },
    { day: 'Tuesday', enabled: true, start: '8:30 AM', end: '8:30 PM' },
    { day: 'Wednesday', enabled: true, start: '8:30 AM', end: '8:30 PM' },
    { day: 'Thursday', enabled: true, start: '8:30 AM', end: '8:30 PM' },
    { day: 'Friday', enabled: true, start: '8:30 AM', end: '8:30 PM' },
    { day: 'Saturday', enabled: true, start: '8:30 AM', end: '8:30 PM' },
    { day: 'Sunday', enabled: false, start: '8:30 AM', end: '8:30 PM' },
  ]);
  const [password, setPassword] = useState({ new: '', confirm: '' });
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [createEvent, setCreateEvent] = useState(false);

  const handleCreateEvent = () => {
    setCreateEvent(true);
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <div className="text-gray-500 mb-6">Manage your settings.</div>
        <div className="flex gap-2 mb-6">
          {['Profile', 'Working Hours', 'Password', 'Events'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded ${tab === t ? 'bg-black text-white' : 'bg-[#dadada] text-black'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className='flex justify-center w-full'>
          <div className="w-full mx-40 bg-white rounded-2xl shadow p-8 min-h-[400px]">
            {tab === 'Profile' && (
              <form className="w-full max-w-lg mx-auto flex flex-col items-center gap-4">
                <div className="flex flex-col items-center mb-4">
                  <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover mb-2" />
                  <div className="flex gap-2">
                    <button type="button" className="bg-black text-white px-4 py-1 rounded">Upload</button>
                    <button type="button" className="bg-red-600 text-white px-4 py-1 rounded">Remove</button>
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-1">Full Name</label>
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" defaultValue="John Doe" />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-1">Venue Name</label>
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" defaultValue="Nikki Beach Dubai" />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-1">Email Address</label>
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" defaultValue="example@gmail.com" />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-1">Phone Number</label>
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" defaultValue="+1 234 567 890" />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-1">Address Line 1</label>
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" defaultValue="Address" />
                </div>
                <div className="w-full flex gap-2">
                  <input className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" placeholder="City" />
                  <input className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" placeholder="State" />
                </div>
                <div className="w-full flex gap-2">
                  <input className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" placeholder="Zip code" />
                  <input className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" placeholder="Country" />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-1">Description</label>
                  <textarea className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" placeholder="Description here..." />
                </div>
                <button type="submit" className="bg-black text-white px-8 py-2 rounded mt-4">Update</button>
              </form>
            )}
            {tab === 'Working Hours' && (
              <form className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
                {workingHours.map((day, i) => (
                  <div key={day.day} className="flex items-center w-full gap-4 mb-2">
                    <label className="flex items-center gap-2 font-semibold min-w-[120px]">
                      <input type="checkbox" checked={day.enabled} onChange={() => {
                        setWorkingHours(wh => wh.map((d, idx) => idx === i ? { ...d, enabled: !d.enabled } : d));
                      }} className="accent-black w-5 h-5" />
                      {day.day}
                    </label>
                    <input type="time" value={day.start} onChange={() => { }} className="border border-gray-200 rounded-lg px-3 py-1 text-sm w-32" />
                    <span className="mx-2">-</span>
                    <input type="time" value={day.end} onChange={() => { }} className="border border-gray-200 rounded-lg px-3 py-1 text-sm w-32" />
                  </div>
                ))}
                <button type="submit" className="bg-black text-white px-8 py-2 rounded mt-4">Update</button>
              </form>
            )}
            {tab === 'Password' && (
              <form className="w-full max-w-md mx-auto flex flex-col justify-center h-full items-center gap-4">
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-1">New password</label>
                  <div className="relative">
                    <input type={showNew ? 'text' : 'password'} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" value={password.new} onChange={e => setPassword(p => ({ ...p, new: e.target.value }))} />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowNew(v => !v)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-1">Confirm password</label>
                  <div className="relative">
                    <input type={showConfirm ? 'text' : 'password'} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" value={password.confirm} onChange={e => setPassword(p => ({ ...p, confirm: e.target.value }))} />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowConfirm(v => !v)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button type="submit" className="bg-black text-white px-8 py-2 rounded mt-4">Update Password</button>
              </form>
            )}
            {tab === 'Events' && (
              createEvent ? (
                <CreateEvent handleClose={() => setCreateEvent(false)}/>
              ) : (
              <div className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Event Management</h2>
                  <button 
                    onClick={handleCreateEvent}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Create New Event
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Sample Event Cards */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
                    <h3 className="font-semibold mb-1">Summer Music Festival</h3>
                    <p className="text-sm text-gray-600 mb-2">July 15, 2024 • 6:00 PM</p>
                    <p className="text-sm text-gray-500 mb-3">A fantastic evening of live music and entertainment</p>
                    <div className="flex gap-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Edit</button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
                    <h3 className="font-semibold mb-1">Corporate Conference</h3>
                    <p className="text-sm text-gray-600 mb-2">August 20, 2024 • 9:00 AM</p>
                    <p className="text-sm text-gray-500 mb-3">Annual business conference with industry leaders</p>
                    <div className="flex gap-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Edit</button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
                    <h3 className="font-semibold mb-1">Art Exhibition</h3>
                    <p className="text-sm text-gray-600 mb-2">September 10, 2024 • 2:00 PM</p>
                    <p className="text-sm text-gray-500 mb-3">Contemporary art showcase featuring local artists</p>
                    <div className="flex gap-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Edit</button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 