import React, { useState } from 'react';

const CreateEvent = ({ handleClose }) => {
  const [eventData, setEventData] = useState({
    title: 'John Doe',
    description: 'Miki Beach Dubai',
    date: '20-02-2025',
    time: '08:30 PM - 10:30 PM',
    location: '458 Maple Avenue, Springfield, IL 62704',
    totalTickets: '',
    ticketTypes: [
      { name: 'Early Bird', tickets: '20', price: '290' },
      { name: 'VIP', tickets: '25', price: '350' },
      { name: 'General', tickets: '100', price: '300' }
    ]
  });

  const addTicketType = () => {
    setEventData(prev => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, { name: '', tickets: '', price: '' }]
    }));
  };

  const updateTicketType = (index, field, value) => {
    setEventData(prev => ({
      ...prev,
      ticketTypes: prev.ticketTypes.map((ticket, i) => 
        i === index ? { ...ticket, [field]: value } : ticket
      )
    }));
  };

  const removeTicketType = (index) => {
    setEventData(prev => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <div className="mb-6 flex justify-between">
            <div>
          <h1 className="text-2xl font-bold mb-1">New Event</h1>
          <p className="text-gray-500">Create a new event and share the details.</p>
            </div>
            <div className="flex justify-end mb-6   ">
          <button className="bg-black text-white px-4 py-2 rounded" onClick={handleClose}>Cancel</button>
        </div>
        </div>
        <div className='bg-white rounded-2xl shadow p-8'>
          <form className="space-y-8">
            {/* Event Details Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 font-semibold mb-2">Event Title</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm"
                      value={eventData.title}
                      onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 font-semibold mb-2">Description</label>
                    <textarea 
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm h-24 resize-none"
                      value={eventData.description}
                      onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 font-semibold mb-2">Event Date</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm pr-10"
                          value={eventData.date}
                          onChange={(e) => setEventData(prev => ({ ...prev, date: e.target.value }))}
                        />
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 font-semibold mb-2">Event Time</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm pr-10"
                          value={eventData.time}
                          onChange={(e) => setEventData(prev => ({ ...prev, time: e.target.value }))}
                        />
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 font-semibold mb-2">Event Location</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm"
                      value={eventData.location}
                      onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 font-semibold mb-2">Banner Upload</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-600">Upload or Drop banner here</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ticket Information Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Ticket Information</h2>
              
              <div className="mb-6">
                <label className="block text-sm text-gray-600 font-semibold mb-2">Total Number of Tickets</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm"
                  placeholder="Enter number of Tickets"
                  value={eventData.totalTickets}
                  onChange={(e) => setEventData(prev => ({ ...prev, totalTickets: e.target.value }))}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Ticket Types</h3>
                <div className="space-y-4">
                  {eventData.ticketTypes.map((ticket, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 items-center">
                      <div>
                        <label className="block text-sm text-gray-600 font-semibold mb-1">Name</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                          value={ticket.name}
                          onChange={(e) => updateTicketType(index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 font-semibold mb-1">Tickets</label>
                        <input 
                          type="number" 
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                          value={ticket.tickets}
                          onChange={(e) => updateTicketType(index, 'tickets', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 font-semibold mb-1">Price</label>
                        <input 
                          type="number" 
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                          value={ticket.price}
                          onChange={(e) => updateTicketType(index, 'price', e.target.value)}
                        />
                      </div>
                      <div>
                        {eventData.ticketTypes.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => removeTicketType(index)}
                            className="text-red-600 p-1 rounded-full bg-red-100 px-3"
                          >
                            X
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button"
                    onClick={addTicketType}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Another
                  </button>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button 
                type="button" 
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent; 