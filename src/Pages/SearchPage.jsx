import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../Components/ProductCard';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryFromURL = queryParams.get('query') || '';
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fake product data with images
  const fakeProducts = [
    { id: 1, name: 'Gold Necklace', category: 'Jewellery', image: 'https://images.unsplash.com/photo-1559560864-854edd2b01e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, name: 'Diamond Ring', category: 'Jewellery', image: 'https://images.unsplash.com/photo-1600737637922-16fa040b05ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, name: 'Silver Bracelet', category: 'Jewellery', image: 'https://images.unsplash.com/photo-1559560864-854edd2b01e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, name: 'Platinum Earrings', category: 'Jewellery', image: 'https://images.unsplash.com/photo-1559560864-854edd2b01e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, name: 'Pearl Pendant', category: 'Jewellery', image: 'https://images.unsplash.com/photo-1559560864-854edd2b01e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    // Add more fake products as needed
  ];

  useEffect(() => {
    if (queryFromURL) {
      const results = fakeProducts.filter(product =>
        product.name.toLowerCase().includes(queryFromURL.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [queryFromURL]);

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
      {filteredProducts.length === 0 ? (
        <motion.div
          className="text-center text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No products found
        </motion.div>
      ) : (
        <div className={`flex ${filteredProducts.length === 1 ? 'items-center justify-center' : 'flex-wrap justify-center'} gap-6 max-w-screen-lg mx-auto`}>
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-72"
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
