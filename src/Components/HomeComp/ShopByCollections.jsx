import React from 'react';
import Divider from '../../assets/divider.png';
import { Collection } from '../../data';
import CollectionCard from '../CollectionCard';

function ShopByCollections() {
  return (
    <div className='flex flex-col gap-2 justify-center items-center font-Raleway py-10 '>
      <h1 className='md:text-4xl text-xl text-center font-semibold text-primary-color'>
        Shop By Collections
      </h1>
      <p className='md:text-md text-center'>
        Whatever the occasion, we've got a beautiful piece of jewellery for you.
      </p>
      <img
        src={Divider}
        alt=''
        className=' object-cover'
      />

      <div className='flex md:flex-row flex-col gap-2 px-5 mt-5 '>
        {Collection.map((collection, index) => (
          <CollectionCard
            key={index}
            {...collection}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopByCollections;
