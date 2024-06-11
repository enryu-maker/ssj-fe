import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfileAsync,
  logout,
  selectAuthError,
  selectIsLoading,
  selectUserProfile,
} from "../features/Auth/authSlice";
import FemaleImg from "../assets/Female.jpeg";
import maleImg from "../assets/male.jpg";
import ProfileEdit from "./ProfileEdit";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoLogOutOutline } from "react-icons/io5";

const ProfileDetails = ({ setModal }) => {
  const [OpenEditForm, setEditForm] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchUserProfileAsync());
  }, [dispatch]);

  const handleModal = () => {
    setEditForm(!OpenEditForm);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile data</div>;
  }

  return (
    <>
      {OpenEditForm ? (
        <div>
          {profile && (
            <ProfileEdit setModal={setModal} />
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 font-Raleway place-content-center md:h-full h-[50vh]">
          <div className="absolute right-0">
            <motion.button
              whileHover={{ rotate: -90 }}
              whileTap={{ scale: 0.85 }}
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={setModal}
            >
              <RxCross2 className="text-primary-color" />
            </motion.button>
          </div>
          <div>
            {profile.gender === "Female" ? (
              <img
                src={FemaleImg}
                alt=""
                className="rounded-l-lg h-full hidden md:block object-cover"
              />
            ) : (
              <img
                src={maleImg}
                alt=""
                className="rounded-l-lg h-full hidden md:block object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-5 items-center justify-center px-5 py-10">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-semibold text-primary-color">
                Profile Details
              </h1>
            </div>
            <div className="flex flex-col gap-10 justify-center">
              <h1 className="text-2xl text-primary-color">
                Name: <span className="text-black">{profile?.name}</span>
              </h1>
              <h1 className="text-2xl text-primary-color">
                Gender: <span className="text-black">{profile?.gender}</span>
              </h1>
              <h1 className="text-2xl text-primary-color">
                Email: <span className="text-black">{profile?.email}</span>
              </h1>
              <h1 className="text-2xl text-primary-color">
                Mobile:{" "}
                <span className="text-black">{profile?.mobile_number}</span>
              </h1>
            </div>
            <div className="flex justify-around w-full mt-5">
              <button
                className="flex items-center gap-2 uppercase bg-primary-color text-white rounded-md p-2"
                onClick={handleModal}
              >
                Edit
                <LiaUserEditSolid className=" text-2xl" />
              </button>
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
      )}
    </>
  );
};

export default ProfileDetails;
