import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaEye, FaDownload, FaCalendarAlt, FaTimes, FaUpload, FaPlus, FaCheck, FaBan } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Venues = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedVenues, setSelectedVenues] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const navigate = useNavigate();
    const [newVenue, setNewVenue] = useState({
        firstName: 'John',
        lastName: 'Doe',
        venueName: 'Nikki Beach Dubai',
        email: 'example@gmail.com',
        phone: '+535646514351124351',
        addressLine1: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        description: ''
    });

    // Mock data for venues
    const venues = [
        {
            id: 1,
            ownerName: 'Sarah Thompson',
            venueName: 'Oceanview Resort',
            email: 'sarah.t@example.com',
            address: '456 Ocean Drive, Miami, FL 33139',
            joiningDate: '2023-02-15',
            status: 'active',
            avatar: 'ST'
        },
        {
            id: 2,
            ownerName: 'James Smith',
            venueName: 'City Park Hotel',
            email: 'james.s@example.com',
            address: '789 Park Avenue, New York, NY 10001',
            joiningDate: '2023-03-20',
            status: 'active',
            avatar: 'JS'
        },
        {
            id: 3,
            ownerName: 'Robert Martinez',
            venueName: 'Forest Retreat',
            email: 'robert.m@example.com',
            address: '123 Forest Lane, Seattle, WA 98101',
            joiningDate: '2023-04-10',
            status: 'inactive',
            avatar: 'RM'
        },
        {
            id: 4,
            ownerName: 'William Harris',
            venueName: 'Riverbank Tavern',
            email: 'william.h@example.com',
            address: '321 River Road, Portland, OR 97201',
            joiningDate: '2023-05-05',
            status: 'pending',
            avatar: 'WH'
        },
        {
            id: 5,
            ownerName: 'David Brown',
            venueName: 'Sunset Cafe',
            email: 'david.b@example.com',
            address: '654 Sunset Blvd, Los Angeles, CA 90028',
            joiningDate: '2023-06-12',
            status: 'active',
            avatar: 'DB'
        },
        {
            id: 6,
            ownerName: 'Daniel Anderson',
            venueName: 'Beachside Retreat',
            email: 'daniel.a@example.com',
            address: '987 Beach Way, San Diego, CA 92101',
            joiningDate: '2023-07-08',
            status: 'active',
            avatar: 'DA'
        },
        {
            id: 7,
            ownerName: 'Linda Garcia',
            venueName: 'Mountain View Lodge',
            email: 'linda.g@example.com',
            address: '147 Mountain Pass, Denver, CO 80201',
            joiningDate: '2023-08-15',
            status: 'inactive',
            avatar: 'LG'
        },
        {
            id: 8,
            ownerName: 'Ava Jackson',
            venueName: 'Valley View Inn',
            email: 'ava.j@example.com',
            address: '258 Valley Road, Phoenix, AZ 85001',
            joiningDate: '2023-09-20',
            status: 'pending',
            avatar: 'AJ'
        },
        {
            id: 9,
            ownerName: 'Emily Davis',
            venueName: 'Lakeside Inn',
            email: 'emily.d@example.com',
            address: '369 Lake Street, Chicago, IL 60601',
            joiningDate: '2023-10-25',
            status: 'active',
            avatar: 'ED'
        },
        {
            id: 10,
            ownerName: 'Olivia Wilson',
            venueName: 'Skyline Grille',
            email: 'olivia.w@example.com',
            address: '741 Skyline Drive, San Francisco, CA 94101',
            joiningDate: '2023-11-30',
            status: 'active',
            avatar: 'OW'
        },
        {
            id: 11,
            ownerName: 'Sophia Lee',
            venueName: 'Downtown Bistro',
            email: 'sophia.l@example.com',
            address: '852 Downtown Ave, Austin, TX 73301',
            joiningDate: '2023-12-05',
            status: 'pending',
            avatar: 'SL'
        }
    ];

    const filteredVenues = venues.filter(venue => {
        const matchesSearch = venue.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            venue.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            venue.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || venue.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status) => {
        const statusClasses = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-red-100 text-red-800',
            pending: 'bg-orange-100 text-orange-800'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedVenues(filteredVenues.map(venue => venue.id));
        } else {
            setSelectedVenues([]);
        }
    };

    const handleSelectVenue = (venueId) => {
        if (selectedVenues.includes(venueId)) {
            setSelectedVenues(selectedVenues.filter(id => id !== venueId));
        } else {
            setSelectedVenues([...selectedVenues, venueId]);
        }
    };

    const handleInputChange = (e) => {
        setNewVenue({
            ...newVenue,
            [e.target.name]: e.target.value
        });
    };

    const handleAddVenue = () => {
        console.log('Adding venue:', newVenue);
        setShowAddModal(false);
        setNewVenue({
            firstName: 'John',
            lastName: 'Doe',
            venueName: 'Nikki Beach Dubai',
            email: 'example@gmail.com',
            phone: '+535646514351124351',
            addressLine1: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            description: ''
        });
    };

    const handleCancel = () => {
        setShowAddModal(false);
        setNewVenue({
            firstName: 'John',
            lastName: 'Doe',
            venueName: 'Nikki Beach Dubai',
            email: 'example@gmail.com',
            phone: '+535646514351124351',
            addressLine1: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            description: ''
        });
    };

    const handleViewRequest = (venue) => {
        setShowRequestModal(true);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Venues</h1>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                    <FaPlus />
                    Add New Venue
                </button>
            </div>

            {/* Search and Filters */}
            <div>
                <div className="flex gap-4 items-center">
                    <div className="flex-1">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#dadada] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    >
                        <option value="all">Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Custom"
                            className="px-4 py-2 placeholder:text-black border border-gray-300 rounded-lg focus:outline-none pr-10"
                        />
                        <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <FaDownload />
                        Export
                    </button>
                </div>
            </div>

            {/* Venues Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedVenues.length === filteredVenues.length && filteredVenues.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Joining Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredVenues.map((venue) => (
                                <tr key={venue.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedVenues.includes(venue.id)}
                                            onChange={() => handleSelectVenue(venue.id)}
                                            className="rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => navigate(`/superadmin/venue/${venue.id}`)}   >
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">{venue.avatar}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{venue.ownerName}</div>
                                                <div className="text-sm text-gray-500">{venue.venueName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {venue.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {venue.address}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {venue.joiningDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(venue.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleViewRequest(venue)}
                                                className="text-blue-600 hover:text-blue-900" 
                                                title="View"
                                            >
                                                <FaEye />
                                            </button>
                                            <button className="text-green-600 hover:text-green-900" title="Edit">
                                                <FaEdit />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900" title="Delete">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700">Rows per page</span>
                    <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    <span className="text-sm text-gray-700">of 140 rows</span>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        ‹‹
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        ‹
                    </button>
                    <button className="px-3 py-1 bg-black text-white rounded text-sm">1</button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
                    <span className="px-3 py-1 text-sm text-gray-500">...</span>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">10</button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        ›
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        ››
                    </button>
                </div>
            </div>

            {/* Add Venue Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold">Add New Venue</h2>
                            <button 
                                onClick={handleCancel}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Profile Picture Section */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1">
                                {/* Personal Information */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={newVenue.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter First Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={newVenue.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter Last Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Venue Details */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Venue Name
                                        </label>
                                        <input
                                            type="text"
                                            name="venueName"
                                            value={newVenue.venueName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={newVenue.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={newVenue.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Address Information */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address Line 1
                                        </label>
                                        <input
                                            type="text"
                                            name="addressLine1"
                                            value={newVenue.addressLine1}
                                            onChange={handleInputChange}
                                            placeholder="Address"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City
                                            </label>
                                            <select
                                                name="city"
                                                value={newVenue.city}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">City</option>
                                                <option value="Dubai">Dubai</option>
                                                <option value="Abu Dhabi">Abu Dhabi</option>
                                                <option value="Sharjah">Sharjah</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                State
                                            </label>
                                            <select
                                                name="state"
                                                value={newVenue.state}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">State</option>
                                                <option value="Dubai">Dubai</option>
                                                <option value="Abu Dhabi">Abu Dhabi</option>
                                                <option value="Sharjah">Sharjah</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Zip code
                                            </label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={newVenue.zipCode}
                                                onChange={handleInputChange}
                                                placeholder="Zip code"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Country
                                            </label>
                                            <select
                                                name="country"
                                                value={newVenue.country}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Country</option>
                                                <option value="UAE">UAE</option>
                                                <option value="USA">USA</option>
                                                <option value="UK">UK</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={newVenue.description}
                                        onChange={handleInputChange}
                                        placeholder="Description here..."
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Profile Picture */}
                            <div className="ml-6 flex flex-col items-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-red-500 rounded-full flex items-center justify-center mb-4">
                                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center">
                                        <span className="text-white text-2xl font-bold">
                                            {newVenue.firstName.charAt(0)}{newVenue.lastName.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <button className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                        <FaUpload />
                                        Upload
                                    </button>
                                    <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                onClick={handleCancel}
                                className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddVenue}
                                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Request Detail Modal */}
            {showRequestModal && (
                <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                        {/* Modal Header */}
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold">Request Detail</h2>
                            <button 
                                onClick={() => setShowRequestModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Requester Info */}
                        <div className="flex items-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-red-500 rounded-full flex items-center justify-center mr-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                                    <span className="text-white text-lg font-bold">ST</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-xl font-bold">Sarah Thompson</div>
                                <div className="text-sm text-gray-500">ID#1435353</div>
                            </div>
                        </div>

                        {/* Request Details */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <span className="font-medium">Venue:</span> Nikki Beach Dubai
                            </div>
                            <div>
                                <span className="font-medium">Email Address:</span> example@gmail.com
                            </div>
                            <div>
                                <span className="font-medium">Phone Number:</span> +535646514351124351
                            </div>
                            <div>
                                <span className="font-medium">Address:</span> 123 Maple Street, Springfield, IL 62704
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowRequestModal(false)}
                                className="flex-1 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                                Reject
                            </button>
                            <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Venues; 