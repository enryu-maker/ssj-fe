import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function CollectionCard({ id, name, image }) {
  return (
    <Link to={`/collections/${id}`}>
      <div className='relative flex flex-col font-Raleway shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105'>
        <img
          src={image}
          alt={name}
          className='w-full h-48 object-cover md:h-56 lg:h-64'
        />
        <div className='flex justify-between items-center h-14 px-2 md:px-4 md:h-16'>
          <h1 className='text-lg md:text-xl font-semibold text-primary-color truncate'>
            {name}
          </h1>
          <p className='flex items-center gap-1 text-sm md:text-base text-slate-500'>
            Explore More
            <FaChevronRight className='w-3 h-3 md:w-4 md:h-4' />
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CollectionCard;
