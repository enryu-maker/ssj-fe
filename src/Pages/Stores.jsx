import React from 'react';
import { Link } from 'react-router-dom';
import { StoreInCities } from '../data';
import Marquee from 'react-fast-marquee';

const Stores = () => {
  return (
    <div className='flex flex-col gap-5 font-Raleway h-screen'>
      <div className='flex justify-around font-Raleway mt-5'>
        <Link className='border border-primary-color rounded-md py-2 px-5'>
          All Diamonds
        </Link>
        <Link className='border border-primary-color rounded-md py-2 px-5'>
          Popular Pendants
        </Link>
        <Link className='border border-primary-color rounded-md py-2 px-5'>
          Diamond Earrings
        </Link>
        <Link
          to={'/shop/jewellery'}
          className='border border-primary-color rounded-md py-2 px-5'>
          All jewellery
        </Link>
      </div>
      <div className='flex flex-col gap-3 items-center justify-center mt-10'>
        <h1 className=' text-4xl font-semibold text-primary-color'>
          Welcome to SSJ!
        </h1>
        <p className=' text-xl font-extralight text-gray-700'>
          Shop from a wide range of exquisite designs for all occasions.
        </p>
      </div>
      <div className='flex flex-col gap-3 items-center justify-center mt-5 '>
        <h1 className='text-4xl font-semibold text-primary-color'>
          Popular Cities
        </h1>
        <div className='flex justify-center items-centers gap-5 mt-5'>
          {StoreInCities.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center shadow-lg rounded-md hover:scale-110 transition-all ease-linear '>
              <h2 className=' bg-gradient-to-r from-rose-200 to-pink-50 w-full h-10 rounded-t-md flex items-center p-2 text-sm'>
                {item.store}
              </h2>
              <img
                src={item.img}
                alt=''
                className='w-36 h-36 px-5'
              />
              <h1 className=' text-primary-color font-medium mb-2'>
                {item.city}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className='flex space-x-5 text-primary-color tracking-widest mt-5'>
        <Marquee>
          Login to website 50% off making Sai Shraddha Jewellers PVT LTD
        </Marquee>
      </div>
    </div>
  );
};

export default Stores;
