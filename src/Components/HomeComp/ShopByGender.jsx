import React from 'react';
import Divider from '../../assets/divider.png';
import { ShopByGenderData } from '../../data';
import { FaChevronRight } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { fetchProductByTagsAsync } from '../../features/Products/AllProduct/productSlice';
import { useNavigate, useParams } from "react-router-dom";

function ShopByGender() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {Tagname} = useParams();
  
  return (
    <div className='flex flex-col gap-2 justify-center items-center font-Raleway py-10 '>
      <h1 className='md:text-4xl text-xl text-center font-semibold text-primary-color'>
        Shop By Gender
      </h1>
      <p className='md:text-md text-center'>
        Whatever the occasion, we've got a beautiful piece of jewellery for you.
      </p>
      <img
        src={Divider}
        alt=''
        className=' object-cover'
      />

      <div className='flex md:flex-row flex-col gap-2 px-10 mt-5 '>
        {ShopByGenderData.map((collection, index) => (
          <div
            key={index}
            className='shadow-md flex flex-col font-Raleway hover:shadow-red-50 cursor-pointer '>
            <img
              src={collection.imgUrl}
              alt=''
              className='rounded-t'
            />
            <div onClick={()=> {
              navigate(`/Tag/${collection.name}`)
            }} className='flex justify-between items-center h-14 px-2'>
              <h1 className=' text-xl font-semibold text-primary-color'>
                {collection.name}
              </h1>
              <p className='flex items-center gap-1 text-sm text-slate-500'>
                Explore More
                <FaChevronRight className='w-3 h-3' />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopByGender;
