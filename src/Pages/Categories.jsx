import React, { useEffect } from "react";
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

const Categories = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  useEffect(() => {
    dispatch(fetchCategoryByIdAsync(categoryId));
  }, [dispatch, categoryId]);

  if (loading) {
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
        transition={{ duration: 0.5 }}
      >
        {category.name}
      </motion.h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-5 mt-5">
        {category.products.length === 0 ? (
          <motion.div
            className="col-span-full text-center text-lg text-primary-color"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Products coming soon
          </motion.div>
        ) : (
          category.products.map((item) => (
            <motion.div
              key={item.id}
              className="product-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard {...item} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
