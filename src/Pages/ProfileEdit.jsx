import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { RxCross2 } from 'react-icons/rx';
import { selectUserProfile, updateUserProfileAsync } from '../features/Auth/authSlice';

const ProfileEdit = ({ setModal }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);

  const [formData, setFormData] = useState({
    gender: "",
    name: "",
    email: "",

  });

  useEffect(() => {
    if (profile) {
      setFormData({
        gender: profile?.gender || "",
        name: profile?.name || "",
        email: profile?.email || "",
        mobile_number: profile?.mobile_number 
      });
    }
  }, [profile]);

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // dispatch(updateUserProfileAsync(formData));
    setModal();
  };

  return (
    <div className="grid md:grid-cols-2 font-Raleway place-content-center md:h-full h-[50vh]">
      <div className="absolute right-0">
        <motion.button
          whileHover={{
            rotate: -90,
          }}
          whileTap={{ scale: 0.85 }}
          className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
          onClick={setModal}
        >
          <RxCross2 className="text-primary-color" />
        </motion.button>
      </div>
      <div>
        <img
          src="https://i.pinimg.com/564x/a1/d6/bb/a1d6bbdecee9432034f3a224eba4aed9.jpg"
          alt=""
          className="rounded-l-lg h-full hidden md:block"
        />
      </div>
      <div className="flex flex-col gap-5 items-center justify-center p-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold text-primary-color">Edit User Details</h1>
          <p className="text-sm text-primary-color font-semibold">
            Welcome back, Please fill the fields you want to edit.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <select
              className="p-3 border rounded-md w-full focus:border-red-500 focus:ring-red-500 outline-none"
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Title</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Others</option>
            </select>
          </div>
          <div>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border rounded-md w-full focus:border-red-500 focus:ring-red-500 outline-none"
              placeholder="Enter Full Name"
            />
          </div>
          <div className="flex items-center justify-center gap-5">
            <label
              htmlFor="mobile"
              className="p-3 border flex items-center gap-2 rounded-md cursor-not-allowed bg-gray-200"
            >
              +91
              <IoIosArrowDown />
            </label>
            <input
              id="mobile"
              type="tel"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              className="p-3 border rounded-md w-full outline-none bg-gray-200 placeholder:font-semibold cursor-not-allowed"
              placeholder="Enter your Mobile Number"
              readOnly
            />
          </div>
          <div>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded-md w-full focus:border-red-500 focus:ring-red-500 outline-none"
              placeholder="Enter Email Address"
            />
          </div>
          <p className="text-center text-sm text-gray-500">
            By continuing, I agree to{" "}
            <span className="text-primary-color font-semibold">Terms of Use</span> &{" "}
            <span className="text-primary-color font-semibold">Privacy Policy</span>.
          </p>
          <div className="flex justify-center items-center">
            <button type="submit" className="p-3 w-1/2 bg-primary-color text-white rounded-md hover:bg-red-700">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;