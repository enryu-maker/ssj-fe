import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';

function CategoryCard({ ...category }) {
  return (
    <div className=' flex flex-col gap-3 shadow-md font-Raleway'>
      <img
        src={category.imgUrl}
        alt=''
        className=' w-[200px] h-44'
      />
      <h1 className='text-center text-xl font-semibold'>{category.name}</h1>
      <div className='flex justify-center items-center gap-2 py-3 mb-2 cursor-pointer group hover:gap-10 delay-75 duration-100 transition-all ease-in-out '>
        <p className='group-hover:text-primary-color'>Explore</p>
        <p className='group-hover:text-primary-color'>
          <FaChevronRight className='w-3 h-3' />
        </p>
      </div>
    </div>
  );
}

export default CategoryCard;
