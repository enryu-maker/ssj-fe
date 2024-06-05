import { IoIosArrowDown } from "react-icons/io";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import OTP from "./OTP";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync, selectLoggedInUser, selectAuthError } from "../features/Auth/authSlice";

function Login({ setModal }) {
  const [openOtp, setOpenOtp] = useState(false);
  const [inputNum, setInputNum] = useState("");
  

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const authError = useSelector(selectAuthError);

  const handleChange = (e) => {
    setInputNum(e.target.value.trim());
  };

  const handleModal = () => {
    setOpenOtp(!openOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullNumber = `+91${inputNum}`;
    dispatch(createUserAsync({ mobile_number: fullNumber })).then((result) => {
      if (result.type === 'auth/createUser/fulfilled') {
        handleModal();
      } 
    });
  };

  return (
    <>
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
        <div className="">
          <img
            src="https://i.pinimg.com/564x/8c/98/d0/8c98d0fdb7e0da43f8ad707c4168562e.jpg"
            alt=""
            className="rounded-l-lg hidden md:block"
          />
        </div>
        <div className="flex flex-col gap-5 items-center justify-center p-5">
          <h1 className="text-3xl font-semibold text-primary-color">
            Login Or Signup
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-5">
              <label
                htmlFor="number"
                className="p-3 border flex items-center gap-2 rounded-md hover:border-red-500 cursor-pointer"
              >
                +91
                <IoIosArrowDown />
              </label>
              <input
                id="number"
                type="tel"
                value={inputNum}
                onChange={handleChange}
                className="p-3 border rounded-md w-full focus:border-red-500 focus:ring-red-500 outline-none"
                placeholder="Enter your Mobile Number"
              />
            </div>
            
            {authError && (
              <p className="text-sm text-center text-red-500">{authError}</p>
            )}
            <p className="text-center text-sm text-gray-500">
              By continuing, I agree to{" "}
              <span className="text-primary-color font-semibold">
                Terms of Use
              </span>{" "}
              &{" "}
              <span className="text-primary-color font-semibold">
                Privacy Policy.
              </span>
            </p>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="p-2 bg-primary-color text-white rounded-md"
              >
                Request OTP
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Otp */}
      {openOtp ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-10 inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              <div className="rounded-lg shadow-lg bg-white outline-none focus:outline-none">
                <div className="relative flex-auto">
                  <OTP setModal={handleModal} number={`+91${inputNum}`} />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </>
  );
}

export default Login;
