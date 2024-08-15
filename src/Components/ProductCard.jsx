import React from "react";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishlist } from "../features/Wishlist/wishlistSlice";
import RatingComp from "./RatingComp";

function ProductCard({ id, name, image, size_chart, is_bestseller, is_out_of_stock }) {
  const dispatch = useDispatch();

  // Extract total_price from size_chart
  const total_price =
    size_chart && size_chart.length > 0 ? size_chart[0].total_price : undefined;

  // Static actual price
  const actual_price = size_chart[0]?.actual_price; // Static value for the actual price
  const discountPercentage =
    Math.round(size_chart?.[0]?.discount_percentage) || undefined;

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ id, name, image, size_chart, is_bestseller }));
  };

  return (
    <div className="relative flex flex-col items-center justify-between shadow-lg p-4 rounded-lg bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      {/* Discount Badge Wrapper */}
      <div className="absolute top-3 left-3 z-30">
        {/* Modern Discount Badge */}
        {discountPercentage ? (
          <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 text-xs rounded-full shadow-lg">
            {discountPercentage}% OFF
          </span>
        ) : (
          <span className="w-16 h-5 invisible"></span> // Invisible space holder
        )}
      </div>

      {/* Image Wrapper */}
      <div className="relative">
        {/* Image */}
        <Link to={is_out_of_stock ? '#' : `/product/${id}`} className={`w-full ${is_out_of_stock ? 'cursor-not-allowed' : ''}`}>
          <img
            src={image}
            alt={name}
            className={`w-full h-56 sm:h-56 md:h-72 object-cover mb-4 rounded-lg ${is_out_of_stock ? 'blur-sm' : ''}`}
          />
        </Link>
        {/* Out of Stock Overlay */}
        {is_out_of_stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 rounded-lg">
            <span className="text-white text-xl font-bold">Out Of Stock</span>
          </div>
        )}
        <div className="md:absolute md:bottom-4 md:right-2 flex justify-center">
          <RatingComp />
        </div>
      </div>

      {is_bestseller && (
        <div className="absolute bottom-3 right-3 bg-red-800 text-white px-3 py-1 text-xs rounded-full shadow-lg z-20">
          Best Seller
        </div>
      )}
      <button
        onClick={handleAddToWishlist}
        className="absolute top-3 right-3 cursor-pointer hover:text-red-500 z-20"
      >
        <CiHeart className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <Link to={is_out_of_stock ? '#' : `/product/${id}`} className={`w-full ${is_out_of_stock ? 'cursor-not-allowed' : ''}`}>
        <div className="flex flex-col items-start gap-2 mt-3 w-full">
          <p className="text-sm sm:text-md font-semibold text-center w-full truncate">
            {name}
          </p>
          <div className="flex flex-col items-center w-full">
            <div className="text-center">
              {actual_price && (
                <p className="text-sm sm:text-md text-red-500 line-through">
                  {actual_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}
                </p>
              )}
              {total_price !== undefined && total_price !== null ? (
                <p className="text-lg sm:text-2xl font-semibold text-black">
                  {total_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}
                </p>
              ) : (
                <p className="text-sm sm:text-xl text-center font-semibold w-full">
                  {"Price not available"}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
