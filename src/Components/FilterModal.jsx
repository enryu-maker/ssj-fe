import React from 'react';
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';

const FilterModal = ({ isOpen, closeModal, handleCategoryChange }) => {
  const modalVariants = {
    hidden: { y: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } },
    visible: { y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? '' : 'hidden'}`}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      variants={modalVariants}
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filter Options</h2>
          <button onClick={closeModal}>
            <IoClose className="text-gray-500 cursor-pointer" />
          </button>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Category</h3>
          <div className="flex flex-wrap gap-2">
            {['Chains', 'Earrings', 'Necklace', 'Rings', 'Mangalsutras'].map((category) => (
              <button
                key={category}
                className="border border-primary-color px-4 py-2 rounded-md hover:bg-primary-color hover:text-white"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Add more filter options like Price, Color, etc. */}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterModal;
