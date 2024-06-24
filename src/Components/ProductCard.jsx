import React from "react";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishlist } from "../features/Wishlist/wishlistSlice";

function ProductCard({ ...product }) {
  const dispatch = useDispatch();

  const { id, name, image, tags, size_chart } = product;
  const total_price = size_chart && size_chart.length > 0 ? size_chart[0].total_price : undefined;

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  return (
    
      <div className="flex flex-col items-center justify-center shadow-md p-5 relative rounded-lg">
        <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-56 h-56 object-cover mb-2 rounded-lg"
        />
        </Link>
        {tags && tags.length > 0 && (
          <div>
            {tags.map((tag) => (
              <span className="bg-red-800 text-white px-2 py-1 text-xs absolute top-2 left-2 rounded-md" key={tag.id}>
                {tag.name}
              </span>
            ))}
          </div>
        )}
        <button onClick={handleAddToWishlist} className="absolute top-5 right-5 cursor-pointer hover:text-red-500 z-20">
          <CiHeart className="w-6 h-6" />
        </button>
        <Link to={`/product/${id}`}>
        <div className="flex flex-col items-start gap-2 mt-2">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xl text-center font-semibold">
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
