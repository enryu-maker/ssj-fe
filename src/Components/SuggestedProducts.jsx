import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import {
  fetchRelatedProductAsync,
  selectProductsError,
  selectProductsLoading,
  selectRelatedProducts,
} from "../features/Products/AllProduct/productSlice";

const SuggestedProducts = ({ currentProductId }) => {
  const dispatch = useDispatch();
  const relatedProducts = useSelector(selectRelatedProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const scrollRef = useRef(null);
  const productsPerPage = 1; // Number of products to show at once

  useEffect(() => {
    if (currentProductId) {
      dispatch(fetchRelatedProductAsync(currentProductId));
    }
  }, [dispatch, currentProductId]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const productWidth =
        current.querySelector(".product-item")?.offsetWidth || 0;
      const offset = productWidth * productsPerPage;

      current.scrollBy({
        left: direction === "left" ? -offset : offset,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center">Error loading products: {error}</p>;

  return (
    <div className="mt-10 relative">
      <h2 className="text-3xl font-semibold mb-5 ">You May Also Like</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <IoChevronBack className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide w-full px-4 sm:px-8 py-2 space-x-4 sm:space-x-6"
        >
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-item min-w-[220px] sm:min-w-[280px] max-w-[220px] sm:max-w-[280px] p-4 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 sm:h-64 object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-medium truncate text-center">
                {product.name}
              </h3>
              <p className="mt-1 text-md font-semibold text-center">
                {product.size_chart[0]?.total_price
                  ? `₹ ${product.size_chart[0].total_price.toFixed(2)}`
                  : "Price not available"}
              </p>
            </Link>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <IoChevronForward className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>
    </div>
  );
};

export default SuggestedProducts;
