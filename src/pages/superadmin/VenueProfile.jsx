import React, { useState } from 'react';
import { FiEdit2, FiUpload } from 'react-icons/fi';
import { BiDotsVertical } from 'react-icons/bi';
import { IoDocumentTextSharp } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000080] bg-opacity-90">
            <img src={src} alt="Profile header" className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-lg" />
            <button onClick={onClose} className="absolute top-8 right-8 text-white text-3xl font-bold">&times;</button>
        </div>
    );
}

function AddPostModal({ open, onClose }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000080]">
            <div className="bg-white rounded-2xl p-8 pt-6 w-full max-w-3xl relative">
                <button onClick={onClose} className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-black">&times;</button>
                <h2 className="text-2xl font-bold mb-6">Add New Post</h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-full h-48 bg-[#dadada] rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-400 cursor-pointer">
                            <FiUpload className='text-3xl text-gray-500' />
                            <span className="text-gray-500">Drop your file here</span>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Description</label>
                            <textarea className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Write description" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Discount (Optional)</label>
                            <input className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="25%" />
                        </div>
                        <div className="flex gap-4 justify-end mt-8">
                            <button onClick={onClose} className="px-8 py-2 rounded-lg bg-[#dadada] text-black font-semibold">Cancel</button>
                            <button className="px-8 py-2 rounded-lg bg-black text-white font-semibold">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const revenueChart = {
    series: [
        {
            name: 'Income',
            data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
        },
        {
            name: 'Expenses',
            data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
        },
    ],
    options: {
        chart: {
            height: 325,
            type: 'area',
            fontFamily: 'Nunito, sans-serif',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },

        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            curve: 'smooth',
            width: 2,
            lineCap: 'square',
        },
        dropShadow: {
            enabled: true,
            opacity: 0.2,
            blur: 10,
            left: -7,
            top: 22,
        },
        colors: ['#0073B6', '#000'],
        markers: {
            discrete: [
                {
                    seriesIndex: 0,
                    dataPointIndex: 6,
                    fillColor: '#0073B6',
                    strokeColor: 'transparent',
                    size: 7,
                },
                {
                    seriesIndex: 1,
                    dataPointIndex: 5,
                    fillColor: '#000',
                    strokeColor: 'transparent',
                    size: 7,
                },
            ],
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                show: true,
            },
            labels: {
                offsetX: 0,
                offsetY: 5,
                style: {
                    fontSize: '12px',
                    cssClass: 'apexcharts-xaxis-title',
                },
            },
        },
        yaxis: {
            tickAmount: 7,
            labels: {
                formatter: (value) => {
                    return value / 1000 + 'K';
                },
                offsetX: -10,
                offsetY: 0,
                style: {
                    fontSize: '12px',
                    cssClass: 'apexcharts-yaxis-title',
                },
            },
            opposite: false,
        },
        grid: {
            borderColor: '#E0E6ED',
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '16px',
            markers: {
                width: 10,
                height: 10,
                offsetX: -2,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 5,
            },
        },
        tooltip: {
            marker: {
                show: true,
            },
            x: {
                show: false,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: !1,
                opacityFrom: 0.28,
                opacityTo: 0.05,
                stops: [45, 100],
            },
        },
    },
};

const pieChartData = {
    series: [8, 34, 12, 18, 15, 5],
    options: {
        chart: {
            type: 'pie',
            height: 350,
            fontFamily: 'Nunito, sans-serif',
        },
        labels: ['Like', 'Share', 'Map', 'Drop-Off', 'Book', 'Deal'],
        colors: [
            '#8e7cf0', // Like
            '#ff8b8b', // Share
            '#3ecf8e', // Map
            '#ffb547', // Drop-Off
            '#4f8cff', // Book
            '#3edfa0', // Deal
        ],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            markers: {
                width: 10,
                height: 10,
                offsetX: -2,
            },
            itemMargin: {
                horizontal: 8,
                vertical: 0,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(0) + '%';
            },
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + '%';
                },
            },
        },
    },
};

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

