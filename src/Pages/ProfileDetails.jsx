import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { fetchUserProfile, selectUser, signOutUser, updateUserProfile } from "../features/Auth/authSlice";
import Avatar from '../assets/avatar.jpeg'; // Default fallback image
import Spinner from '../Components/Spinner';

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [panCard, setPanCard] = useState('');
  const [address, setAddress] = useState('');
  const [gst, setGst] = useState('');
  const [imagePreview, setImagePreview] = useState(Avatar); // Default to Avatar
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setMobile(profile.mobile_number || '');
      setPanCard(profile.pan_no || '');
      setAddress(profile.address || '');
      setGst(profile.gst_no || '');
      setImagePreview(profile.photo ? `https://api.saishraddhajewellers.com${profile.photo}` : Avatar);
    }
  }, [profile]);

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedProfile = { 
      name, 
      photo: imagePreview, 
      address, 
      pan_no: panCard, 
      gst_no: gst, 
      mobile_number: mobile 
    };
    dispatch(updateUserProfile(updatedProfile));
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(profile.name || '');
    setEmail(profile.email || '');
    setMobile(profile.mobile_number || '');
    setPanCard(profile.pan_no || '');
    setAddress(profile.address || '');
    setGst(profile.gst_no || '');
    setImagePreview(profile.photo ? `https://api.saishraddhajewellers.com${profile.photo}` : Avatar);
  };

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center pt-12 px-4 md:px-8 lg:px-12">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Image Section */}
          <div className="flex justify-center items-center">
            <div className="relative flex items-center justify-center overflow-hidden rounded-full border-4 border-primary-color w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-gray-200">
              {isLoading ? (
                <Spinner />
              ) : (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => e.target.src = Avatar}
                />
              )}
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-40 rounded-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                  />
                  <LiaUserEditSolid className="text-3xl text-white" />
                </label>
              )}
            </div>
          </div>
          {/* Profile Details Section */}
          <div className="flex flex-col justify-center">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300 mb-4"
                  placeholder="Name"
                />
                <div className="border border-gray-300 p-3 w-full rounded-md bg-gray-100 text-gray-700 mb-4">
                  <span>{email}</span>
                </div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300 mb-4"
                  placeholder="Mobile"
                />
                <input
                  type="text"
                  value={panCard}
                  onChange={(e) => setPanCard(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300 mb-4"
                  placeholder="PAN Card"
                />
                <input
                  type="text"
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300 mb-4"
                  placeholder="GST"
                />
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300 mb-4"
                  placeholder="Address"
                />
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="bg-primary-color text-white px-4 py-2 rounded-md hover:bg-primary-color-dark transition-colors duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-color mb-2">
                  {name}
                </h1>
                <h2 className="text-sm md:text-md lg:text-lg text-gray-700 mb-2">
                  Email: <span className="font-semibold">{email}</span>
                </h2>
                {mobile && (
                  <h2 className="text-sm md:text-md lg:text-lg text-gray-700 mb-2">
                    Mobile: <span className="font-semibold">{mobile}</span>
                  </h2>
                )}
                {panCard && (
                  <h2 className="text-sm md:text-md lg:text-lg text-gray-700 mb-2">
                    PAN Card: <span className="font-semibold">{panCard}</span>
                  </h2>
                )}
                {address && (
                  <h2 className="text-sm md:text-md lg:text-lg text-gray-700 mb-2">
                    Address: <span className="font-semibold">{address}</span>
                  </h2>
                )}
                {gst && (
                  <h2 className="text-sm md:text-md lg:text-lg text-gray-700 mb-2">
                    GST: <span className="font-semibold">{gst}</span>
                  </h2>
                )}
                <div className="flex flex-col md:flex-row gap-4 mt-6 text-center">
                  <button
                    onClick={handleEdit}
                    className="bg-primary-color text-white  px-4 py-2 rounded-md hover:bg-primary-color-dark transition-colors duration-300 flex items-center"
                  >
                    Edit
                    <LiaUserEditSolid className="ml-2 text-lg" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center"
                  >
                    Logout
                    <IoLogOutOutline className="ml-2 text-lg" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
