import { motion } from "framer-motion";
import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { fetchUserDetails, selectUser, signOutUser } from "../features/Auth/authSlice";


const ProfileDetails = ({ setModal }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUserDetails()); // Fetch user details when component mounts
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
          <div>
              <img
                src={profile?.photoURL}
                alt="Profile"
                className="md:rounded-l-lg md:rounded-t-none rounded-t-lg h-full w-full  object-cover"
              />

          </div>
          <div className="flex flex-col gap-5 items-center justify-center px-5 py-10">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-semibold text-primary-color">
                Profile Details
              </h1>
            </div>
            <div className="flex flex-col gap-10 justify-center">
              <h1 className="text-2xl text-primary-color">
                Name: <span className="text-black">{profile?.displayName}</span>
              </h1>
            
              <h1 className="text-2xl text-primary-color">
                Email: <span className="text-black">{profile?.email}</span>
              </h1>
             
            </div>
            <div className="flex justify-around w-full mt-5">
              <button
                className="flex items-center gap-2 uppercase bg-primary-color text-white rounded-md p-2"
                onClick={handleLogout}
              >
                Logout
                <IoLogOutOutline className=" text-2xl" />
              </button>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default ProfileDetails;
