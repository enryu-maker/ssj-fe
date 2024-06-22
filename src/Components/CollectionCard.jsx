import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function CollectionCard({ ...collection }) {
  return (
    <Link to={`/collections/${collection.id}`} >
    <div className='shadow-md flex flex-col font-Raleway hover:shadow-red-50 cursor-pointer '>
      <img
        src={collection.image}
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
    </Link>
  );
}

export default CollectionCard;
