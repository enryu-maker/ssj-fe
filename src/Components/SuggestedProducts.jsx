import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import {
  fetchRelatedProductAsync,
  selectProductsError,
  selectProductsLoading,
  selectRelatedProducts,
} from "../features/Products/AllProduct/productSlice";
import ProductCard from "./ProductCard";

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
      const scrollLeft = current.scrollLeft;

      if (direction === "left" && scrollLeft > 0) {
        current.scrollBy({
          left: -offset,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        const maxScrollLeft = current.scrollWidth - current.clientWidth;
        if (scrollLeft < maxScrollLeft) {
          current.scrollBy({
            left: offset,
            behavior: "smooth",
          });
        }
      }
    }
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-xl">Error loading products: {error}</p>;

  return (
    <div className="mt-12 relative">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-6">You May Also Like</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-10 p-3 sm:p-4 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <IoChevronBack className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide w-full px-4 sm:px-6 md:px-8 py-2 space-x-4 sm:space-x-6 md:space-x-8"
        >
          {relatedProducts.map((product) => (
            <div className="product-item flex-shrink-0 w-64 sm:w-80 md:w-96 lg:w-112 xl:w-128" key={product.id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-10 p-3 sm:p-4 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <IoChevronForward className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>
      </div>
    </div>
  );
};

export default SuggestedProducts;
