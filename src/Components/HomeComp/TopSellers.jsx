import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Divider from '../../assets/divider.png';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopSellerProductsAsync, selectProductsError, selectProductsLoading, selectTopSellerProducts } from '../../features/Products/AllProduct/productSlice';
import { useInView } from 'react-intersection-observer';

function TopSellers() {
  const dispatch = useDispatch();
  const products = useSelector(selectTopSellerProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    dispatch(fetchTopSellerProductsAsync());
  }, [dispatch]);

  return (
    <div className='flex flex-col gap-2 justify-center items-center font-Raleway py-10 '>
      <motion.h1
        className='md:text-4xl text-xl text-center font-semibold text-primary-color'
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        Top Sellers
      </motion.h1>
      <motion.p
        className='text-md text-center'
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        Love the most to bought the most
      </motion.p>
      <motion.img
        src={Divider}
        alt=''
        className='object-cover'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div ref={ref} className='grid grid-cols-2 md:flex gap-5 p-5'>
        {products.map((product, index) => (
          index <= 3 && (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.75, ease: 'easeOut' }}
            >
              <ProductCard {...product.product} />
            </motion.div>
          )
        ))}
      </div>
    </div>
  );
}

export default TopSellers;
