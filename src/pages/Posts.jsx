import React, { useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { FiUpload } from 'react-icons/fi';
import { IoSearchSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

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
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Explore the vibrant cityscape and Russian culture at the St. Petersburg Urban Hotel.',
    location: 'Dubai, UAE',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'Discover the beauty of Russian architecture at the Winter Palace Hotel.',
    location: 'Dubai, UAE',
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Enjoy the luxury and comfort of the Volga Bay Resort, where every stay is memorable.',
    location: 'Dubai, UAE',
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'Experience the grandeur of the Russian Imperial Hotel, a true icon of elegance.',
    location: 'Dubai, UAE',
  },
];

const approvalPendingPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Experience the charm of the Alpine Retreat, where every peak tells a story of adventure and serenity...',
    user: {
      name: 'John Anderson',
      org: 'Mountain Escape Lodge',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    date: '2023-03-10',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'Unwind at the Tropical Oasis, where lush landscapes and crystal-clear waters set the perfect backdrop...',
    user: {
      name: 'Jessica Lee',
      org: 'Island Retreat',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    date: '2023-06-15',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Savor the unique blend of history and luxury at the Urban Heritage Hotel, where every corner is a work of art...',
    user: {
      name: 'David Martinez',
      org: 'Cityscape Suites',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    date: '2023-07-25',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'Enjoy the rustic elegance of the Prairie Farmhouse, where tradition meets modern comfort...',
    user: {
      name: 'Michael Smith',
      org: 'Country Charm Inn',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
    date: '2023-05-20',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Embrace the tranquility at the Zen Garden Resort, where mindfulness and nature coexist in harmony...',
    user: {
      name: 'Laura Wilson',
      org: 'Peaceful Retreat',
      avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
    },
    date: '2023-08-10',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'Revel in the vibrant culture at the Mediterranean Coast Haven, where sun-kissed days await...',
    user: {
      name: 'Emily Chen',
      org: 'Seaside Sanctuary',
      avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
    },
    date: '2023-04-05',
  },
];

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

const PAGE_SIZE = 6;

const Posts = () => {
  const [tab, setTab] = useState('Posts');
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Pagination logic for approval pending
  const totalRows = approvalPendingPosts.length;
  const totalPages = Math.ceil(totalRows / PAGE_SIZE);
  const paginatedPosts = approvalPendingPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Posts</h1>
        <button
          className="bg-black text-white rounded-lg px-6 py-2 font-semibold shadow hover:bg-gray-900"
          onClick={() => setModalOpen(true)}
        >
          + Add New Post
        </button>
      </div>
      <div className="flex gap-2 my-4">
        <button onClick={() => setTab('Posts')} className={`px-6 py-2 rounded-lg text-sm font-semibold ${tab === 'Posts' ? 'bg-black text-white' : 'bg-[#dadada] text-black'}`}>Posts</button>
        <button onClick={() => setTab('Approval Pending')} className={`px-6 py-2 rounded-lg text-sm font-semibold ${tab === 'Approval Pending' ? 'bg-black text-white' : 'bg-[#dadada] text-black'}`}>Approval Pending</button>
      </div>
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="relative w-2/3">
          <input type="text" placeholder="Search" className="flex-1 px-4 ps-10 py-2 rounded-lg border border-gray-200 bg-[#dadada] focus:outline-none w-full" />
          <IoSearchSharp className='absolute top-[13px] left-3 text-gray-500' />
        </div>
        <button className="bg-white shadow-sm px-4 text-sm items-center p-2 rounded-lg flex justify-between gap-10">Custom <BiCalendar className='text-base' /></button>
      </div>
      {tab === 'Approval Pending' ? (
        <div className="bg-white rounded-lg overflow-hidden shadow-md w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#181C2A] text-white">
                <th className="py-4 px-4 text-left font-semibold"><input type="checkbox" /></th>
                <th className="py-4 px-4 text-left font-semibold">Post</th>
                <th className="py-4 px-4 text-left font-semibold">Posted By</th>
                <th className="py-4 px-4 text-left font-semibold">Date</th>
                <th className="py-4 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.map((post) => (
                <tr key={post.id} className="border-b border-gray-300 last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 px-4"><input type="checkbox" /></td>
                  <td className="py-4 px-4 flex items-center gap-3">
                    <img src={post.image} alt="" className="w-20 h-14 rounded-md object-cover" />
                    <span>{post.title}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <img src={post.user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold leading-4">{post.user.name}</div>
                        <div className="text-xs text-gray-400 leading-4">{post.user.org}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 w-32">{post.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">

                    <button title="View" onClick={() => navigate(`/post/${post.id}`)}><FiEye className="text-gray-600 hover:text-black" /></button>
                    <button title="Edit"><FiEdit2 className="text-gray-600 hover:text-black" /></button>
                    <button title="Delete"><FiTrash2 className="text-red-500 hover:text-red-700" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-4 bg-white border-t">
            <div className="text-xs text-gray-500">Rows per page
              <select className="ml-2 border rounded px-1 py-0.5 text-xs">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span className="ml-2">of {totalRows} rows</span>
            </div>
            <div className="flex items-center gap-1">
              <button disabled={page === 1} onClick={() => setPage(1)} className="px-2 py-1 rounded disabled:opacity-50">&laquo;</button>
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-2 py-1 rounded disabled:opacity-50">&lsaquo;</button>
              {[...Array(totalPages).keys()].slice(Math.max(0, page-2), Math.min(totalPages, page+1)).map(i => (
                <button key={i+1} onClick={() => setPage(i+1)} className={`px-2 py-1 rounded ${page === i+1 ? 'bg-black text-white' : ''}`}>{i+1}</button>
              ))}
              <span className="px-2">...</span>
              <button onClick={() => setPage(totalPages)} className="px-2 py-1 rounded">{totalPages}</button>
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-2 py-1 rounded disabled:opacity-50">&rsaquo;</button>
              <button disabled={page === totalPages} onClick={() => setPage(totalPages)} className="px-2 py-1 rounded disabled:opacity-50">&raquo;</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map(post => (
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
      )}
      <AddPostModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Posts; 