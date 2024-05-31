import React from 'react';
import { CiHeart } from 'react-icons/ci';
import { Link } from 'react-router-dom';

function ProductCard({ ...product }) {
  return (
    <Link to={`/product/${product.id}`}>
    <div className="flex flex-col items-center justify-center shadow-md p-5 relative rounded-lg">
      <img
        src={product.imgUrl[0]}
        alt={product.name}
        className="w-56 h-56 object-cover mb-2 rounded-lg"
      />
      {product.tag && (
        <span className="bg-red-800 text-white px-2 py-1 text-xs absolute top-2 left-2 rounded-md">
          {product.tag}
        </span>
      )}
      <span className="absolute top-5 right-5 cursor-pointer hover:text-red-500">
        <CiHeart className="w-6 h-6" />
      </span>
      <div className="flex flex-col items-start gap-2 mt-2">
        <p className="text-sm font-semibold">{product.name}</p>
        <p className="text-xl font-semibold">
          {product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'INR',
          })}
        </p>
      </div>
    </div>
  </Link>
  );
}

export default ProductCard;
