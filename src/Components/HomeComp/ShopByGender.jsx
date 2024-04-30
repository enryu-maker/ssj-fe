import React from 'react';
import Divider from '../../assets/divider.png';
import { ShopByGenderData } from '../../data';
import { FaChevronRight } from 'react-icons/fa6';

function ShopByGender() {
  return (
    <div className='flex flex-col gap-2 justify-center items-center font-Raleway py-10 '>
      <h1 className='text-4xl font-semibold text-primary-color'>
        Shop By Collections
      </h1>
      <p className='text-md'>
        Whatever the occasion, we've got a beautiful piece of jewellery for you.
      </p>
      <img
        src={Divider}
        alt=''
        className=' object-cover'
      />

      <div className='flex md:flex-row flex-col gap-2 px-10 mt-5 '>
        {ShopByGenderData.map((collection, index) => (
          <div
            key={index}
            className='shadow-md flex flex-col font-Raleway hover:shadow-red-50 cursor-pointer '>
            <img
              src={collection.imgUrl}
              alt=''
              className='rounded-t'
            />
            <div className='flex justify-between items-center h-14 px-2'>
              <h1 className=' text-xl font-semibold text-primary-color'>
                {collection.name}
              </h1>
              <p className='flex items-center gap-1 text-sm text-slate-500'>
                Explore More
                <FaChevronRight className='w-3 h-3' />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopByGender;
