import React, { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import {
  IoCartOutline,
  IoHeartOutline,
  IoLogOutOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DailyWear from "../assets/EarringsIcon.svg";
import Logo from "../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
  signOutUser,
} from "../features/Auth/authSlice";
import {
  fetchMainCategoryAsync,
  selectMainCategories,
} from "../features/Products/mainCategory/mainCategoriesSlice";
import { HiOutlineUser } from "react-icons/hi2";
import Login from "../Pages/Login";

function MobileHeader() {
  const [LoginModal, setLoginModal] = useState(false);
  const [openNavModal, setNavModal] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);

  const dispatch = useDispatch();
  const mainCategories = useSelector(selectMainCategories);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cart = useSelector((state) => state.cart);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMainCategoryAsync());
  }, [dispatch, openNavModal]); // Update useEffect dependencies

  useEffect(() => {
    if (isAuthenticated) {
      setNavModal(false); // Close nav modal on login
    }
  }, [isAuthenticated]);

  const HandleModal = () => {
    setLoginModal(!LoginModal);
  };

  const handleNavModal = (state) => {
    setNavModal(state !== undefined ? state : !openNavModal);
  };

  const handleLogout = () => {
    dispatch(signOutUser());
    handleNavModal(false); // Close the modal on logout
    navigate("/");
    
  };

  const handleMainCategoryClick = (mainCategory) => {
    setSelectedMainCategory(
      selectedMainCategory === mainCategory ? null : mainCategory
    );
  };

  const handleLinkClick = () => {
    handleNavModal(false); // Close the modal on link click
  };

  return (
    <>
      <div className="font-Raleway sticky top-0 z-50 bg-secondary-color py-2">
        <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 bg-secondary-color">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNavModal()}
            >
              <CiMenuFries className="w-8 h-8 md:w-10 md:h-10 cursor-pointer" />
            </motion.button>
            <Link to={"/"}>
              <motion.img
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                src={Logo}
                alt="Logo"
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </Link>
          </motion.div>

          <div className="flex items-center gap-5">
            <Link
              to="/dailywear"
              className="flex flex-col items-center text-primary-color text-sm md:text-base transition-all ease-linear hover:scale-110"
            >
              <img
                src={DailyWear}
                alt=""
                className="w-6 h-6 md:w-8 md:h-8"
              />
            </Link>

            <Link
              to="/dashboard/wishlist"
              className="flex flex-col items-center text-primary-color text-sm md:text-base transition-all ease-linear hover:scale-110"
            >
              <IoHeartOutline className="w-6 h-6 md:w-8 md:h-8" />
            </Link>
            <Link
              to="/cart"
              className="flex flex-col items-center text-primary-color text-sm md:text-base transition-all ease-linear hover:scale-110 relative"
            >
              <IoCartOutline className="w-6 h-6 md:w-8 md:h-8" />

              <span className="absolute left-3 md:left-5 -top-1 md:-top-2 w-3 h-3 md:w-4 md:h-4 bg-primary-color text-white flex items-center justify-center rounded-full text-xs">
                {cart.cartItems.length}
              </span>
            </Link>
          </div>
        </div>
        <div className="relative px-2 md:px-8 py-2 md:py-3">
          <input
            type="text"
            name="search"
            placeholder="Search for Gold Jewellery, Diamond…"
            className="w-full p-2 md:p-3 rounded-md border-none focus:outline-none"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-3 md:right-6"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoSearchOutline className="w-6 h-6 md:w-8 md:h-8 text-primary-color" />
            </motion.button>
          </motion.div>
        </div>

        <AnimatePresence>
          {openNavModal && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.5 }}
              className="fixed inset-0 z-50 bg-white p-4 md:p-8"
            >
              <motion.button
                whileHover={{ rotate: -360 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => handleNavModal(false)}
                className="absolute top-4 md:top-8 right-8 md:right-12"
              >
                <GoArrowLeft className="text-3xl md:text-4xl text-primary-color" />
              </motion.button>
              <div className="mt-14 md:mt-20">
                <div className="flex justify-between items-center mb-4">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl font-semibold text-pink-500"
                  >
                    Rs 500 off on first order
                  </motion.span>
                  {isAuthenticated && user ? (
                    <div className="flex items-center gap-4">
                      <Link
                        to="/dashboard/profile"
                        onClick={handleLinkClick}
                        className="flex flex-col items-center uppercase text-primary-color p-2 md:p-3"
                      >
                        <HiOutlineUser className="w-6 h-6 md:w-8 md:h-8 text-primary-color" />
                        Profile
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex flex-col items-center uppercase text-primary-color p-2 md:p-3"
                        onClick={handleLogout}
                      >
                        <IoLogOutOutline className="w-6 h-6 md:w-8 md:h-8 text-primary-color" />
                        Logout
                      </motion.button>
                    </div>
                  ) : (
                    <div className="flex gap-5">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-primary-color"
                        onClick={HandleModal}
                      >
                        LOG IN
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-primary-color"
                        onClick={HandleModal}
                      >
                        SIGN UP
                      </motion.button>
                    </div>
                  )}
                </div>
                <ul className="space-y-5 text-black">
                  <motion.li
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={"/products"}
                      onClick={handleLinkClick}
                      className="flex flex-col items-start text-primary-color text-md md:text-base"
                    >
                      All Products
                    </Link>
                  </motion.li>

                  {mainCategories &&
                    mainCategories.map((mainCategory) => (
                      <motion.li
                        key={mainCategory.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          onClick={() => handleMainCategoryClick(mainCategory)}
                          className="flex flex-col items-center text-primary-color text-md md:text-base transition-all ease-linear hover:scale-110"
                        >
                          {mainCategory.name}
                        </motion.button>
                        {selectedMainCategory === mainCategory && (
                          <ul className="space-y-2 pl-4">
                            {mainCategory.sub_category.map((subcategory) => (
                              <motion.li
                                key={subcategory.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={handleLinkClick}
                              >
                                <Link
                                  to={`/sub-category/${subcategory.id}`}
                                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
                                >
                                  {subcategory.name}
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </motion.li>
                    ))}
                  <hr />
                  <motion.li
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleLinkClick}
                  >
                    <Link to="/my-orders">My Orders</Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleLinkClick}
                  >
                    <Link to="/digitalgold">Digital Gold</Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleLinkClick}
                  >
                    <Link to="/faqs">FAQs</Link>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal Login */}
      {LoginModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-md">
            <div className="rounded-lg shadow-lg bg-white outline-none focus:outline-none">
              <div className="relative flex-auto">
                <Login setModal={HandleModal} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default MobileHeader;