const VenueProfile = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [addPostModalOpen, setAddPostModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Detail');
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
                <div className="absolute left-20 -bottom-12 right-20 bg-white rounded-xl shadow flex items-center justify-between gap-4 px-8 py-4">
                    <div className='flex items-center gap-4'>

                        <img src={profile.avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow" />
                        <div>
                            <div className="font-semibold text-[16px] mb-1">{profile.name}</div>
                            <div className="text-gray-500 text-sm">{profile.org}</div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => setActiveTab('Detail')}
                            className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Detail'
                                ? 'bg-black text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                        >
                            Detail
                        </button>
                        <button
                            onClick={() => setActiveTab('Stats')}
                            className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Stats'
                                ? 'bg-black text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                        >
                            Stats
                        </button>
                        <button
                            onClick={() => setActiveTab('Posts')}
                            className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Posts'
                                ? 'bg-black text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                        >
                            Posts
                        </button>
                        <BiDotsVertical className='text-4xl cursor-pointer bg-[#ebedf0] p-2 rounded-md' onClick={() => setShowOptions(!showOptions)} />
                        {showOptions && <div className='absolute top-20 right-0 bg-white rounded-xl shadow-md p-3 px-4 text-sm'>
                            <p className='cursor-pointer'>Edit Details</p>
                            <p className='cursor-pointer pt-1' onClick={() => setAddPostModalOpen(true)}>Add Post</p>
                            <p className='cursor-pointer py-1'>Suspend</p>
                            <p className='cursor-pointer'>Delete</p>
                        </div>}
                    </div>
                </div>
            </div>
            <div className='h-16' />
            {activeTab === 'Detail' && (
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
                </div>)}
            {activeTab === 'Stats' && (
                <div>
                    <div className="flex gap-4 flex-wrap">
                        {/* Watch Statics */}
                        <div className="flex-1 min-w-[320px] bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between">

                                <div className="font-semibold text-lg mb-3">Watch Statics</div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-300 px-3 py-1 text-xs rounded-full">Weekly</div>
                                    <div className="bg-black text-white px-3 py-1 text-xs rounded-full">Monthly</div>
                                    <div className="bg-gray-300 px-3 py-1 text-xs rounded-full">Yearly</div>
                                </div>
                            </div>
                            {/* Chart Placeholder */}
                            <div className="panel h-full xl:col-span-2 mt-8">
                                <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={250} />
                                <div className="flex justify-between text-base pt-6 mt-4 border-t border-gray-400 w-full">
                                    <div className='flex gap-16 items-center w-1/2'>
                                        <div className='flex items-center gap-6'>
                                            <IoDocumentTextSharp className='text-xl' />
                                            <p className='text-gray-600 text-sm'>Average Watch <br /> Time</p>
                                        </div>
                                        <p className='text-3xl font-semibold'>300 <span className='text-xl'>Mins</span></p>
                                    </div>
                                    <div className='flex gap-16 items-center w-1/2'>
                                        <div className='flex items-center gap-6'>
                                            <FaHeart className='text-xl' />
                                            <p className='text-gray-600 text-sm'>Total Number of  <br /> Likes</p>
                                        </div>
                                        <p className='text-3xl font-semibold'>300K</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Clicks Statics */}
                        <div className="flex-1 min-w-[240px] max-w-[400px] bg-white rounded-xl p-6 shadow-sm">
                            <div className="font-semibold text-lg">Clicks Statics</div>
                            <div className="rounded-lg flex items-center justify-center text-gray-400 h-full -mt-4">
                                <ReactApexChart series={pieChartData.series} options={pieChartData.options} type="pie" height={300} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'Posts' && (
                <div>
                    <div className="flex gap-4 w-full">
                        <div className='w-[75%]'>
                            <h2 className="text-xl font-bold mb-4">Posts</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <div className='w-[25%]'>
                            <h2 className="text-xl font-bold mb-4">Trending Posts</h2>
                            {posts.map((post) => (
                                    <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md flex p-3 border border-gray-200 mb-4">
                                        <img src={post.image} alt="Post" className="rounded-xl w-20 h-20 object-cover me-4" />
                                            <div className="text-sm mb-2">{post.title.slice(0, 80)}...</div>
                                        {/* <div className="pt-2 flex flex-col flex-1">
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="text-xs text-gray-500 mb-2">{post.location}</div>
                                                <button className="bg-black text-white rounded-lg px-4 py-2 text-xs cursor-pointer" onClick={() => navigate(`/post/${post.id}`)}>View Details</button>
                                            </div>
                                        </div> */}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
            <ImageModal open={modalOpen} src={profile.header} onClose={() => setModalOpen(false)} />
            <AddPostModal open={addPostModalOpen} onClose={() => setAddPostModalOpen(false)} />
        </div>
    );
};

export default VenueProfile; 