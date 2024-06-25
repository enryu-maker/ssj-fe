import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
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
    <>
      <div className="grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 font-Raleway place-content-center md:h-full h-[60vh]">
        {/* Close Button with Rotation Animation */}
        <div className="absolute right-0">
          <motion.button
            whileHover={{ rotate: -90 }}
            whileTap={{ scale: 0.85 }}
            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={setModal}
          >
            <RxCross2 className="md:text-primary-color text-red-500" />
          </motion.button>
        </div>

        {/* Profile Image with Scale Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={profile?.photo}
            alt="Profile"
            className="md:rounded-l-lg md:rounded-t-none rounded-t-lg h-full w-full object-cover"
          />
        </motion.div>

        {/* Profile Details with Fade-in Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col gap-5 items-center justify-center px-5 py-10"
        >
          <div className="flex flex-col items-center justify-center">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-3xl font-semibold text-primary-color"
            >
              Profile Details
            </motion.h1>
          </div>
          <div className="flex flex-col gap-10 justify-center">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-2xl text-primary-color"
            >
              Name: <span className="text-black">{profile?.name}</span>
            </motion.h1>
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-2xl text-primary-color"
            >
              Email: <span className="text-black">{profile?.email}</span>
            </motion.h1>
          </div>

          {/* Logout Button with Scale Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-around w-full mt-5"
          >
            <button
              className="flex items-center gap-2 uppercase bg-primary-color text-white rounded-md p-2"
              onClick={handleLogout}
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Logout
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoLogOutOutline className="text-2xl" />
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ProfileDetails;
