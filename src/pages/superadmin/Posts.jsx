import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaEye, FaDownload, FaCalendarAlt, FaTimes, FaEllipsisV, FaCheck, FaBan } from 'react-icons/fa';

const Posts = () => {
    const [activeTab, setActiveTab] = useState('posts');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    // Mock data for posts
    const posts = [
        {
            id: 1,
            title: "Experience the charm of the Alpine Retreat...",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            postedBy: "John Anderson",
            venue: "Mountain Escape Lodge",
            date: "2023-03-10",
            status: "approved",
            avatar: "JA"
        },
        {
            id: 2,
            title: "Unwind at the Tropical Oasis...",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            postedBy: "Jessica Lee",
            venue: "Island Retreat",
            date: "2023-06-15",
            status: "pending",
            avatar: "JL"
        },
        {
            id: 3,
            title: "Savor the unique blend of history and luxury...",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            postedBy: "David Martinez",
            venue: "Cityscape Suites",
            date: "2023-07-25",
            status: "approved",
            avatar: "DM"
        },
        {
            id: 4,
            title: "Discover the rustic elegance of our farmhouse...",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            postedBy: "Michael Smith",
            venue: "Country Charm Inn",
            date: "2023-06-20",
            status: "pending",
            avatar: "MS"
        },
        {
            id: 5,
            title: "Experience tranquility in our peaceful retreat...",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            postedBy: "Laura Wilson",
            venue: "Peaceful Retreat",
            date: "2023-08-10",
            status: "approved",
            avatar: "LW"
        },
        {
            id: 6,
            title: "Bask in the coastal beauty of our seaside sanctuary...",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            postedBy: "Emily Chen",
            venue: "Seaside Sanctuary",
            date: "2023-04-05",
            status: "pending",
            avatar: "EC"
        }
    ];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.postedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.venue.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedPosts(filteredPosts.map(post => post.id));
        } else {
            setSelectedPosts([]);
        }
    };

    const handleSelectPost = (postId) => {
        if (selectedPosts.includes(postId)) {
            setSelectedPosts(selectedPosts.filter(id => id !== postId));
        } else {
            setSelectedPosts([...selectedPosts, postId]);
        }
    };

    const handleViewPost = (post) => {
        setSelectedPost(post);
        setShowPreviewModal(true);
    };

    const handleApprove = (postId) => {
        console.log('Approving post:', postId);
        // Add approval logic here
    };

    const handleDecline = (postId) => {
        console.log('Declining post:', postId);
        // Add decline logic here
    };

    const handleApproveAll = () => {
        console.log('Approving all selected posts');
        // Add bulk approval logic here
    };

    const handleDeclineAll = () => {
        console.log('Declining all selected posts');
        // Add bulk decline logic here
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Posts</h1>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 gap-2">
                <button
                    onClick={() => setActiveTab('posts')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium ${
                        activeTab === 'posts'
                            ? 'bg-black text-white'
                            : 'bg-[#dadada] text-black'
                    }`}
                >
                    Posts
                </button>
                <button
                    onClick={() => setActiveTab('requests')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium ${
                        activeTab === 'requests'
                            ? 'bg-black text-white'
                            : 'bg-[#dadada] text-black'
                    }`}
                >
                    New Requests
                </button>
            </div>

            {/* Search and Filters */}
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
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Custom
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaCalendarAlt />
                </button>
                <div className="relative">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <FaEllipsisV />
                    </button>
                    {/* Dropdown menu for bulk actions */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                        <div className="py-1">
                            <button
                                onClick={handleApproveAll}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Approve All
                            </button>
                            <button
                                onClick={handleDeclineAll}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Decline All
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Post
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Posted By
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedPosts.includes(post.id)}
                                            onChange={() => handleSelectPost(post.id)}
                                            className="rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img src={post.image} alt="post" className='w-20 h-12 rounded-lg mr-4' />
                                            <div className="text-sm text-gray-900 max-w-xs truncate">
                                                {post.title}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-white text-xs font-medium">{post.avatar}</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{post.postedBy}</div>
                                                <div className="text-sm text-gray-500">{post.venue}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {post.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            
                                            {activeTab === 'requests' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleDecline(post.id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-[2px] rounded-full" 
                                                        title="Decline"
                                                    >
                                                        Decline
                                                    </button>
                                                    <button 
                                                        onClick={() => handleApprove(post.id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-[2px] rounded-full" 
                                                        title="Approve"
                                                    >
                                                        Approve
                                                    </button>
                                                </>
                                            )}
                                            {activeTab === 'posts' && (
                                                <>
                                                <button 
                                                onClick={() => handleViewPost(post)}
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
                                                </>
                                            )}
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

            {/* Post Preview Modal */}
            {showPreviewModal && selectedPost && (
                <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold">Post Preview</h2>
                            <button 
                                onClick={() => setShowPreviewModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* User Information */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white text-sm font-medium">{selectedPost.avatar}</span>
                                </div>
                                <div>
                                    <div className="text-lg font-bold">{selectedPost.postedBy}</div>
                                    <div className="text-sm text-gray-500">{selectedPost.venue}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-semibold">{selectedPost.date}</div>
                                <div className="text-sm text-gray-500">03:20 PM</div>
                            </div>
                        </div>

                        {/* Main Content - Image */}
                        <div className="mb-6">
                           <img src={selectedPost.image} alt="" className='w-full h-64 rounded-lg' />
                        </div>

                        {/* Main Content - Text Description */}
                        <div className="mb-6">
                            <p className="text-gray-700 leading-relaxed">
                                Experience the epitome of luxury at the Oasis Mirage Resort in Dubai. This contemporary 
                                masterpiece offers an unforgettable experience with its stunning architecture and world-class 
                                amenities. Our spacious suites feature plush furnishings and state-of-the-art amenities, 
                                providing the perfect blend of comfort and sophistication. Enjoy panoramic views of the 
                                iconic Dubai skyline from your private balcony, and indulge in world-class dining options 
                                that showcase the finest international cuisine. For ultimate relaxation, visit our serene 
                                spa where expert therapists offer rejuvenating treatments using premium products. Whether 
                                you're seeking adventure or tranquility, the Oasis Mirage Resort provides the perfect 
                                backdrop for your dream vacation.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => setShowPreviewModal(false)}
                                className="flex-1 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowPreviewModal(false)}
                                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => {
                                    handleApprove(selectedPost.id);
                                    setShowPreviewModal(false);
                                }}
                                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posts; 