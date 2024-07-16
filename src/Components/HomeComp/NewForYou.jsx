import React from 'react';
import Divider from '../../assets/divider.png';
import { NewForYouData } from '../../data';

function NewForYou() {
  return (
    <div className='flex flex-col gap-2 justify-center items-center font-Raleway py-10 '>
      <h1 className='md:text-4xl text-xl text-center font-semibold text-primary-color'>
        New For You!
      </h1>
      <p className='text-md text-center'>Our latest releases, just for you !</p>
      <img
        src={Divider}
        alt=''
        className=' object-cover'
      />

      <div className='flex md:flex-row flex-col gap-2 md:px-5 mt-5 '>
        {NewForYouData.map((item, index) => (
          <div
            key={index}
            className='flex gap-10 relative'>
            <img
              src={item.imgUrl}
              alt=''
              className='rounded-md w-80 h-[400px]   '
            />
            <button className='absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold bg-secondary-color border border-gray-600 text-primary-color p-2 rounded-md hover:bg-primary-color hover:text-white delay-75 duration-75 ease-in'>
              Explore More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewForYou;
