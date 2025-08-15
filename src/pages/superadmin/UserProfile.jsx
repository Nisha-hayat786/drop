import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BiDotsVertical } from 'react-icons/bi';
import { FaSearch, FaEye, FaHeart, FaComment, FaShare, FaBell, FaFileAlt, FaCalendarAlt, FaClock, FaArrowUp, FaArrowDown, FaMapMarkerAlt, FaCar, FaCalendarCheck, FaPercent, FaSort, FaBan, FaCheck, FaTimes, FaUpload } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/slices/authSlice';
import api from '../../utils/axios';
import Swal from 'sweetalert2';

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    
    const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
    const [showOptions, setShowOptions] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [profile, setProfile] = useState({
        id: null,
        firstName: '',
        lastName: '',
        venueName: '',
        venueImage: '',
        status: '',
        email: '',
        address: '',
        phone: '',
        countryCode: '',
        dob: '',
        image: '',
        isVerified: false,
        isBlocked: false,
        role: '',
        lastLoginAt: null,
        city: '',
        state: '',
        zipCode: '',
        country: '',
        description: '',
        website: '',
        createdAt: '',
        updatedAt: ''
    });

    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        description: '',
        website: ''
    });

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get(`/users/${id}`);
                
                if (response.data.status) {
                    setProfile(response.data.data);
                } else {
                    setError('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                if (error.response?.data?.message) {
                    setError(error.response.data.message);
                } else if (error.response?.status === 404) {
                    setError('User not found');
                } else if (error.response?.status === 401) {
                    setError('Unauthorized. Please login again.');
                } else {
                    setError('Failed to fetch user profile');
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserProfile();
        }
    }, [id]);

    // Handle block/unblock user
    const handleBlockUser = async () => {
        const action = profile.isBlocked ? 'unblock' : 'block';
        const actionText = profile.isBlocked ? 'unblock' : 'block';
        const userName = `${profile.firstName} ${profile.lastName}`;
        
        try {
            const result = await Swal.fire({
                title: `Are you sure?`,
                text: `Do you want to ${actionText} ${userName}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: profile.isBlocked ? '#10B981' : '#EF4444',
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

                const endpoint = profile.isBlocked ? `/users/${id}/unblock` : `/users/${id}/block`;
                const response = await api.patch(endpoint);
                
                if (response.data.status) {
                    setProfile(prev => ({
                        ...prev,
                        isBlocked: !prev.isBlocked
                    }));
                    
                    // Show success message
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: `User ${actionText}ed successfully!`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setShowOptions(false);
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

    // Handle click outside to close options
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showOptions && !event.target.closest('.options-container')) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOptions]);

    // Initialize edit form when profile data changes
    useEffect(() => {
        if (profile.id) {
            setEditForm({
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                email: profile.email || '',
                phone: profile.phone || '',
                address: profile.address || '',
                city: profile.city || '',
                state: profile.state || '',
                country: profile.country || '',
                zipCode: profile.zipCode || '',
                description: profile.description || '',
                website: profile.website || ''
            });
        }
    }, [profile]);

    // Handle edit form input changes
    const handleEditInputChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    // Open edit modal
    const handleEditUser = () => {
        setShowEditModal(true);
        setShowOptions(false);
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
                // For now, we'll just update the local state
                setProfile(prev => ({
                    ...prev,
                    ...editForm
                }));

                // Show success message
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'User information updated successfully!',
                    timer: 2000,
                    showConfirmButton: false
                });

                setShowEditModal(false);
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
        // Reset form to current profile data
        setEditForm({
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            email: profile.email || '',
            phone: profile.phone || '',
            address: profile.address || '',
            city: profile.city || '',
            state: profile.state || '',
            country: profile.country || '',
            zipCode: profile.zipCode || '',
            description: profile.description || '',
            website: profile.website || ''
        });
    };

    // User Stats Chart (Number of View Posts)
    const userStatsChart = {
        series: [{
            name: 'View Posts',
            data: [100, 150, 250, 180, 220, 280, 200, 180, 250, 200, 150, 100, 100] // Adjusted data to match image
        }],
        options: {
            chart: {
                height: 300,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 3,
            },
            colors: ['#000000'], // Changed to black to match image
            grid: {
                borderColor: '#E0E6ED',
                strokeDashArray: 5,
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'], // Added repeating Jan
                labels: {
                    style: {
                        fontSize: '12px',
                    },
                },
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value;
                    },
                    style: {
                        fontSize: '12px',
                    },
                },
                min: 0, // Ensure y-axis starts from 0
                max: 300, // Ensure y-axis max is 300
                tickAmount: 3, // To get 100, 200, 300
            },
            tooltip: {
                y: {
                    formatter: function (value) {
                        return value + ' posts';
                    },
                },
            },
        },
    };

    // User Engagement Stats Cards
    const userEngagementStatsCards = [
        {
            title: 'Total View Posts',
            value: '20K+',
            change: '+10% than Last Month',
            changeType: 'positive',
            icon: <FaEye className="text-lg" />
        },
        {
            title: 'Average Watch Time',
            value: '1,320,231ms',
            change: '+10% than Last Month',
            changeType: 'positive',
            icon: <FaClock className="text-lg" />
        },
        {
            title: 'Longest View Time',
            value: '1,320ms',
            change: '+10% than Last Month',
            changeType: 'positive',
            icon: <FaClock className="text-lg" />
        },
        {
            title: 'Shortest View Time',
            value: '320ms',
            change: '+10% than Last Month',
            changeType: 'positive',
            icon: <FaClock className="text-lg" />
        }
    ];

    const timePeriods = ['Weekly', 'Monthly', 'Yearly']; // Removed 'Custom' as it's not in the image for this section

    // Posts Data
    const posts = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
            title: 'Unveil the charm of Russian elegance at the luxurious Grand Volga Hotel, where every detail reflects sophistication.',
            location: 'Dubai, UAE',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
            title: 'Delight in the stunning views from the Volga River Hotel, offering a unique perspective on Russian beauty.',
            location: 'Dubai, UAE',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
            title: 'Indulge in the lavish experience at the Baltic Sea Resort, where Russian beauty is celebrated in every detail.',
            location: 'Dubai, UAE',
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
            title: 'Explore the refined beauty of the Aurora Hotel, where modern amenities meet classic Russian charm.',
            location: 'Dubai, UAE',
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
            title: 'Immerse yourself in the beauty of Russian culture at the opulent Kremlin Suites, where elegance meets tradition.',
            location: 'Dubai, UAE',
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
            title: 'Discover the allure of the Black Sea Retreat, a picturesque escape that embodies the essence of Russian beauty.',
            location: 'Dubai, UAE',
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
            title: 'Experience the captivating essence of Russian hospitality at the exquisite Tsar Palace, showcasing unparalleled comfort.',
            location: 'Dubai, UAE',
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
            title: 'Relax in the serene ambiance of the Moscow Luxury Inn, a haven of tranquility amidst the city’s vibrancy.',
            location: 'Dubai, UAE',
        },

    ];

    // Most Used Filters
    const mostUsedFilters = [
        { filter: "#mountains", timeUsed: "750" },
        { filter: "#forest", timeUsed: "300" },
        { filter: "#desert", timeUsed: "400" },
        { filter: "#cityscape", timeUsed: "1000" },
        { filter: "#sunset", timeUsed: "650" }
    ];

    // Most Used Combinations
    const mostUsedCombinations = [
        { combination: "#city+#Cultural+#Experience", timeUsed: "500" },
        { combination: "#mountain+#Adventure+#Getaway", timeUsed: "350" },
        { combination: "#desert+#Mystical+#Retreat", timeUsed: "300" },
        { combination: "#forest+#Nature+#Expedition", timeUsed: "400" },
        { combination: "#island+Tropical+#Vacation", timeUsed: "600" }
    ];

    // Interaction Stats
    const interactionStats = [
        {
            icon: <FaHeart />,
            value: "20K+",
            label: "Total Likes Given",
            change: '+10% than Last Month',
            changeType: 'positive',
        },
        {
            icon: <FaShare />,
            value: "20K+",
            label: "Total Share Clicks",
            change: '+10% than Last Month',
            changeType: 'positive',
        },
        {
            icon: <FaMapMarkerAlt />,
            value: "20K+",
            label: "Total Map Clicks",
            change: '+10% than Last Month',
            changeType: 'positive',
        },
        {
            icon: <FaCar />,
            value: "20K+",
            label: "Total Drop-Off Clicks",
            change: '+10% than Last Month',
            changeType: 'positive',
        },
        {
            icon: <FaCalendarCheck />,
            value: "20K+",
            label: "Total Book Clicks",
            change: '+10% than Last Month',
            changeType: 'positive',
        },
        {
            icon: <FaPercent />,
            value: "20K+",
            label: "Total Deal Clicks",
            change: '+10% than Last Month',
            changeType: 'positive',
        }
    ];

    // Show loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                <span className="ml-4 text-xl">Loading user profile...</span>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
                <button 
                    onClick={() => window.location.reload()} 
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Back Button */}
            {/* <div className="flex justify-start">
                <button 
                    onClick={() => navigate('/superadmin/users')}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                    ← Back to Users
                </button>
            </div> */}

            {/* Recent Posts Banner */}
            <div className="relative">
                <img
                    src={'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80'}
                    alt="Header"
                    className="w-full h-64 object-cover rounded-2xl cursor-pointer"
                />
                {/* <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-100"><FiEdit2 className="text-xl text-gray-600" /></button> */}
                <div className="absolute left-20 -bottom-12 right-20 bg-white rounded-xl shadow flex items-center justify-between px-8 py-4">
                    <div className='flex items-center gap-4'>
                        {profile.image ? (
                            <img src={profile.image} alt="avatar" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow" />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-red-700 border-4 border-white shadow flex items-center justify-center">
                                <span className="text-white text-xl font-bold">
                                    {profile.firstName?.charAt(0)}{profile.lastName?.charAt(0)}
                                </span>
                            </div>
                        )}
                        <div>
                            <div className="font-semibold text-[16px] mb-1">
                                {profile.firstName} {profile.lastName}
                            </div>
                          {profile.address && <div className="text-gray-500 text-sm">
                                {profile.address}
                            </div>}
                        </div>
                    </div>
                    <div>
                        <p className='font-semibold'>Mobile: <span className='ms-11 text-left'>{profile.phone || 'N/A'}</span></p>
                        <p className='font-semibold'>Email: <span className='ms-14 text-left'>{profile.email}</span></p>
                    
                    </div>
                    <div className="options-container relative">
                        <BiDotsVertical className='text-4xl cursor-pointer bg-[#ebedf0] p-2 rounded-md' onClick={() => setShowOptions(!showOptions)} />
                        {showOptions && (
                            <div className='absolute top-20 right-0 bg-white rounded-xl shadow-md p-3 px-4 text-sm min-w-[150px] z-10'>
                                <p className='cursor-pointer hover:bg-gray-100 p-1 rounded' onClick={handleEditUser}>Edit Details</p>
                                <p 
                                    className={`cursor-pointer py-1 p-1 rounded flex items-center gap-2 ${profile.isBlocked ? 'text-green-600' : 'text-red-600'}`}
                                    onClick={handleBlockUser}
                                >
                                    {profile.isBlocked ? <FaCheck /> : <FaBan />}
                                    {profile.isBlocked ? 'Unblock User' : 'Block User'}
                                </p>
                                <p className='cursor-pointer hover:bg-gray-100 p-1 rounded'>Delete</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Used Posts Section */}
            <div className='mt-16'>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Liked Posts</h2>
                    <button>View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col p-3 border border-gray-200">
                            <img src={post.image} alt="Post" className="rounded-xl h-40 w-full object-cover mb-2" />
                            <div className="pt-2 flex flex-col flex-1">
                                <div className="text-sm mb-2">{post.title}</div>
                                <div className="flex items-center justify-between mt-5">
                                    <div className="text-xs text-gray-500 mb-2">{post.location}</div>
                                    <button className="bg-black text-white rounded-lg px-4 py-2 text-xs cursor-pointer" onClick={() => navigate(`/post/${post.id}`)}>View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Expired Posts Section */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Events Hotspots</h2>
                    <button>View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col p-3 border border-gray-200">
                            <img src={post.image} alt="Post" className="rounded-xl h-40 w-full object-cover mb-2" />
                            <div className="pt-2 flex flex-col flex-1">
                                <div className="text-sm mb-2">{post.title}</div>
                                <div className="flex items-center justify-between mt-5">
                                    <div className="text-xs text-gray-500 mb-2">{post.location}</div>
                                    <button className="bg-black text-white rounded-lg px-4 py-2 text-xs cursor-pointer" onClick={() => navigate(`/post/${post.id}`)}>View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Stats Section */}
            <div>
                <h2 className="text-xl font-bold mb-6">User Stats</h2> {/* Overall section title */}

                <div className="flex justify-between items-center mb-4"> {/* Row for chart title and period buttons */}
                    <h3 className="text-lg font-semibold">Number of View Posts</h3>
                    <div className="flex gap-2">
                        {timePeriods.map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`px-4 py-1 text-sm rounded-md transition-colors ${selectedPeriod === period
                                    ? 'bg-black text-white'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                    }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> {/* Grid for chart (left) and stat cards (right) */}
                    {/* Left side: Line Chart */}
                    <div>
                        <ReactApexChart
                            series={userStatsChart.series}
                            options={userStatsChart.options}
                            type="line"
                            height={250}
                        />
                    </div>

                    {/* Right side: Stat Cards */}
                    <div className="grid grid-cols-2 gap-4"> {/* 2x2 grid for stat cards */}
                        {userEngagementStatsCards.map((card, index) => (
                            <div key={index} className="bg-white rounded-xl p-4 shadow-sm"> {/* Each stat card has its own styling */}
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm"> {/* Icon styling */}
                                        {card.icon}
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs ${card.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                        {card.changeType === 'positive' ? <FaArrowUp /> : <FaArrowDown />}
                                        {card.change}
                                    </div>
                                </div>
                                <div className="text-xl font-bold mb-1">{card.value}</div>
                                <div className="text-gray-500 text-sm">{card.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interaction Stats Section */}
            <div>
                <h2 className="text-xl font-bold mb-6">Interaction Stats</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {interactionStats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-4 px-3 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="text-black text-lg">
                                    {stat.icon}
                                </div>
                                <div className="text-black text-sm font-medium">{stat.label}</div>
                            </div>
                            <div className="text-xl font-bold text-black mb-3">{stat.value}</div>
                            <div className="text-green-500 text-xs">
                                {stat.change}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter Insights Section */}
            <div>
                <h2 className="text-xl font-bold mb-6">Filter Insights</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Most Used Filters */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Most Used Filters</h3>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors flex items-center gap-1">
                                    <FaArrowUp className="text-xs" />
                                    Export
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                                    Custom
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                                    <FaCalendarAlt />
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-900 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Filter</th>
                                        <th className="px-4 py-3 justify-end text-sm font-medium flex items-center gap-1">
                                            Time Used
                                            <FaSort />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mostUsedFilters.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-900">{item.filter}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600 text-right">{item.timeUsed}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Most Used Combinations */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Most Used Combinations</h3>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors flex items-center gap-1">
                                    <FaArrowUp className="text-xs" />
                                    Export
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                                    Custom
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                                    <FaCalendarAlt />
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-900 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Filter Combinations</th>
                                        <th className="px-4 py-3 justify-end text-sm font-medium flex items-center gap-1">
                                            Time Used
                                            <FaSort />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mostUsedCombinations.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-900">{item.combination}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600 text-right">{item.timeUsed}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit User Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold">Edit User Information</h2>
                            <button 
                                onClick={handleEditCancel}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={editForm.city}
                                    onChange={handleEditInputChange}
                                    placeholder="Enter City"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={editForm.state}
                                    onChange={handleEditInputChange}
                                    placeholder="Enter State"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={editForm.country}
                                    onChange={handleEditInputChange}
                                    placeholder="Enter Country"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={editForm.description}
                                    onChange={handleEditInputChange}
                                    placeholder="Enter Description"
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6">
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

export default Profile; 