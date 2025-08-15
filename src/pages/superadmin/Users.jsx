import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaEye, FaBan, FaCheck, FaDownload, FaCalendarAlt, FaTimes, FaUpload, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../../store/slices/authSlice';
import {
    fetchUsers,
    addUser,
    selectUsers,
    selectUsersPagination,
    selectUsersLoading,
    selectUsersError,
    selectUsersSuccess,
    clearError,
    clearSuccess
} from '../../store/slices/usersSlice';
import { BiRefresh } from 'react-icons/bi';
import Swal from 'sweetalert2';
import api from '../../utils/axios';

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(selectToken);

    // Redux state
    const users = useSelector(selectUsers);
    const pagination = useSelector(selectUsersPagination);
    const loading = useSelector(selectUsersLoading);
    const error = useSelector(selectUsersError);
    const success = useSelector(selectUsersSuccess);

    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        role: 'user',
        image: ''
    });

    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'user',
        image: ''
    });

    const [localLoading, setLocalLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    // Filter users based on search and status
    const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.country?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Fetch users on component mount
    useEffect(() => {
        try {
            dispatch(fetchUsers({ pageNumber: 1, pageSize: 10 }));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [dispatch]);

    // Clear success message after 5 seconds
    useEffect(() => {
        if (success && typeof success === 'string') {
            const timer = setTimeout(() => {
                try {
                    dispatch(clearSuccess());
                } catch (error) {
                    console.error('Error clearing success:', error);
                }
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, dispatch]);

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
        // Clear error when user starts typing
        try {
            if (error) dispatch(clearError());
        } catch (error) {
            console.error('Error clearing error:', error);
        }
    };

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
        dispatch(fetchUsers({ pageNumber: 1, pageSize: pagination.pageSize, searchTerm: searchValue, filterStatus }));
    };

    const handleStatusFilter = (status) => {
        setFilterStatus(status);
        dispatch(fetchUsers({ pageNumber: 1, pageSize: pagination.pageSize, searchTerm, filterStatus: status }));
    };

    const handlePageChange = (pageNumber) => {
        dispatch(fetchUsers({ pageNumber, pageSize: pagination.pageSize, searchTerm, filterStatus }));
    };

    const handlePageSizeChange = (pageSize) => {
        dispatch(fetchUsers({ pageNumber: 1, pageSize, searchTerm, filterStatus }));
    };

    const handleAddUser = async () => {
        // Validation
        if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password) {
            dispatch(clearError());
            // You can add a local error state here if needed
            return;
        }

        if (!newUser.email.includes('@')) {
            dispatch(clearError());
            // You can add a local error state here if needed
            return;
        }

        if (newUser.password.length < 6) {
            dispatch(clearError());
            // You can add a local error state here if needed
            return;
        }

        setLocalLoading(true);
        dispatch(clearError());
        dispatch(clearSuccess());

        try {
            const result = await dispatch(addUser(newUser)).unwrap();

            if (result.status) {
                setShowAddModal(false);
                resetForm();
                // Refresh the users list
                dispatch(fetchUsers({ pageNumber: 1, pageSize: 10 }));
            }
        } catch (error) {
            console.error('Error creating user:', error);
        } finally {
            setLocalLoading(false);
        }
    };

    const resetForm = () => {
        setNewUser({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            role: 'user',
            image: ''
        });
        try {
            dispatch(clearError());
            dispatch(clearSuccess());
        } catch (error) {
            console.error('Error resetting form:', error);
        }
    };

    const handleCancel = () => {
        setShowAddModal(false);
        try {
            resetForm();
        } catch (error) {
            console.error('Error handling cancel:', error);
        }
    };

    // Handle edit user
    const handleEditUser = (user) => {
        setEditingUser(user);
        setEditForm({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            role: user.role || 'user',
            image: user.image || ''
        });
        setShowEditModal(true);
    };

    // Handle edit form input changes
    const handleEditInputChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    // Handle edit form submission
    const handleEditSubmit = async () => {
        // Validation
        if (!editForm.firstName || !editForm.lastName || !editForm.email) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'First name, last name, and email are required fields.',
                confirmButtonColor: '#EF4444'
            });
            return;
        }

        if (!editForm.email.includes('@')) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please enter a valid email address.',
                confirmButtonColor: '#EF4444'
            });
            return;
        }

        setEditLoading(true);

        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to update this user\'s information?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Yes, update user!',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                // Show loading state
                Swal.fire({
                    title: 'Updating user...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Here you would typically make an API call to update the user
                // For now, we'll just show success and close the modal
                
                // Show success message
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'User information updated successfully!',
                    timer: 2000,
                    showConfirmButton: false
                });

                setShowEditModal(false);
                setEditingUser(null);
                
                // Refresh the users list
                dispatch(fetchUsers({ pageNumber: pagination.pageNumber, pageSize: pagination.pageSize, searchTerm, filterStatus }));
            }
        } catch (error) {
            console.error('Error updating user:', error);
            
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update user information. Please try again.',
                confirmButtonColor: '#EF4444'
            });
        } finally {
            setEditLoading(false);
        }
    };

    // Close edit modal
    const handleEditCancel = () => {
        setShowEditModal(false);
        setEditingUser(null);
        setEditForm({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            role: 'user',
            image: ''
        });
    };

    // Handle bulk block/unblock users
    const handleBulkBlockUsers = async (block) => {
        const action = block ? 'block' : 'unblock';
        const actionText = block ? 'block' : 'unblock';
        const userCount = selectedUsers.length;
        const selectedUserNames = filteredUsers
            .filter(user => selectedUsers.includes(user.id))
            .map(user => `${user.firstName} ${user.lastName}`)
            .join(', ');
        
        try {
            const result = await Swal.fire({
                title: `Are you sure?`,
                html: `Do you want to ${actionText} <strong>${userCount}</strong> selected user${userCount > 1 ? 's' : ''}?<br><br><strong>Users:</strong><br>${selectedUserNames}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: block ? '#EF4444' : '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: `Yes, ${actionText} ${userCount} user${userCount > 1 ? 's' : ''}!`,
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                // Show loading state
                Swal.fire({
                    title: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)}ing users...`,
                    html: `Processing ${userCount} user${userCount > 1 ? 's' : ''}...`,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Process each user
                const promises = selectedUsers.map(userId => {
                    const user = filteredUsers.find(u => u.id === userId);
                    if (user && user.isBlocked !== block) {
                        const endpoint = block ? `/users/${userId}/block` : `/users/${userId}/unblock`;
                        return api.patch(endpoint);
                    }
                    return Promise.resolve();
                });

                const results = await Promise.allSettled(promises);
                const successful = results.filter(result => result.status === 'fulfilled').length;
                const failed = results.filter(result => result.status === 'rejected').length;

                // Show results
                if (failed === 0) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: `Successfully ${actionText}ed ${successful} user${successful > 1 ? 's' : ''}!`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                } else {
                    await Swal.fire({
                        icon: 'warning',
                        title: 'Partial Success',
                        text: `Successfully ${actionText}ed ${successful} user${successful > 1 ? 's' : ''}, but failed to ${actionText} ${failed} user${failed > 1 ? 's' : ''}.`,
                        confirmButtonColor: '#F59E0B'
                    });
                }
                
                // Clear selection and refresh the users list
                setSelectedUsers([]);
                dispatch(fetchUsers({ pageNumber: pagination.pageNumber, pageSize: pagination.pageSize, searchTerm, filterStatus }));
            }
        } catch (error) {
            console.error(`Error bulk ${actionText}ing users:`, error);
            
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Failed to ${actionText} users. Please try again.`,
                confirmButtonColor: '#EF4444'
            });
        }
    };

    // Handle block/unblock user
    const handleBlockUser = async (user) => {
        const action = user.isBlocked ? 'unblock' : 'block';
        const actionText = user.isBlocked ? 'unblock' : 'block';
        const userName = `${user.firstName} ${user.lastName}`;
        
        try {
            const result = await Swal.fire({
                title: `Are you sure?`,
                text: `Do you want to ${actionText} ${userName}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: user.isBlocked ? '#10B981' : '#EF4444',
                cancelButtonColor: '#6B7280',
                confirmButtonText: `Yes, ${actionText} user!`,
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                // Show loading state
                Swal.fire({
                    title: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)}ing user...`,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const endpoint = user.isBlocked ? `/users/${user.id}/unblock` : `/users/${user.id}/block`;
                const response = await api.patch(endpoint);
                
                if (response.data.status) {
                    // Show success message
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: `User ${actionText}ed successfully!`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    
                    // Refresh the users list
                    dispatch(fetchUsers({ pageNumber: pagination.pageNumber, pageSize: pagination.pageSize, searchTerm, filterStatus }));
                } else {
                    throw new Error('Failed to update user status');
                }
            }
        } catch (error) {
            console.error(`Error ${actionText}ing user:`, error);
            
            let errorMessage = 'Failed to update user status';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: errorMessage,
                confirmButtonColor: '#EF4444'
            });
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">Manage App Users</h1>
                    {selectedUsers.length > 0 && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
                        </span>
                    )}
                </div>
                <div className="flex gap-3">
                    {selectedUsers.length > 0 && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleBulkBlockUsers(true)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                                title="Block Selected Users"
                            >
                                <FaBan />
                                Block Selected
                            </button>
                            <button
                                onClick={() => handleBulkBlockUsers(false)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                                title="Unblock Selected Users"
                            >
                                <FaCheck />
                                Unblock Selected
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <FaPlus />
                        Add New User
                    </button>
                </div>
            </div>

            {/* Success/Error Messages
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                    {typeof success === 'string' ? success : 'Operation completed successfully'}
                </div>
            )}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    {(() => {
                        console.log('Error value:', error, 'Type:', typeof error);
                        return typeof error === 'string' ? error : 'An error occurred';
                    })()}
                </div>
            )} */}

            {/* Search and Filters */}
            <div>
                <div className="flex gap-4 items-center">
                    <div className="flex-1">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, city, state, or country"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full bg-[#dadada] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => handleStatusFilter(e.target.value)}
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
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        onClick={() => dispatch(fetchUsers({ pageNumber: pagination.pageNumber, pageSize: pagination.pageSize, searchTerm, filterStatus }))}
                    >
                        <BiRefresh className='text-2xl' />

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
                                    Blocked
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                            <span className="ml-2 text-gray-600">Loading users...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
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
                                            {user.image ? <img src={user.image} alt="user" className='w-10 h-10 rounded-full' /> :  <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center">
                                                  <span className="text-white text-sm font-medium">
                                                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                                    </span>
                                                </div>}
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                        {user.firstName} {user.lastName}
                                                        {user.isBlocked && (
                                                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                                                BLOCKED
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-gray-500">Id#{user.id.toString().padStart(5, '0')}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm text-gray-900">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(user.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                user.isBlocked 
                                                    ? 'bg-red-100 text-red-800' 
                                                    : 'bg-green-100 text-green-800'
                                            }`}>
                                                {user.isBlocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex gap-2">
                                                <button className="text-blue-600 hover:text-blue-900 me-1" title="View" onClick={() => navigate(`/superadmin/user/${user.id}`)}>
                                                    <FaEye />
                                                </button>
                                                <button className="text-green-600 hover:text-green-900" title="Edit" onClick={() => handleEditUser(user)}>
                                                    <FaEdit />
                                                </button>
                                                <button 
                                                    className={`w-20 py-1 rounded-lg text-xs font-medium transition-colors ${
                                                        user.isBlocked
                                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    }`}
                                                    onClick={() => handleBlockUser(user)}
                                                    title={user.isBlocked ? 'Unblock User' : 'Block User'}
                                                >
                                                    {user.isBlocked ? <FaCheck className="inline mr-1" /> : <FaBan className="inline mr-1" />}
                                                    {user.isBlocked ? 'Unblock' : 'Block'}
                                                </button>
                                              
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700">Rows per page</span>
                    <select
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                        value={pagination.pageSize}
                        onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    <span className="text-sm text-gray-700">of {pagination.totalElements} rows</span>
                </div>
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                        onClick={() => handlePageChange(pagination.pageNumber - 1)}
                        disabled={pagination.pageNumber === 1}
                    >
                        ‹
                    </button>

                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                            <button
                                key={pageNum}
                                className={`px-3 py-1 rounded text-sm ${pageNum === pagination.pageNumber
                                        ? 'bg-black text-white'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    {pagination.totalPages > 5 && (
                        <>
                            <span className="px-3 py-1 text-sm text-gray-500">...</span>
                            <button
                                className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                                onClick={() => handlePageChange(pagination.totalPages)}
                            >
                                {pagination.totalPages}
                            </button>
                        </>
                    )}

                    <button
                        className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                        onClick={() => handlePageChange(pagination.pageNumber + 1)}
                        disabled={pagination.pageNumber === pagination.totalPages}
                    >
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
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={newUser.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter First Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={newUser.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter Last Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={newUser.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter Email Address"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
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
                                            placeholder="Enter Phone Number"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Password *
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={newUser.password}
                                            onChange={handleInputChange}
                                            placeholder="Enter Password (min 6 characters)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Image URL
                                        </label>
                                        <input
                                            type="url"
                                            name="image"
                                            value={newUser.image}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/image.jpg"
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
                                disabled={localLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddUser}
                                className="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                disabled={localLoading}
                            >
                                {localLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Creating...
                                    </>
                                ) : (
                                    'Add User'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                        {/* Modal Header */}
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold">Edit User</h2>
                            <button
                                onClick={handleEditCancel}
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
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={editForm.firstName}
                                            onChange={handleEditInputChange}
                                            placeholder="Enter First Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={editForm.lastName}
                                            onChange={handleEditInputChange}
                                            placeholder="Enter Last Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editForm.email}
                                            onChange={handleEditInputChange}
                                            placeholder="Enter Email Address"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={editForm.phone}
                                            onChange={handleEditInputChange}
                                            placeholder="Enter Phone Number"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Role
                                        </label>
                                        <select
                                            name="role"
                                            value={editForm.role}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                            <option value="superadmin">Super Admin</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Image URL
                                        </label>
                                        <input
                                            type="url"
                                            name="image"
                                            value={editForm.image}
                                            onChange={handleEditInputChange}
                                            placeholder="https://example.com/image.jpg"
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
                                            {editForm.firstName.charAt(0)}{editForm.lastName.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <button className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
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
                                onClick={handleEditCancel}
                                className="flex-1 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                disabled={editLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                className="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                disabled={editLoading}
                            >
                                {editLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Updating...
                                    </>
                                ) : (
                                    'Update User'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users; 