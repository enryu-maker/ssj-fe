import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoHeartOutline, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { fetchRelatedProductAsync, selectProductsError, selectProductsLoading, selectRelatedProducts } from '../features/Products/AllProduct/productSlice';

const SuggestedProducts = ({ currentProductId }) => {
  const dispatch = useDispatch();
  const relatedProducts = useSelector(selectRelatedProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const scrollRef = useRef(null);
  const productsPerPage = 3; // Adjusted for better responsiveness

  useEffect(() => {
    if (currentProductId) {
      dispatch(fetchRelatedProductAsync(currentProductId));
    }
  }, [dispatch, currentProductId]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const productWidth = current.querySelector('.product-item')?.offsetWidth || 0;
      const offset = productWidth * productsPerPage;

      current.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error loading products: {error}</p>;

  return (
    <div className="mt-10 relative">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-center">You May Also Like</h2>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 sm:p-4 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition-colors"
        >
          <IoChevronBack className="w-8 h-8 text-gray-700" />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide w-full px-4 sm:px-8 py-2 space-x-4 sm:space-x-6"
        >
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`} // Adjust the path according to your routing setup
              className="product-item min-w-[150px] sm:min-w-[200px] max-w-[150px] sm:max-w-[200px] p-3 border rounded-lg relative bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 sm:h-60 object-cover rounded-md"
              />
              <button className="absolute top-2 right-2 bg-white rounded-full p-1 text-primary-color shadow-md hover:bg-gray-100 transition-colors">
                <IoHeartOutline className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <h3 className="mt-1 sm:mt-2 text-sm sm:text-lg font-medium truncate">{product.name}</h3>
              <p className="text-xs sm:text-md font-semibold">{product.size_chart[0]?.total_price ? `₹ ${product.size_chart[0].total_price.toFixed(2)}` : 'Price not available'}</p>
            </Link>
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 sm:p-4 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition-colors"
        >
          <IoChevronForward className="w-8 h-8 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default SuggestedProducts;
