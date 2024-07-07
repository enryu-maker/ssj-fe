import React from "react";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishlist } from "../features/Wishlist/wishlistSlice";

function ProductCard({ id, name, image, size_chart, is_bestseller }) {
  const dispatch = useDispatch();

  const total_price = size_chart && size_chart.length > 0 ? size_chart[0].total_price : undefined;

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ id, name, image, size_chart, is_bestseller }));
  };

  return (
    <div className="flex flex-col items-center justify-center shadow-md p-5 relative rounded-lg">
      <Link to={`/product/${id}`} className="w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-auto object-cover mb-2 rounded-lg"
        />
      </Link>
      {is_bestseller && (
        <span className="bg-red-800 text-white px-2 py-1 text-xs absolute top-2 left-2 rounded-md">
          Best Seller
        </span>
      )}
      <button
        onClick={handleAddToWishlist}
        className="absolute top-5 right-5 cursor-pointer hover:text-red-500 z-20"
      >
        <CiHeart className="w-6 h-6" />
      </button>
      <Link to={`/product/${id}`} className="w-full">
        <div className="flex flex-col items-start gap-2 mt-2 w-full">
          <p className="text-sm font-semibold text-center w-full">{name}</p>
          <p className="text-xl text-center font-semibold w-full">
            {total_price
              ? total_price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })
              : "Price not available"}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
