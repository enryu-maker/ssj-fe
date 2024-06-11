import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import {
  IoCartOutline,
  IoHeartOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DailyWear from "../assets/EarringsIcon.svg";
import Logo from "../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectIsAuthenticated,
  selectLoggedInUser,
} from "../features/Auth/authSlice";
import Login from "../Pages/Login";
import LoginDetails from "../Pages/LoginDetails";
import { HiOutlineUser } from "react-icons/hi2";

function MobileHeader() {
  const [openNavModal, setNavModal] = useState(false);
  const [LoginModal, setLoginModal] = useState(false);
  const [openDetailPage, setDetailPage] = useState(false);

  const handleNavModal = () => {
    setNavModal(!openNavModal);
  };
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const ProfileCompleted = sessionStorage.getItem("is_complete");

  const handleLogout = () => {
    dispatch(logout());
  };

  const HandleModal = () => {
    setLoginModal(!LoginModal);
  };

  const handleDetailModal = () => {
    setDetailPage(!openDetailPage);
  };

  return (
    <>
      <div className="font-Raleway sticky top-0 z-50 bg-secondary-color py-2">
        <div className="flex items-center justify-between p-5 bg-secondary-color">
          <div className="flex items-center gap-2">
            <button onClick={handleNavModal}>
              <CiMenuFries className="w-6 h-6 cursor-pointer" />
            </button>
            <Link to={"/"}>
              <img src={Logo} alt="Logo" className="w-20 h-20" />
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <Link
              to="/dailywear"
              className="flex flex-col items-center text-primary-color text-sm transition-all ease-linear hover:scale-110"
            >
              <img src={DailyWear} alt="" className="w-6 h-6" />
            </Link>
            <Link
              to="/stores"
              className="flex flex-col items-center text-primary-color text-sm transition-all ease-linear hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>
            </Link>

            <Link
              to="#/"
              className="flex flex-col items-center text-primary-color text-sm transition-all ease-linear hover:scale-110"
            >
              <IoHeartOutline className="w-6 h-6" />
            </Link>
            <Link
              to="/cart"
              className="flex flex-col items-center text-primary-color text-sm transition-all ease-linear hover:scale-110 relative"
            >
              <IoCartOutline className="w-6 h-6" />
              <span className="absolute left-5 -top-2 w-3 h-3 bg-primary-color text-white flex items-center justify-center rounded-full text-xs">
                2
              </span>
            </Link>
          </div>
        </div>
        <div className="relative px-2">
          <input
            type="text"
            name="search"
            placeholder="Search for Gold Jewellery, Diamond…"
            className="w-full p-2 rounded-md border-none focus:outline-none"
          />
          <div className="absolute top-2 right-3">
            <button>
              <IoSearchOutline className="w-6 h-6 text-primary-color" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {openNavModal && (
            <motion.div
              className="fixed inset-0 z-50 bg-white p-4"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
            >
              <motion.button
                whileHover={{ rotate: -360 }}
                whileTap={{ scale: 0.85 }}
                onClick={handleNavModal}
                className="absolute top-4 right-8"
              >
                <GoArrowLeft className="text-3xl text-primary-color" />
              </motion.button>
              <div className="mt-14">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-pink-500">
                    Rs 500 off on first order
                  </span>
                  {isAuthenticated && ProfileCompleted ? (
                    <button
                      onClick={handleDetailModal}
                      className="flex flex-col items-center uppercase text-primary-color p-2"
                    >
                      <HiOutlineUser className="w-6 h-6 text-primary-color" />
                      Profile
                    </button>
                  ) : (
                    <div className="flex gap-5">
                      {isAuthenticated && !ProfileCompleted && (
                        <button
                          onClick={handleDetailModal}
                          className="uppercase bg-primary-color text-white rounded-md w-3/4 p-2"
                        >
                          Complete Profile
                        </button>
                      )}
                      {!isAuthenticated && (
                        <>
                          <button
                            onClick={HandleModal}
                            className="text-primary-color"
                          >
                            LOG IN
                          </button>
                          <button
                            onClick={HandleModal}
                            className="text-primary-color"
                          >
                            SIGN UP
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <ul className="space-y-5 text-black ">
                  <li onClick={handleNavModal}>
                    <Link to="/all-jewellery">All Jewellery</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/gold">Gold</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/diamond">Diamond</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/earrings">Earrings</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/rings">Rings</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/bestsellers">Bestsellers</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/mia">Mia</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/collections">Collections</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/wedding">Wedding</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/gifting">Gifting</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/golden-harvest">Golden Harvest</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/more">More</Link>
                  </li>
                  <hr />
                  <li onClick={handleNavModal}>
                    <Link to="/my-orders">My Orders</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/digitalgold">Digital Gold</Link>
                  </li>
                  <li onClick={handleNavModal}>
                    <Link to="/faqs">FAQs</Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Modal Login */}
      {LoginModal ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-10 inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className=" rounded-lg shadow-lg  bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative flex-auto">
                  <Login setModal={HandleModal} />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}

      {openDetailPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-10 inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-4xl">
            <div className="rounded-lg shadow-lg bg-white outline-none focus:outline-none">
              <div className="relative flex-auto">
                {/* TODO: pass user mobile number into props */}
                <LoginDetails
                  number={user?.mobile_number}
                  setModal={handleDetailModal}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default MobileHeader;
