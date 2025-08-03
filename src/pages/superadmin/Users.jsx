import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaEye, FaBan, FaCheck, FaDownload, FaCalendarAlt, FaTimes, FaUpload, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@gmail.com',
        phone: '+535646514351124351',
        profileImage: null
    });

    // Mock data for users
    const users = [
        {
            id: 1,
            name: 'Michael Johnson',
            email: 'michael.j@example.com',
            joiningDate: '2023-01-10',
            status: 'active',
            avatar: 'MJ'
        },
        {
            id: 2,
            name: 'Sophia Brown',
            email: 'sophia.b@example.com',
            joiningDate: '2023-02-15',
            status: 'active',
            avatar: 'SB'
        },
        {
            id: 3,
            name: 'James Smith',
            email: 'james.s@example.com',
            joiningDate: '2023-03-20',
            status: 'inactive',
            avatar: 'JS'
        },
        {
            id: 4,
            name: 'Emily Davis',
            email: 'emily.d@example.com',
            joiningDate: '2023-04-05',
            status: 'pending',
            avatar: 'ED'
        },
        {
            id: 5,
            name: 'David Wilson',
            email: 'david.w@example.com',
            joiningDate: '2023-05-12',
            status: 'active',
            avatar: 'DW'
        },
        {
            id: 6,
            name: 'Sarah Miller',
            email: 'sarah.m@example.com',
            joiningDate: '2023-06-08',
            status: 'inactive',
            avatar: 'SM'
        }
    ];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status) => {
        const statusClasses = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-red-100 text-red-800',
            pending: 'bg-blue-100 text-blue-800'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(filteredUsers.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleInputChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    const handleAddUser = () => {
        // Add user logic here
        console.log('Adding user:', newUser);
        setShowAddModal(false);
        setNewUser({
            firstName: 'John',
            lastName: 'Doe',
            email: 'example@gmail.com',
            phone: '+535646514351124351',
            profileImage: null
        });
    };

    const handleCancel = () => {
        setShowAddModal(false);
        setNewUser({
            firstName: 'John',
            lastName: 'Doe',
            email: 'example@gmail.com',
            phone: '+535646514351124351',
            profileImage: null
        });
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage App Users</h1>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                    <FaPlus />
                    Add New User
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

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
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
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => handleSelectUser(user.id)}
                                            className="rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => navigate(`/superadmin/user/${user.id}`)}>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">{user.avatar}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">Id#{user.id.toString().padStart(5, '0')}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {user.joiningDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(user.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <button className="text-blue-600 hover:text-blue-900" title="View">
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
                    <span className="text-sm text-gray-700">of {filteredUsers.length} rows</span>
                </div>
                <div className="flex gap-2">
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
                </div>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                        {/* Modal Header */}
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold">Add New User</h2>
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
                                {/* Form Fields */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={newUser.firstName}
                                            onChange={handleInputChange}
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
                                            value={newUser.lastName}
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
                                            value={newUser.email}
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
                                            value={newUser.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Profile Picture */}
                            <div className="ml-6 flex flex-col items-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-red-500 rounded-full flex items-center justify-center mb-4">
                                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center">
                                        <span className="text-white text-2xl font-bold">
                                            {newUser.firstName.charAt(0)}{newUser.lastName.charAt(0)}
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
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddUser}
                                className="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users; 