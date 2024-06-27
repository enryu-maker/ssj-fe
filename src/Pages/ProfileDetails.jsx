import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { fetchUserProfile, selectUser, signOutUser } from "../features/Auth/authSlice";

const ProfileDetails = ({ setModal }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUserProfile()); // Fetch user details when component mounts
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  if (!profile) {
    return null; // Render nothing if profile data is not available yet
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        className="bg-white rounded-lg p-8 max-w-md w-full"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        exit={{ x: "100%", transition: { ease: "easeInOut" } }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile Details</h2>
          <button onClick={setModal}>
            <IoClose className="text-gray-500 cursor-pointer" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-full border-4 border-white">
            <img
              src={profile.photo}
              alt="Profile"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col gap-5 items-center justify-center px-5 py-10">
            <motion.h1
              className="text-3xl font-semibold text-primary-color"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Profile Details
            </motion.h1>
            <motion.h1
              className="text-xl text-primary-color"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Name: <span className="text-black">{profile.name}</span>
            </motion.h1>
            <motion.h1
              className="text-xl text-primary-color"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Email: <span className="text-black">{profile.email}</span>
            </motion.h1>
            <motion.button
              className="flex items-center gap-2 uppercase bg-primary-color text-white rounded-md p-2"
              onClick={handleLogout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Logout
              <IoLogOutOutline className="text-2xl" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileDetails;
