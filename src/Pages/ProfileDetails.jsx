import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import { fetchUserProfile, selectUser, signOutUser, updateUserProfile } from "../features/Auth/authSlice";

const ProfileDetails = ({ setModal }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile ? profile.name : '');
  const [email, setEmail] = useState(profile ? profile.email : '');
  const [mobile, setMobile] = useState(profile ? profile.mobile : '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(profile ? profile.photo : '');

  useEffect(() => {
    dispatch(fetchUserProfile()); // Fetch user details when component mounts
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setMobile(profile.mobile);
      setImagePreview(profile.photo);
    }
  }, [profile]);

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedProfile = { name, email, mobile, photo: imagePreview };
    // dispatch(updateUserProfile(updatedProfile));
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset fields to original profile data
    setName(profile.name);
    setEmail(profile.email);
    setMobile(profile.mobile);
    setImagePreview(profile.photo);
  };

  if (!profile) {
    return null; // Render nothing if profile data is not available yet
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        exit={{ x: "100%", transition: { ease: "easeInOut" } }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile Details</h2>
          <button onClick={setModal}>
            <IoClose className="text-gray-500 cursor-pointer text-2xl" />
          </button>
        </div>
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-full border-4 border-white w-32 h-32 mx-auto">
            <img
              src={imagePreview}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                style={{ width: '100%', height: '100%', top: 0, left: 0, position: 'absolute' }}
              />
            )}
          </div>
          <div className="flex flex-col gap-4 items-center justify-center px-4 md:px-6 py-4 md:py-6">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md"
                  placeholder="Name"
                />
                <div className="border border-gray-300 p-2 w-full rounded-md bg-gray-100 text-gray-700 cursor-not-allowed">
                  <span>{email}</span>
                </div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md"
                  placeholder="Mobile"
                />
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-primary-color text-white px-4 py-2 rounded-md shadow-lg hover:bg-primary-color-dark transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md shadow-lg hover:bg-gray-400 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <motion.h1
                  className="text-2xl md:text-3xl font-semibold text-primary-color"
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
                  Name: <span className="text-black">{name}</span>
                </motion.h1>
                <motion.h1
                  className="text-xl text-primary-color"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  Email: <span className="text-black">{email}</span>
                </motion.h1>
                <motion.h1
                  className="text-xl text-primary-color"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  Mobile: <span className="text-black">{mobile}</span>
                </motion.h1>
                <div className="flex gap-4 mt-4">
                  <motion.button
                    className="flex items-center gap-2 uppercase bg-primary-color text-white rounded-md p-2 shadow-lg hover:bg-primary-color-dark transition duration-300"
                    onClick={handleEdit}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Edit
                    <LiaUserEditSolid className="text-xl md:text-2xl" />
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 uppercase bg-primary-color text-white rounded-md p-2 shadow-lg hover:bg-primary-color-dark transition duration-300"
                    onClick={handleLogout}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Logout
                    <IoLogOutOutline className="text-xl md:text-2xl" />
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileDetails;
