import React from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBoxOpen, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ProfileDetails from './ProfileDetails';
import MyOrders from './MyOrders';
import WishList from './WishList';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../features/Auth/authSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOutUser());
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <nav className="w-full md:w-1/4 bg-white p-6 border-b md:border-r">
        <h2 className="text-xl font-semibold mb-6">My Account</h2>
        <div className="space-y-4">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium rounded-md p-3 transition-colors duration-300 ${isActive ? 'bg-secondary-color text-slate-500' : 'text-gray-800 hover:bg-secondary-color hover:text-slate-500'}`
            }
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Overview
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium rounded-md p-3 transition-colors duration-300 ${isActive ? 'bg-secondary-color text-slate-500' : 'text-gray-800 hover:bg-secondary-color hover:text-slate-500'}`
            }
          >
            <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
            Order History
          </NavLink>
          <NavLink
            to="/dashboard/wishlist"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium rounded-md p-3 transition-colors duration-300 ${isActive ? 'bg-secondary-color text-slate-500' : 'text-gray-800 hover:bg-secondary-color hover:text-slate-500'}`
            }
          >
            <FontAwesomeIcon icon={faHeart} className="mr-2" />
            Wishlist
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-lg font-medium rounded-md p-3 transition-colors duration-300 text-gray-800 hover:bg-secondary-color hover:text-slate-500"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
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
