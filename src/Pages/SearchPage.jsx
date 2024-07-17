import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../Components/ProductCard';
import { fetchSearchResults, selectProductsError, selectProductsLoading, selectSearchResults } from '../features/Products/AllProduct/productSlice';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryFromURL = queryParams.get('query') || '';
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults); // Updated selector usage
  const error = useSelector(selectProductsError);
  const loading = useSelector(selectProductsLoading);

  useEffect(() => {
    if (queryFromURL) {
      dispatch(fetchSearchResults(queryFromURL));
    }
  }, [queryFromURL, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Search Results for <span className="text-primary-color">"{queryFromURL}"</span>
      </motion.h1>
      {loading ? (
        <motion.div
          className="text-center text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>
      ) : error ? (
        <motion.div
          className="text-center text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Error: {error}
        </motion.div>
      ) : searchResults.length === 0 ? (
        <motion.div
          className="text-center text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No products found
        </motion.div>
      ) : (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4  mx-auto">
          {searchResults.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

export default SearchPage;
