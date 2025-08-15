import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaEye, FaDownload, FaCalendarAlt, FaTimes, FaUpload, FaPlus, FaCheck, FaBan } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/slices/authSlice';
import api from '../../utils/axios';
import { BiRefresh } from 'react-icons/bi';
import { Country, State, City } from 'country-state-city';
import Swal from 'sweetalert2';

const Venues = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedVenues, setSelectedVenues] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingVenues, setIsLoadingVenues] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [venues, setVenues] = useState([]);
    const [editingVenue, setEditingVenue] = useState(null);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 10,
        last: true,
        totalElements: 0,
        totalPages: 1
    });
    const token = useSelector(selectToken);

    const [newVenue, setNewVenue] = useState({
        firstName: '',
        lastName: '',
        venueName: '',
        venueImage: '',
        email: '',
        address: '',
        phone: '',
        countryCode: '',
        dob: '',
        image: '',
        password: '',
        role: 'venue',
        city: '',
        state: '',
        zipCode: '',
        country: 'UAE',
        description: '',
        website: ''
    });

    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        venueName: '',
        venueImage: '',
        email: '',
        address: '',
        phone: '',
        countryCode: '',
        dob: '',
        image: '',
        role: 'venue',
        city: '',
        state: '',
        zipCode: '',
        country: 'UAE',
        description: '',
        website: ''
    });

    // Add search states for city, state, country
    const [citySearch, setCitySearch] = useState('');
    const [stateSearch, setStateSearch] = useState('');
    const [countrySearch, setCountrySearch] = useState('');
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showStateDropdown, setShowStateDropdown] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);

    // Predefined options for search
    // Get all countries, states, and cities from the library
    const allCountries = Country.getAllCountries();
    const allStates = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];
    const allCities = selectedState ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode) : [];
    // Filtered options based on search
    const filteredCountryOptions = allCountries.filter(country =>
        country.name.toLowerCase().includes(countrySearch.toLowerCase())
    );
    const filteredStateOptions = allStates.filter(state =>
        state.name.toLowerCase().includes(stateSearch.toLowerCase())
    );
    const filteredCityOptions = allCities.filter(city =>
        city.name.toLowerCase().includes(citySearch.toLowerCase())
    );

    // Fetch venues from API
    const fetchVenues = async (pageNumber = 1, pageSize = 10) => {
        setIsLoadingVenues(true);
        try {
            const response = await api.get(`/users/get/venues?page=${pageNumber}&size=${pageSize}`);
            if (response.data.status) {
                setVenues(response.data?.data?.content || []);
                // Update pagination state if available
                if (response.data?.data) {
                    setPagination({
                        pageNumber: response.data.data.pageNumber || pageNumber,
                        pageSize: response.data.data.pageSize || pageSize,
                        last: response.data.data.last || true,
                        totalElements: response.data.data.totalElements || 0,
                        totalPages: response.data.data.totalPages || 1
                    });
                }
            } else {
                setError('Failed to fetch venues');
            }
        } catch (error) {
            console.error('Error fetching venues:', error);
            if (error.response?.status === 401) {
                setError('Unauthorized. Please login again.');
            } else {
                setError('Failed to fetch venues. Please try again.');
            }
        } finally {
            setIsLoadingVenues(false);
        }
    };

    // Fetch venues on component mount
    useEffect(() => {
        fetchVenues(1, pagination.pageSize);
    }, []);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        fetchVenues(pageNumber, pagination.pageSize);
    };

    // Handle page size change
    const handlePageSizeChange = (pageSize) => {
        fetchVenues(1, pageSize);
    };

    // Handle search with pagination reset
    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
        fetchVenues(1, pagination.pageSize);
    };

    // Handle status filter with pagination reset
    const handleStatusFilter = (status) => {
        setFilterStatus(status);
        fetchVenues(1, pagination.pageSize);
    };

    console.log(venues);
    const filteredVenues = venues && venues?.filter(venue => {
        const matchesSearch = venue.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.venueName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.country?.toLowerCase().includes(searchTerm.toLowerCase());
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
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[status]}`}>
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
        // Clear error when user starts typing
        if (error) setError('');
    };

    const resetForm = () => {
        setNewVenue({
            firstName: '',
            lastName: '',
            venueName: '',
            venueImage: '',
            email: '',
            address: '',
            phone: '',
            countryCode: '',
            dob: '',
            image: '',
            password: '',
            role: 'venue',
            city: '',
            state: '',
            zipCode: '',
            country: 'UAE',
            description: '',
            website: ''
        });
        setCitySearch('');
        setStateSearch('');
        setCountrySearch('');
        setSelectedCountry(null);
        setSelectedState(null);
        setShowCityDropdown(false);
        setShowStateDropdown(false);
        setShowCountryDropdown(false);
        setError('');
        setSuccess('');
    };

    const handleCancel = () => {
        setShowAddModal(false);
        resetForm();
    };

    const handleAddVenue = async () => {
        // Validation
        if (!newVenue.firstName || !newVenue.lastName || !newVenue.venueName || !newVenue.email || !newVenue.password) {
            setError('Please fill in all required fields');
            return;
        }

        if (!newVenue.email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        if (newVenue.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            // Prepare the data according to API specification
            const venueData = {
                firstName: newVenue.firstName,
                lastName: newVenue.lastName,
                venueName: newVenue.venueName,
                venueImage: newVenue.venueImage || '',
                email: newVenue.email,
                address: newVenue.address || '',
                phone: newVenue.phone || '',
                countryCode: newVenue.countryCode || '',
                dob: newVenue.dob || '',
                image: newVenue.image || '',
                password: newVenue.password,
                role: 'venue',
                city: newVenue.city || '',
                state: newVenue.state || '',
                zipCode: newVenue.zipCode || '',
                country: newVenue.country || 'UAE',
                description: newVenue.description || '',
                website: newVenue.website || ''
            };

            const response = await api.post('/users/add/venue', venueData);

            if (response.data.status) {
                setSuccess('Venue created successfully!');
                setShowAddModal(false);
                resetForm();
                // Optionally refresh the venues list here
                fetchVenues(1, pagination.pageSize);
            } else {
                setError(response.data.message || 'Failed to create venue');
            }
        } catch (error) {
            console.error('Error creating venue:', error);
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.status === 401) {
                setError('Unauthorized. Please login again.');
            } else if (error.response?.status === 400) {
                setError('Invalid data. Please check your input.');
            } else if (error.message === 'Network Error') {
                setError('Network error. Please check your connection.');
            } else {
                setError('Failed to create venue. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewVenueDetails = (venue) => {
        setSelectedVenue(venue);
        setShowRequestModal(true);
    };

    // Handle edit venue
    const handleEditVenue = (venue) => {
        setEditingVenue(venue);
        setEditForm({
            firstName: venue.firstName || venue.ownerFirstName || '',
            lastName: venue.lastName || venue.ownerLastName || '',
            venueName: venue.venueName || '',
            venueImage: venue.venueImage || '',
            email: venue.email || '',
            address: venue.address || '',
            phone: venue.phone || '',
            countryCode: venue.countryCode || '',
            dob: venue.dob || '',
            image: venue.image || venue.avatar || '',
            role: 'venue',
            city: venue.city || '',
            state: venue.state || '',
            zipCode: venue.zipCode || '',
            country: venue.country || 'UAE',
            description: venue.description || '',
            website: venue.website || ''
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
        if (!editForm.firstName || !editForm.lastName || !editForm.venueName || !editForm.email) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'First name, last name, venue name, and email are required fields.',
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
            const response = await api.patch(`/users/update/venue/${editingVenue.id}`, editForm);

            if (response.data.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Venue information updated successfully!',
                    timer: 2000,
                    showConfirmButton: false
                });

                setShowEditModal(false);
                setEditingVenue(null);

                // Refresh the venues list
                fetchVenues(pagination.pageNumber, pagination.pageSize);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update venue information. Please try again.',
                confirmButtonColor: '#EF4444'
            });
            console.error('Error updating venue:', error);

        } finally {
            setEditLoading(false);
        }
    };

    // Close edit modal
    const handleEditCancel = () => {
        setShowEditModal(false);
        setEditingVenue(null);
        setEditForm({
            firstName: '',
            lastName: '',
            venueName: '',
            venueImage: '',
            email: '',
            address: '',
            phone: '',
            countryCode: '',
            dob: '',
            image: '',
            role: 'venue',
            city: '',
            state: '',
            zipCode: '',
            country: 'UAE',
            description: '',
            website: ''
        });
    };

    // Handle delete venue
    const handleDeleteVenue = async (venue) => {
        const venueName = venue.venueName || `${venue.firstName || venue.ownerFirstName || ''} ${venue.lastName || venue.ownerLastName || ''}`.trim() || 'this venue';

        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to delete ${venueName}? This action cannot be undone.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#EF4444',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Yes, delete venue!',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                // Show loading state
                Swal.fire({
                    title: 'Deleting venue...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Make API call to delete the venue
                const response = await api.delete(`/users/delete/venue/${venue.id}`);

                if (response.data.status) {
                    // Show success message
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Venue deleted successfully!',
                        timer: 2000,
                        showConfirmButton: false
                    });

                    // Refresh the venues list
                    fetchVenues(pagination.pageNumber, pagination.pageSize);
                } else {
                    throw new Error(response.data.message || 'Failed to delete venue');
                }
            }
        } catch (error) {
            console.error('Error deleting venue:', error);

            let errorMessage = 'Failed to delete venue. Please try again.';
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

    // Export venues to CSV
    const exportToCSV = () => {
        // Define CSV headers
        const headers = [
            'ID',
            'First Name',
            'Last Name',
            'Venue Name',
            'Email',
            'Phone',
            'Address',
            'City',
            'State',
            'Country',
            'Zip Code',
            'Status',
            'Joining Date',
            'Description',
            'Website'
        ];

        // Prepare CSV data
        const csvData = filteredVenues.map(venue => [
            venue.id,
            venue.firstName || venue.ownerFirstName || '',
            venue.lastName || venue.ownerLastName || '',
            venue.venueName || '',
            venue.email || '',
            venue.phone || '',
            venue.address || '',
            venue.city || '',
            venue.state || '',
            venue.country || '',
            venue.zipCode || '',
            venue.status || '',
            venue.createdAt ? new Date(venue.createdAt).toLocaleDateString() : '',
            venue.description || '',
            venue.website || ''
        ]);

        // Combine headers and data
        const csvContent = [headers, ...csvData]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');

        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `venues_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Clear success message after 5 seconds
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    // Handle clicking outside dropdowns to close them
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.relative')) {
                setShowCityDropdown(false);
                setShowStateDropdown(false);
                setShowCountryDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Reset dependent fields when country or state changes
    useEffect(() => {
        if (!selectedCountry) {
            setSelectedState(null);
            setNewVenue(prev => ({ ...prev, state: '', city: '' }));
            setStateSearch('');
            setCitySearch('');
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (!selectedState) {
            setNewVenue(prev => ({ ...prev, city: '' }));
            setCitySearch('');
        }
    }, [selectedState]);

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Venues</h1>
                <div className="flex gap-3">
                   
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <FaPlus />
                        Add New Venue
                    </button>
                </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                    {success}
                </div>
            )}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

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
                    {/* <div className="relative">
                        <input
                            type="text"
                            placeholder="Custom"
                            className="px-4 py-2 placeholder:text-black border border-gray-300 rounded-lg focus:outline-none pr-10"
                        />
                        <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                    </div> */}
                    <button 
                        onClick={exportToCSV}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <FaDownload />
                        Export
                    </button>
                    <button
                        onClick={() => fetchVenues(1, pagination.pageSize)}
                        disabled={isLoadingVenues}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        {isLoadingVenues ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                        ) : (
                            <BiRefresh className='text-2xl' />
                        )}
                        {/* Refresh */}
                    </button>
                </div>
            </div>

            {/* Venues Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoadingVenues ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                            <span className="ml-3 text-gray-600">Loading venues...</span>
                        </div>
                    ) : venues.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg mb-2">
                                {searchTerm || filterStatus !== 'all' 
                                    ? 'No venues match your search criteria' 
                                    : 'No venues found'}
                            </div>
                            <div className="text-gray-400 text-sm">
                                {searchTerm || filterStatus !== 'all' 
                                    ? 'Try adjusting your search or filters' 
                                    : 'Start by adding your first venue'}
                            </div>
                        </div>
                    ) : (
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
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        Address
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        Joining Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
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
                                        <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => navigate(`/superadmin/venue/${venue.id}`)}>
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-red-500 rounded-full flex items-center justify-center mr-3">
                                                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-sm font-bold">
                                                            {venue.avatar || 'V'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">
                                                        {venue.ownerName || `${venue.firstName || ''} ${venue.lastName || ''}`.trim() || 'N/A'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{venue.venueName || 'N/A'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {venue.email || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {venue.address || `${venue.city || ''} ${venue.state || ''} ${venue.country || ''}`.trim() || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {venue.joiningDate || venue.createdAt ? new Date(venue.joiningDate || venue.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(venue.status || 'pending')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleViewVenueDetails(venue)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="View Details"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    onClick={() => handleEditVenue(venue)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteVenue(venue)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-sm">
                {isLoadingVenues && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-xl">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                    </div>
                )}
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
                    <span className="text-sm text-gray-700">
                        of {pagination.totalElements} rows
                    </span>
                </div>
                <div className="flex gap-2">
                    <button 
                        className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                        onClick={() => handlePageChange(1)}
                        disabled={pagination.pageNumber === 1}
                        title="First Page"
                    >
                        ‹‹
                    </button>
                    <button 
                        className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                        onClick={() => handlePageChange(pagination.pageNumber - 1)}
                        disabled={pagination.pageNumber === 1}
                        title="Previous Page"
                    >
                        ‹
                    </button>
                    
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                            <button
                                key={pageNum}
                                className={`px-3 py-1 rounded text-sm ${
                                    pageNum === pagination.pageNumber
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
                        title="Next Page"
                    >
                        ›
                    </button>
                    <button 
                        className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                        onClick={() => handlePageChange(pagination.totalPages)}
                        disabled={pagination.pageNumber === pagination.totalPages}
                        title="Last Page"
                    >
                        ››
                    </button>
                </div>
            </div>

            {/* Add Venue Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl max-w-4xl w-full mx-4 p-8">
                        <div className="max-h-[80vh] overflow-y-auto">
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

                            {/* Form Content */}
                            <div className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={newVenue.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter First Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={newVenue.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter Last Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Venue Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="venueName"
                                            value={newVenue.venueName}
                                            onChange={handleInputChange}
                                            placeholder="Enter Venue Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Venue Details */}
                                <div className="grid grid-cols-3 gap-4">

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={newVenue.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter Email Address"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={newVenue.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter Phone Number"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={newVenue.dob}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="grid grid-cols-3 gap-4">

                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Password *
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={newVenue.password}
                                            onChange={handleInputChange}
                                            placeholder="Enter Password (min 6 characters)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Country
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="country"
                                                value={countrySearch}
                                                onChange={(e) => {
                                                    setCountrySearch(e.target.value);
                                                    setShowCountryDropdown(true);
                                                    if (e.target.value === '') {
                                                        setNewVenue({ ...newVenue, country: '' });
                                                    }
                                                }}
                                                onFocus={() => setShowCountryDropdown(true)}
                                                placeholder="Search or type country name"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            {showCountryDropdown && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                                    {filteredCountryOptions.map((country) => (
                                                        <div
                                                            key={country.isoCode}
                                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => {
                                                                setNewVenue({ ...newVenue, country: country.name });
                                                                setCountrySearch(country.name);
                                                                setSelectedCountry(country);
                                                                setSelectedState(null);
                                                                setNewVenue(prev => ({ ...prev, state: '', city: '' }));
                                                                setStateSearch('');
                                                                setCitySearch('');
                                                                setShowCountryDropdown(false);
                                                            }}
                                                        >
                                                            {country.name}
                                                        </div>
                                                    ))}
                                                    {filteredCountryOptions.length === 0 && (
                                                        <div className="px-3 py-2 text-gray-500">
                                                            No countries found
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            State
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="state"
                                                value={stateSearch}
                                                onChange={(e) => {
                                                    setStateSearch(e.target.value);
                                                    setShowStateDropdown(true);
                                                    if (e.target.value === '') {
                                                        setNewVenue({ ...newVenue, state: '' });
                                                    }
                                                }}
                                                onFocus={() => setShowStateDropdown(true)}
                                                placeholder={selectedCountry ? "Search or type state name" : "Select a country first"}
                                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!selectedCountry ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                                disabled={!selectedCountry}
                                            />
                                            {!selectedCountry && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Please select a country first
                                                </div>
                                            )}
                                            {/* {selectedCountry && (
                                                <div className="text-xs text-green-600 mt-1">
                                                    Selected: {selectedCountry.name}
                                                </div>
                                            )} */}
                                            {showStateDropdown && selectedCountry && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                                    {filteredStateOptions.map((state) => (
                                                        <div
                                                            key={state.isoCode}
                                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => {
                                                                setNewVenue({ ...newVenue, state: state.name });
                                                                setStateSearch(state.name);
                                                                setSelectedState(state);
                                                                setNewVenue(prev => ({ ...prev, city: '' }));
                                                                setCitySearch('');
                                                                setShowStateDropdown(false);
                                                            }}
                                                        >
                                                            {state.name}
                                                        </div>
                                                    ))}
                                                    {filteredStateOptions.length === 0 && (
                                                        <div className="px-3 py-2 text-gray-500">
                                                            No states found for this country
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            City
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="city"
                                                value={citySearch}
                                                onChange={(e) => {
                                                    setCitySearch(e.target.value);
                                                    setShowCityDropdown(true);
                                                    if (e.target.value === '') {
                                                        setNewVenue({ ...newVenue, city: '' });
                                                    }
                                                }}
                                                onFocus={() => setShowCityDropdown(true)}
                                                placeholder={selectedState ? "Search or type city name" : "Select a state first"}
                                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!selectedState ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                                disabled={!selectedState}
                                            />
                                            {!selectedState && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Please select a state first
                                                </div>
                                            )}
                                            {/* {selectedState && (
                                                <div className="text-xs text-green-600 mt-1">
                                                    Selected: {selectedState.name}
                                                </div>
                                            )} */}
                                            {showCityDropdown && selectedState && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                                    {filteredCityOptions.map((city) => (
                                                        <div
                                                            key={city.id}
                                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => {
                                                                setNewVenue({ ...newVenue, city: city.name });
                                                                setCitySearch(city.name);
                                                                setShowCityDropdown(false);
                                                            }}
                                                        >
                                                            {city.name}
                                                        </div>
                                                    ))}
                                                    {filteredCityOptions.length === 0 && (
                                                        <div className="px-3 py-2 text-gray-500">
                                                            No cities found for this state
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={newVenue.zipCode}
                                            onChange={handleInputChange}
                                            placeholder="Enter Zip Code"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Website
                                        </label>
                                        <input
                                            type="url"
                                            name="website"
                                            value={newVenue.website}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>




                                {/* Additional Information */}
                                <div className="grid grid-cols-2 gap-4">

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Image URL
                                        </label>
                                        <input
                                            type="url"
                                            name="image"
                                            value={newVenue.image}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Venue Image URL
                                        </label>
                                        <input
                                            type="url"
                                            name="venueImage"
                                            value={newVenue.venueImage}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                {/* Address Information */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={newVenue.address}
                                            onChange={handleInputChange}
                                            placeholder="Enter Address"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                </div>
                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={newVenue.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter venue description..."
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 pt-6">
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-200 text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddVenue}
                                    disabled={isLoading}
                                    className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        'Add'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Venue Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl max-w-4xl w-full mx-4 p-8">
                        <div className="max-h-[80vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl font-bold">Edit Venue</h2>
                                <button
                                    onClick={handleEditCancel}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Form Content */}
                            <div className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Venue Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="venueName"
                                            value={editForm.venueName}
                                            onChange={handleEditInputChange}
                                            placeholder="Enter Venue Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Venue Details */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={editForm.dob}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={editForm.country}
                                            onChange={handleEditInputChange}
                                            placeholder="Enter country name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={editForm.state}
                                            onChange={handleEditInputChange}
                                            placeholder="Enter state name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={editForm.city}
                                            onChange={handleEditInputChange}
                                            placeholder="Enter city name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={editForm.zipCode}
                                            onChange={handleEditInputChange}
                                            placeholder="Enter Zip Code"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Website
                                        </label>
                                        <input
                                            type="url"
                                            name="website"
                                            value={editForm.website}
                                            onChange={handleEditInputChange}
                                            placeholder="https://example.com"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Country Code
                                        </label>
                                        <input
                                            type="text"
                                            name="countryCode"
                                            value={editForm.countryCode}
                                            onChange={handleEditInputChange}
                                            placeholder=""
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Venue Image URL
                                        </label>
                                        <input
                                            type="url"
                                            name="venueImage"
                                            value={editForm.venueImage}
                                            onChange={handleEditInputChange}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Address Information */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={editForm.address}
                                            onChange={handleEditInputChange}
                                            placeholder="Enter Address"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={editForm.description}
                                        onChange={handleEditInputChange}
                                        placeholder="Enter venue description..."
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 pt-6">
                                <button
                                    onClick={handleEditCancel}
                                    className="bg-gray-200 text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                    disabled={editLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditSubmit}
                                    disabled={editLoading}
                                    className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {editLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        'Update'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Venue Detail Modal */}
            {showRequestModal && selectedVenue && (
                <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-xl w-full mx-4">
                        {/* Modal Header */}
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold">Request Details</h2>
                            <button
                                onClick={() => {
                                    setShowRequestModal(false);
                                    setSelectedVenue(null);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Venue Info */}
                        <div className="flex items-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-red-500 rounded-full flex items-center justify-center mr-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                                    <span className="text-white text-lg font-bold">
                                        {selectedVenue.avatar || 
                                         (selectedVenue.firstName ? selectedVenue.firstName.charAt(0) : 
                                          selectedVenue.venueName ? selectedVenue.venueName.charAt(0) : 'V')}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {selectedVenue.venueName || 'N/A'}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Owner: {selectedVenue.ownerName || 
                                            `${selectedVenue.firstName || ''} ${selectedVenue.lastName || ''}`.trim() || 'N/A'}
                                </div>
                                <div className="text-sm text-gray-500">
                                    ID: #{selectedVenue.id || 'N/A'}
                                </div>
                            </div>
                        </div>

                        {/* Venue Details Grid */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="space-y-4">
                                <div className='flex items-center gap-2'>
                                    <span className="font-semibold text-gray-700">Email Address:</span>
                                    <div className="text-gray-900 mt-1">{selectedVenue.email || 'N/A'}</div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className="font-semibold text-gray-700">Phone Number:</span>
                                    <div className="text-gray-900 mt-1">
                                        {selectedVenue.countryCode || ''}{selectedVenue.phone || 'N/A'}
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        {/* Address and Additional Info */}
                        <div className="space-y-4 mb-6">
                            <div className='flex items-center gap-2'>
                                <span className="font-semibold text-gray-700">Full Address:</span>
                                <div className="text-gray-900 mt-1">
                                    {selectedVenue.address || 
                                     `${selectedVenue.city || ''} ${selectedVenue.state || ''} ${selectedVenue.country || ''}`.trim() || 'N/A'}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    setShowRequestModal(false);
                                    setSelectedVenue(null);
                                }}
                                className="flex-1 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Close
                            </button>
                            <button 
                                // onClick={() => {
                                //     setShowRequestModal(false);
                                //     setSelectedVenue(null);
                                //     handleEditVenue(selectedVenue);
                                // }}
                                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                            >
                                Accept
                            </button>
                            <button 
                                // onClick={() => {
                                //     setShowRequestModal(false);
                                //     setSelectedVenue(null);
                                //     handleDeleteVenue(selectedVenue);
                                // }}
                                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Venues; 