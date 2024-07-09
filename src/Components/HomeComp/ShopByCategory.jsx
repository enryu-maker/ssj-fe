import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Divider from '../../assets/divider.png';
import CategoryCard from '../CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryAsync, selectCategories, selectCategoryError, selectCategoryLoading } from '../../features/Products/subCategory/categorySlice';
import { useInView } from 'react-intersection-observer';

function ShopByCategory() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    dispatch(fetchCategoryAsync());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex flex-col gap-5 justify-center items-center mt-10'>
      <motion.h1
        className='md:text-4xl text-xl text-center font-semibold text-primary-color'
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        Shop By Category
      </motion.h1>
      <motion.p
        className='text-md text-center'
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        Browse through your favorite categories. We've got them all!
      </motion.p>
      <motion.img
        src={Divider}
        alt=''
        className='object-cover'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      />
      <div ref={ref} className='grid md:grid-cols-6 grid-cols-2 gap-5 px-10 mt-5'>
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <CategoryCard {...category} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ShopByCategory;
