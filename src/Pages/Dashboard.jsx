import React from 'react';
import { NavLink, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import MyOrders from './MyOrders';
import WishList from './WishList';

const Dashboard = () => {
  const match = useMatch('/dashboard/*');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (match.isExact) {
      navigate('/dashboard/profile');
    }
  }, [match, navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <nav className="w-full md:w-64 bg-white shadow-md p-4 md:p-6 border-b md:border-r">
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          <button
            type="button"
            className="text-gray-800 hover:text-primary-color md:hidden"
            onClick={() => document.getElementById('sidebar').classList.toggle('hidden')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div id="sidebar" className="space-y-4 md:space-y-6">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `block text-gray-800 hover:text-primary-color text-lg font-medium ${isActive ? 'text-primary-color font-semibold' : ''}`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) =>
              `block text-gray-800 hover:text-primary-color text-lg font-medium ${isActive ? 'text-primary-color font-semibold' : ''}`
            }
          >
            My Orders
          </NavLink>
          <NavLink
            to="/dashboard/wishlist"
            className={({ isActive }) =>
              `block text-gray-800 hover:text-primary-color text-lg font-medium ${isActive ? 'text-primary-color font-semibold' : ''}`
            }
          >
            Wishlist
          </NavLink>
        </div>
      </nav>
      <main className="flex-1 p-4 md:p-6">
        <Routes>
          <Route path="profile" element={<ProfileDetails />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="/" element={<ProfileDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
