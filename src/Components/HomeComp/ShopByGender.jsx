import React from 'react';
import { motion } from 'framer-motion';
import Divider from '../../assets/divider.png';
import { ShopByGenderData } from '../../data';
import { FaChevronRight } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

function ShopByGender() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-2 justify-center items-center font-Raleway py-10'>
      <motion.h1
        className='md:text-4xl text-xl text-center font-semibold text-primary-color'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        Shop By Gender
      </motion.h1>
      <motion.p
        className='md:text-md text-center'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        Whatever the occasion, we've got a beautiful piece of jewellery for you.
      </motion.p>
      <motion.img
        src={Divider}
        alt=''
        className='object-cover'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      />

      <div className='flex md:flex-row flex-col gap-2 px-10 mt-5'>
        {ShopByGenderData.map((collection, index) => (
          <motion.div
            key={index}
            className='shadow-md flex flex-col font-Raleway hover:shadow-red-50 cursor-pointer'
            initial={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.02, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            onClick={() => navigate(`/Tag/${collection.name}`)}
          >
            <motion.img
              src={collection.imgUrl}
              alt=''
              className='rounded-t'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
            />
            <div className='flex justify-between items-center h-14 px-2'>
              <motion.h1
                className='text-xl font-semibold text-primary-color'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {collection.name}
              </motion.h1>
              <motion.p
                className='flex items-center gap-1 text-sm text-slate-500'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                Explore More
                <FaChevronRight className='w-3 h-3' />
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ShopByGender;
