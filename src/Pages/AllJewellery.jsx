import React, { useEffect, useState } from 'react';
import { IoFilterOutline, IoChevronDownOutline } from 'react-icons/io5';
import ProductCard from '../Components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import {
  fetchAllProductsAsync,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  setPage,
  setSubCategory,
  selectCurrentPage,
  selectSubCategory
} from '../features/Products/AllProduct/productSlice';
import FilterModal from '../Components/FilterModal';


const AllJewellery = () => {
  const [sortBy, setSortBy] = useState('Best Matches');
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const currentPage = useSelector(selectCurrentPage);
  const subCategory = useSelector(selectSubCategory);

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ page: currentPage, subCategory }));
  }, [dispatch, currentPage, subCategory]);

  const options = ['Price: Low to High', 'Price: High to Low'];

  const handleSelectOption = (option) => {
    setSortBy(option);
    setShowOptions(false);
    // Additional logic if needed based on selected option
  };

  const handleCategoryChange = (category) => {
    if (category === subCategory) {
      dispatch(setSubCategory('')); // Deselect category if it's already selected
    } else {
      dispatch(setSubCategory(category));
      dispatch(setPage(1)); // Reset page to 1 when category changes
    }
    setShowModal(false); // Close the modal after selecting a category
  };

  const handlePageChange = (page) => {
    if (page > 0) {
      dispatch(setPage(page));
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const loadingVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={loadingVariants}
      >
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-primary-color h-12 w-12"></div>
      </motion.div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-10 mt-5">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <IoFilterOutline className="text-primary-color font-extrabold cursor-pointer" onClick={toggleModal} />
          <h1 className="text-primary-color">FILTER</h1>
        </div>
        <div className="md:flex hidden items-center gap-2 flex-wrap">
          {/* Category buttons can also be shown here */}
          {['Chains', 'Earrings', 'Necklace', 'Rings', 'Mangalsutras'].map((category) => (
            <button
              key={category}
              className={`border border-primary-color px-5 py-3  text-center ${subCategory === category ? 'bg-primary-color text-white' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative z-10">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowOptions(!showOptions)}
          >
            <h1 className="text-primary-color text-sm">SORT BY :</h1>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <h2>{sortBy}</h2>
              <IoChevronDownOutline />
            </div>
          </div>
          {showOptions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-md rounded-md">
              {options.map((option) => (
                <div
                  key={option}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-5 p-5 mt-5">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
      <div className="flex justify-between items-center mt-5">
        <button
          className="border border-black p-2 md:w-1/6 w-full rounded-md disabled:cursor-not-allowed hover:bg-primary-color hover:text-white"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1} // Disable "Previous" button if on the first page
        >
          Previous
        </button>
        <button
          className="border border-black p-2 md:w-1/6 w-full rounded-md hover:bg-primary-color hover:text-white disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={products.length === 0} // Disable "See more Products" button if no products on current page
        >
          Next
        </button>
      </div>
      {/* Modal for filter options */}
      <FilterModal isOpen={showModal} closeModal={toggleModal} handleCategoryChange={handleCategoryChange} />
    </div>
  );
};

export default AllJewellery;
