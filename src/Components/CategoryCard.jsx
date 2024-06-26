import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function CategoryCard({ ...category }) {
  return (
    
    <div className=' flex flex-col gap-3 shadow-md hover:shadow-red-50 cursor-pointer font-Raleway'>
      <img
        src={category.image}
        alt=''
        className=' w-[200px] h-44 rounded-t'
      />
      <h1 className='text-center text-xl font-semibold text-primary-color'>
        {category.name}
      </h1>
      <Link to={`/sub-category/${category.id}`} className='flex justify-center items-center gap-2 py-3 mb-2 cursor-pointer group hover:gap-10 delay-75 duration-100 transition-all ease-in-out '>
        <p className='group-hover:text-primary-color'>Explore</p>
        <p className='group-hover:text-primary-color'>
          <FaChevronRight className='w-3 h-3' />
        </p>
      </Link>
    </div>
   
  );
}

export default CategoryCard;
