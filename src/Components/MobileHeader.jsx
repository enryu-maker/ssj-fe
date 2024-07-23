import React, { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import {
  IoCartOutline,
  IoHeartOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DailyWear from "../assets/EarringsIcon.svg";
import Logo from "../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "../features/Auth/authSlice";
import {
  fetchMainCategoryAsync,
  selectMainCategories,
} from "../features/Products/mainCategory/mainCategoriesSlice";
import { HiOutlineUser } from "react-icons/hi2";
import Login from "../Pages/Login";
import Avatar from "../assets/avatar.png";
import {
  fetchMaterialRateAsync,
  fetchSilverRateAsync,
  selectMaterialPrice,
  selectSilverPrice,
} from "../features/Products/AllProduct/productSlice";

function MobileHeader() {
  const [LoginModal, setLoginModal] = useState(false);
  const [openNavModal, setNavModal] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isSilver, setIsSilver] = useState(false);

  const dispatch = useDispatch();
  const mainCategories = useSelector(selectMainCategories);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const MaterialPrice = useSelector(selectMaterialPrice);
  const SilverPrice = useSelector(selectSilverPrice);
  const cart = useSelector((state) => state.cart);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMainCategoryAsync());
    dispatch(fetchMaterialRateAsync());
    dispatch(fetchSilverRateAsync());
  }, [dispatch, openNavModal]); // Update useEffect dependencies

  // search query
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

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

  const handleMainCategoryClick = (mainCategory) => {
    setSelectedMainCategory(
      selectedMainCategory === mainCategory ? null : mainCategory
    );
  };

  const handleLinkClick = () => {
    handleNavModal(false); // Close the modal on link click
  };

  const handleGoldRateClick = () => {
    setIsActive(!isActive);
  };
  const handleSilverRateClick = () => {
    setIsSilver(!isSilver);
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
                className="object-cover h-16 md:w-20 md:h-20"
              />
            </Link>
          </motion.div>
          <div className="flex items-center gap-5">
            {isAuthenticated && user ? (
              <Link
                to="/dashboard/profile"
                className="flex flex-col items-center text-primary-color text-sm md:text-base transition-all ease-linear hover:scale-110"
              >
                {/* <HiOutlineUser className="w-6 h-6 md:w-8 md:h-8" /> */}
                <img
                  src={
                    user.photo
                      ? `https://api.saishraddhajewellers.com${user.photo}`
                      : Avatar
                  }
                  alt="profile"
                  className="w-8 h-8 md:w-8 md:h-8 object-cover rounded-full "
                />
              </Link>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-primary-color"
                onClick={HandleModal}
              >
                <HiOutlineUser className="w-6 h-6 md:w-8 md:h-8" />
              </motion.button>
            )}

            <Link
              to="/dailywear"
              className="flex flex-col items-center text-primary-color text-sm md:text-base transition-all ease-linear hover:scale-110"
            >
              <img src={DailyWear} alt="" className="w-6 h-6 md:w-8 md:h-8" />
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={handleSearch}
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
                <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-pink-500 to-pink-300 rounded-lg shadow-md">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl font-semibold text-white"
                  >
                    Rs 500 off on first order
                  </motion.span>
                </div>
                <ul className="space-y-5 text-gray-700">
                  <motion.li
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={"/products"}
                      onClick={handleLinkClick}
                      className="flex flex-col items-start text-lg md:text-xl transition-all ease-linear hover:scale-105 hover:text-pink-500"
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
                          className="flex flex-col items-start text-lg md:text-xl transition-all ease-linear hover:scale-105 hover:text-pink-500"
                        >
                          {mainCategory.name}
                        </motion.button>
                        {selectedMainCategory === mainCategory && (
                          <ul className="pl-4 space-y-3">
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
                                  className="block px-4 py-2 text-md md:text-lg text-gray-800 hover:bg-pink-100 rounded-md"
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
                  <div className="flex flex-col gap-5 bg-gray-100 rounded-md p-4 shadow-md">
                    <motion.li
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={handleLinkClick}
                    >
                      <Link
                        to="/dashboard/orders"
                        className="flex flex-col items-start text-lg md:text-xl transition-all ease-linear hover:scale-105 hover:text-pink-500"
                      >
                        My Orders
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={handleLinkClick}
                    >
                      <Link
                        to="/blogs"
                        className="flex flex-col items-start text-lg md:text-xl transition-all ease-linear hover:scale-105 hover:text-pink-500"
                      >
                        Blogs
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        onClick={handleGoldRateClick}
                        className="flex flex-col items-start text-lg md:text-xl transition-all ease-linear hover:scale-105 hover:text-pink-500"
                      >
                        Gold rate
                      </button>
                      {isActive && (
                        <div className="flex flex-col gap-1 mt-2 p-2 bg-gradient-to-r from-pink-500 to-pink-300 rounded-md">
                          {MaterialPrice.map((rate) => (
                            <div
                              key={rate.id}
                              className="text-base font-light text-white"
                            >
                              {rate.purity}K Gold: ₹{rate.current_price}
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        onClick={handleSilverRateClick}
                        className="flex flex-col items-start text-lg md:text-xl transition-all ease-linear hover:scale-105 hover:text-pink-500"
                      >
                        Silver Rate
                      </button>
                      {isSilver && (
                        <div className="flex flex-col gap-1 mt-2 p-2 bg-gradient-to-r from-pink-500 to-pink-300 rounded-md">
                          {SilverPrice.map((rate) => (
                            <div
                              key={rate.id}
                              className="text-base font-light text-white"
                            >
                              {rate.purity} Silver: ₹{rate.current_price}
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={handleLinkClick}
                    >
                      <Link
                        to="/faq"
                        className="flex flex-col items-start text-lg md:text-xl transition-all ease-linear hover:scale-105 hover:text-pink-500"
                      >
                        FAQs
                      </Link>
                    </motion.li>
                  </div>
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
