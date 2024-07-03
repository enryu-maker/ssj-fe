import React, { useEffect } from 'react';
import { NavLink, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import MyOrders from './MyOrders';
import WishList from './WishList';

const Dashboard = () => {

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <nav className="w-full md:w-1/4 bg-white p-6 border-b md:border-r">
        <h2 className="text-xl font-semibold mb-6">My Account</h2>
        <div className="space-y-4">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `block text-lg font-medium rounded-md p-3 transition-colors duration-300 ${isActive ? 'bg-secondary-color text-gray-500' : 'text-gray-800 hover:bg-secondary-color hover:text-white'}`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) =>
              `block text-lg font-medium rounded-md p-3 transition-colors duration-300 ${isActive ? 'bg-secondary-color text-gray-500' : 'text-gray-800 hover:bg-secondary-color hover:text-white'}`
            }
          >
            Order History
          </NavLink>
          <NavLink
            to="/dashboard/wishlist"
            className={({ isActive }) =>
              `block text-lg font-medium rounded-md p-3 transition-colors duration-300 ${isActive ? 'bg-secondary-color text-gray-500' : 'text-gray-800 hover:bg-secondary-color hover:text-white'}`
            }
          >
            Wishlist
          </NavLink>
        </div>
      </nav>
      <main className="flex-1 p-6 md:p-10">
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
