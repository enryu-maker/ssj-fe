import React from 'react';
import { IoFilterOutline, IoChevronDownOutline } from 'react-icons/io5';
import { Gifted } from '../data';
import ProductCard from '../Components/ProductCard';

function AllJewellery() {
  return (
    <div className=' px-10'>
      <div className='flex items-center justify-between gap-5'>
        <div className='flex items-center gap-5'>
          <IoFilterOutline className=' text-primary-colo font-extrabold' />
          <h1 className=' text-primary-color'>FILTER</h1>
        </div>
        <div className='flex items-center gap-5'>
          <button className='border border-primary-color p-2 w-24 '>
            Bangle
          </button>
          <button className='border border-primary-color p-2 w-24 '>
            Earrings
          </button>
          <button className='border border-primary-color p-2 w-24 '>
            Necklace
          </button>
          <button className='border border-primary-color p-2 w-24 '>
            Pendant
          </button>
          <button className='border border-primary-color p-2 w-26 '>
            Mangalsutra
          </button>
        </div>
        <div className='flex items-center gap-2 '>
          <h1 className=' text-primary-color text-sm'>SORT BY :</h1>
          <div className='flex items-center gap-5 border rounded-md p-2 '>
            <h2>Best Matches</h2>
            <IoChevronDownOutline />
          </div>
        </div>
      </div>
      <div className='grid md:grid-cols-4 gap-5 p-5 mt-5'>
        {Gifted.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
          />
        ))}
      </div>
      <div className='flex justify-center items-center'>
        <button className=' border border-black p-2 md:w-1/6 w-full  rounded-md hover:bg-primary-color hover:text-white'>
          See more Products
        </button>
      </div>
    </div>
  );
}

export default AllJewellery;
