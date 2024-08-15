import React from "react";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishlist } from "../features/Wishlist/wishlistSlice";
import RatingComp from "./RatingComp";

function ProductCard({ id, name, image, size_chart, is_bestseller, is_out_of_stock }) {
  const dispatch = useDispatch();

  const total_price =
    size_chart && size_chart.length > 0 ? size_chart[0].total_price : undefined;

  const actual_price = size_chart[0]?.actual_price;
  const discountPercentage =
    Math.round(size_chart?.[0]?.discount_percentage) || undefined;

  const handleAddToWishlist = () => {
    if (!is_out_of_stock) {
      dispatch(addToWishlist({ id, name, image, size_chart, is_bestseller }));
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between shadow-lg p-3 sm:p-4 rounded-lg bg-white max-w-xs mx-auto">
      <div className="absolute top-2 left-2 z-30">
        {discountPercentage ? (
          <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 text-xs rounded-full shadow-lg">
            {discountPercentage}% OFF
          </span>
        ) : (
          <span className="w-12 h-5 invisible"></span>
        )}
      </div>

      <div className="relative">
        <Link to={is_out_of_stock ? '#' : `/product/${id}`} className={`w-full ${is_out_of_stock ? 'cursor-not-allowed' : ''}`}>
          <img
            src={image}
            alt={name}
            className={`w-full h-48 sm:h-56 object-cover mb-3 rounded-lg ${is_out_of_stock ? 'blur-sm' : ''}`}
          />
        </Link>

        {is_out_of_stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 rounded-lg">
            <span className="text-white text-lg font-bold">Out Of Stock</span>
          </div>
        )}

        {!is_out_of_stock && (
          <div className="absolute bottom-2 right-2">
            <RatingComp />
          </div>
        )}
      </div>

      {is_bestseller && (
        <div className="absolute bottom-2 right-2 bg-red-800 text-white px-2 py-1 text-xs rounded-full shadow-lg z-20">
          Best Seller
        </div>
      )}

      <button
        onClick={handleAddToWishlist}
        className={`absolute top-2 right-2 cursor-pointer z-20 ${is_out_of_stock ? 'text-gray-400 cursor-not-allowed' : 'hover:text-red-500'}`}
        disabled={is_out_of_stock}
      >
        <CiHeart className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <Link to={is_out_of_stock ? '#' : `/product/${id}`} className={`w-full ${is_out_of_stock ? 'cursor-not-allowed' : ''}`}>
        <div className="flex flex-col items-start gap-1 mt-2 w-full">
          <p className="text-sm sm:text-md font-semibold text-center w-full truncate">
            {name}
          </p>
          <div className="flex flex-col items-center w-full">
            <div className="text-center">
              {actual_price && (
                <p className="text-xs sm:text-sm text-red-500 line-through">
                  {actual_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}
                </p>
              )}
              {total_price !== undefined && total_price !== null ? (
                <p className="text-lg sm:text-xl font-semibold text-black">
                  {total_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-center font-semibold w-full">
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
