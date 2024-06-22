import React from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

function ProductCard({ id, name, image, tags, size_chart }) {
  // Check if size_chart is defined and has items
  const total_price = size_chart && size_chart.length > 0 ? size_chart[0].total_price : undefined;

  return (
    <Link to={`/product/${id}`}>
      {/* TODO: add data into product details page */}
      <div className="flex flex-col items-center justify-center shadow-md p-5 relative rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-56 h-56 object-cover mb-2 rounded-lg"
        />
        {tags && tags.length > 0 && (
          <div>
            {tags.map((tag) => (
              <span className="bg-red-800 text-white px-2 py-1 text-xs absolute top-2 left-2 rounded-md" key={tag.id}>
                {tag.name}
              </span>
            ))}
          </div>
        )}
        <span className="absolute top-5 right-5 cursor-pointer hover:text-red-500">
          <CiHeart className="w-6 h-6" />
        </span>
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
      </div>
    </Link>
  );
}

export default ProductCard;
