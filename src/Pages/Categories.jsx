import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import ProductCard from "../Components/ProductCard";
import { useParams } from "react-router-dom";
import {
  fetchCategoryByIdAsync,
  selectCategory,
  selectCategoryError,
  selectCategoryLoading,
} from "../features/Products/subCategory/categorySlice";
import { useInView } from "react-intersection-observer";

const Categories = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);
  const [visibleCount, setVisibleCount] = useState(16); // Number of products to display initially

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    dispatch(fetchCategoryByIdAsync(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (inView && !loading) {
      setVisibleCount((prevCount) => prevCount + 16); // Increase the number of visible products by 16
    }
  }, [inView, loading]);

  if (loading && !category) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <motion.h1
        className="md:text-4xl text-2xl text-center space-y-10 mt-5 font-semibold text-primary-color uppercase"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        {category.name}
      </motion.h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-5 mt-5">
        {category.products.length === 0 ? (
          <motion.div
            className="col-span-full text-center text-lg text-primary-color"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            Products coming soon
          </motion.div>
        ) : (
          category.products.slice(0, visibleCount).map((item) => (
            <motion.div
              key={item.id}
              className="product-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProductCard {...item} />
            </motion.div>
          ))
        )}
      </div>
      {visibleCount < category.products.length && (
        <div ref={ref} className="w-full h-1"></div>
      )}
    </div>
  );
};

export default Categories;
