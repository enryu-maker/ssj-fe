import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProductByTagsAsync, selectProductByTag, selectProductsLoading, selectProductsError } from '../features/Products/AllProduct/productSlice';
import { useLocation } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

const TagsProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const productsByTag = useSelector(selectProductByTag);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  console.log(productsByTag);

  // Extract tag name from the URL pathname
  const pathnameParts = location.pathname.split('/');
  const tagName = pathnameParts[pathnameParts.length - 1]; // Assuming tag name is the last part of the pathname

  useEffect(() => {
    if (tagName) {
      dispatch(fetchProductByTagsAsync(tagName));
    }
  }, [dispatch, tagName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='mt-5'>
      <motion.h1
        className='md:text-4xl text-2xl text-center font-semibold text-primary-color uppercase'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {tagName}
      </motion.h1>
      {productsByTag.length === 0 ? (
        <motion.div
          className='text-center mt-5'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Products coming soon
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-4 gap-5 p-5 mt-5">
          {productsByTag.map(product => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsProduct;
