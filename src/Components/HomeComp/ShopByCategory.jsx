import React from 'react';
import Divider from '../../assets/divider.png';
import { Category } from '../../data';
import CategoryCard from '../CategoryCard';

function ShopByCategory() {
  return (
    <div className='flex flex-col gap-5 justify-center items-center mt-10 '>
      <h1 className='text-4xl font-semibold text-primary-color'>
        Shop By Category
      </h1>
      <p className='text-md'>
        Browse through your favorite categories. We've got them all!
      </p>
      <img
        src={Divider}
        alt=''
        className='object-cover'
      />
      <div className='grid md:grid-cols-6 grid-cols-2 gap-5 px-10 mt-5 '>
        {Category.map((category, index) => (
          <CategoryCard
            key={index}
            {...category}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopByCategory;
