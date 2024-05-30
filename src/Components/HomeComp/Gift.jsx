import React from 'react';
import Divider from '../../assets/divider.png';
import { productsData } from '../../data';
import ProductCard from '../ProductCard';

function Gift() {
  return (
    <div className='flex flex-col gap-2 justify-center items-center font-Raleway py-10 '>
      <h1 className='md:text-4xl text-xl text-center font-semibold text-primary-color'>
        Most Gifted
      </h1>
      <p className='text-md text-center'>
        Check out the most gifted products by our customers
      </p>
      <img
        src={Divider}
        alt=''
        className=' object-cover'
      />

      <div className='flex md:flex-row flex-col gap-2 px-5 mt-5 '>
        {productsData.map(
          (product, index) =>
            index <= 3 && (
              <ProductCard
                key={index}
                {...product}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Gift;
