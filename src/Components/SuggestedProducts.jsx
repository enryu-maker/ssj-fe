import React, { useEffect,  useRef } from 'react';
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
  const productsPerPage = 5; // Number of products to show at once

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

      if (direction === 'left') {
        current.scrollBy({ left: -offset, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: offset, behavior: 'smooth' });
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <div className="mt-10 relative">
      <h2 className="text-3xl font-semibold mb-5">You May Also Like</h2>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-gray-200 rounded-full shadow-md"
        >
          <IoChevronBack className="w-8 h-8 text-gray-600" />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide w-full px-8 py-2 space-x-6"
        >
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`} // Adjust the path according to your routing setup
              className="product-item min-w-[300px] max-w-[300px] p-3 border rounded-lg relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded-md"
              />
              <button className="absolute top-2 right-2 text-primary-color">
                <IoHeartOutline className="w-8 h-8" />
              </button>
              <h3 className="mt-2 text-lg font-medium">{product.name}</h3>
              <p className="text-md font-semibold">{product.size_chart[0]?.total_price ? `₹ ${product.size_chart[0].total_price.toFixed(2)}` : 'Price not available'}</p>
            </Link>
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-gray-200 rounded-full shadow-md"
        >
          <IoChevronForward className="w-8 h-8 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default SuggestedProducts;
