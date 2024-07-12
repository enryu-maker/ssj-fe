import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import DailyWear from "../assets/EarringsIcon.svg";
import {
  IoHeartOutline,
  IoCartOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Login from "../Pages/Login";
import {
  MoreLink,
} from "../data";
import MobileHeader from "./MobileHeader";
import { useDispatch, useSelector } from "react-redux";
import ProfileDetails from "../Pages/ProfileDetails";
import {
  selectIsAuthenticated,
  selectUser,
  signOutUser,
} from "../features/Auth/authSlice";
import {
  fetchMainCategoryAsync,
  selectMainCategories,
} from "../features/Products/mainCategory/mainCategoriesSlice";
const Header = () => {
  const [LoginModal, setLoginModal] = useState(false);
  const [openDetailPage, setDetailPage] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const mainCategories = useSelector(selectMainCategories);
  const navigate = useNavigate();

  console.log(mainCategories);


  useEffect(() => {
    dispatch(fetchMainCategoryAsync());
  }, [dispatch]);

  

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    dispatch(signOutUser());
    navigate("/");
  };

  const HandleModal = () => {
    setLoginModal(!LoginModal);
  };

  const handleDetailModal = () => {
    setDetailPage(!openDetailPage);
  };

  return (
    <>
      
      <div className="md:flex hidden items-center justify-around font-Raleway sticky top-0 z-50 bg-secondary-color w-full  ">
        <div>
          {/* logo */}

          <Link to={"/"}>
            <img src={Logo} alt="Logo" className="w-28 h-28 object-fill p-2" />
          </Link>
        </div>
        <div className="w-[40rem] relative px-5">
      {/* Wrap the input and button in a form */}
      <form onSubmit={handleSearch} className="relative">
        {/* search bar */}
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for Gold Jewellery, Diamond…"
          className="w-full p-2 rounded-md border-none focus:outline-none"
        />
        <div className="flex items-center gap-5 absolute top-2 right-10">
          <button type="submit">
            <IoSearchOutline className="w-6 h-6 text-primary-color" />
          </button>
        </div>
      </form>
    </div>
        <div className="flex items-center gap-10 font-[400] ">
          {/* Icons */}
          <Link
            to="/dailywear"
            className="flex flex-col items-center uppercase text-sm text-primary-color delay-100 transition-all ease-linear hover:scale-[1.1] "
          >
            <img src={DailyWear} alt="" className="w-6 h-6  " />
            Dailywear
          </Link>
          <Link
            to="/stores"
            className="flex flex-col items-center uppercase text-sm text-primary-color delay-100 transition-all ease-linear hover:scale-[1.1] "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-primary-color"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
            Stores
          </Link>
          {isAuthenticated && user ? (
            <div>
              <ul className="relative parent cursor-pointer md:flex items-center  hidden   ">
                <Link
                  to="/dashboard/profile"
                  style={{ color: "#994e4f" }}
                  className=" flex flex-col items-center uppercase underlineAni text-sm delay-100 transition-all ease-linear hover:scale-[1.1] "
                >
                  <HiOutlineUser className="w-6 h-6 text-primary-color" />
                  Profile
                </Link>
                <div className="absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:flex hidden gap-5 m-1  items-center justify-center flex-col w-[280px]  h-56  text-sm p-1  md:hidden child bg-white shadow-md rounded-md	">
                  <div className="flex flex-col gap-2 items-center justify-center font-semibold ">
                    <h1 className="text-2xl uppercase">My Profile</h1>
                  

                    <>
                      <Link
                        to={'/dashboard/profile'}
                        className="  uppercase bg-primary-color text-white text-center rounded-md w-3/4 p-2 "
                      >
                        Show Profile
                      </Link>
                      <Link
                        to={"/dashboard/orders"}
                        className="  uppercase bg-primary-color text-white  text-center rounded-md w-3/4 p-2 "
                      >
                        My Order
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="  uppercase bg-primary-color text-white rounded-md w-3/4 p-2 "
                      >
                        Logout
                      </button>
                    </>
                  </div>
                  <p className=" text-center mt-5 uppercase text-[12px] font-semibold">
                    Click Here to
                    <Link
                      to="/contacts"
                      className=" text-primary-color hover:text-red-700 "
                    >
                      {" "}
                      contact
                    </Link>
                  </p>
                </div>
              </ul>
            </div>
          ) : (
            <ul className="relative parent cursor-pointer md:flex items-center  hidden   ">
              <Link
                to="#/"
                style={{ color: "#994e4f" }}
                className=" flex flex-col items-center uppercase underlineAni text-sm delay-100 transition-all ease-linear hover:scale-[1.1] "
              >
                <HiOutlineUser className="w-6 h-6 text-primary-color" />
                Account
              </Link>
              <div className="absolute top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:flex hidden gap-5 m-1  items-center justify-center flex-col w-[280px]  h-40  text-sm  p-1  md:hidden child bg-white shadow-md rounded-md	">
                <div className="flex flex-col gap-2 items-center justify-center font-semibold ">
                  <h1 className="text-2xl uppercase">My Account</h1>
                  <p className="text-[12px]">LOGIN TO ACCESS YOUR ACCOUNT</p>
                </div>
                <div className="flex justify-center items-center gap-5 mt-5">
                  <button
                    onClick={HandleModal}
                    className="  uppercase border border-primary-color rounded-md w-20"
                  >
                    log in
                  </button>
                  <button
                    onClick={HandleModal}
                    className="  uppercase bg-primary-color text-white rounded-md w-20 hover:bg-red-700"
                  >
                    Sign up
                  </button>
                </div>
                <p className=" text-center mt-5 uppercase text-[12px] font-semibold">
                  Click Here to
                  <Link
                    to="/contacts"
                    className=" text-primary-color hover:text-red-700 "
                  >
                    {" "}
                    contact
                  </Link>
                </p>
              </div>
            </ul>
          )}
          <Link
            to="/dashboard/wishlist"
            className="flex flex-col items-center uppercase text-sm text-primary-color delay-100 transition-all ease-linear hover:scale-[1.1] "
          >
            <IoHeartOutline className="w-6 h-6 text-primary-color" />
            Wishlist
            {wishlist.length > 0 && (
              <span className="absolute -top-2 left-5 right-0 w-3 h-3 bg-primary-color text-white flex items-center justify-center rounded-full text-xs p-2">
                {wishlist.wishlistItems.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="flex flex-col items-center uppercase text-sm text-primary-color delay-100 transition-all ease-linear hover:scale-[1.1] relative "
          >
            <IoCartOutline className="w-6 h-6 text-primary-color " />
            Cart
            <span className=" absolute md:right-2  left-5 right-0 -top-2 w-3 h-3 bg-primary-color text-white flex items-center justify-center rounded-full text-xs p-2">
              {cart.cartItems.length}
            </span>
          </Link>
        </div>
      </div>
      {/* header link part  */}
      <div className="md:flex flex-wrap justify-around items-center p-5 font-Raleway hidden">
        {/* All Jewellery Link */}
        <Link
          to="/products"
          className="uppercase text-sm group cursor-pointer underlineAni"
        >
          All jewellery
        </Link>

        {Array.isArray(mainCategories) && mainCategories.length > 0 ? (
          mainCategories.map((category) => (
            <div
            key={category.id}
            className="relative parent cursor-pointer group list-none"
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="flex uppercase text-sm cursor-pointer underlineAni">
              {category.name}
            </div>
            {activeCategory === category.id && (
              <div className="absolute top-5 left-0 w-[400px] text-sm p-3 bg-white shadow-md rounded-md z-50">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <h1 className="text-xl font-semibold text-primary-color uppercase">
                      {category.name}
                    </h1>
                    <div className="mt-5 flex flex-col gap-3 items-start">
                      {category.sub_category.map((subCategory) => (
                        <Link
                          key={subCategory.id}
                          to={`/sub-category/${subCategory.id}`} // Assuming link is derived from name
                          className="text-sm font-extralight hover:text-primary-color"
                        >
                          {subCategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          ))
        ) : (
          <div>Loading categories...</div>
        )}
      

        {/* Bestsellers and Collections Links */}
        <Link
          to="/Tag/Bestseller"
          className="uppercase text-sm cursor-pointer underlineAni"
        >
          Bestsellers
        </Link>

        <Link
          to="/collections"
          className="uppercase text-sm cursor-pointer underlineAni"
        >
          Collections
        </Link>

        {/* More Links */}
        <ul className="relative parent cursor-pointer flex items-center gap-5 z-50">
          <div className="uppercase text-sm cursor-pointer underlineAni">
            More
          </div>
          <div className="absolute top-5 right-0 w-[200px] text-sm p-3 md:hidden child bg-white shadow-md rounded-md">
            <div className="flex flex-col gap-3 items-start">
              {/* Assuming MoreLink is an array of objects with name and link */}
              {MoreLink.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="text-sm font-extralight hover:text-primary-color"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </ul>
      </div>

      {/* Mobile header */}
      <div className="md:hidden block">
        <MobileHeader />
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
             
                <ProfileDetails setModal={handleDetailModal} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;
