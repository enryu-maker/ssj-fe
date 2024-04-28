import React from 'react';
import { CiHeart } from 'react-icons/ci';

function ProductCard({ ...product }) {
  return (
    <div className=' flex flex-col items-start justify-center shadow-md p-5 relative'>
      <img
        src={product.imgUrl}
        alt=''
        className=' w-56 h-56 p-2 relative '
      />
      {product.tag && (
        <span className=' bg-red-800 text-white p-1 text-sm absolute    '>
          {product.tag}
        </span>
      )}
      <span className=' absolute top-5 right-5 cursor-pointer hover:text-red-500  '>
        <CiHeart className=' w-6 h-6 ' />
      </span>
      <div className=' flex flex-col gap-2'>
        <p className='text-md font-semibold mt-2 '>{product.name}</p>
        <p className='text-xl font-semibold '>
          {product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'INR',
          })}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
