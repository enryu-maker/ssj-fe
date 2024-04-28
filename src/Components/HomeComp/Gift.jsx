import React from 'react';
import Divider from '../../assets/divider.png';
import { Gifted } from '../../data';
import ProductCard from '../ProductCard';

function Gift() {
  return (
    <div className='flex flex-col gap-2 justify-center items-center font-Raleway py-10 '>
      <h1 className='text-4xl font-semibold text-primary-color'>Most Gifted</h1>
      <p className='text-md'>
        Check out the most gifted products by our customers
      </p>
      <img
        src={Divider}
        alt=''
        className=' object-cover'
      />

      <div className='flex md:flex-row flex-col gap-2 px-5 mt-5 '>
        {Gifted.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
          />
        ))}
      </div>
    </div>
  );
}

export default Gift;
