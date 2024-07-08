import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      <h1 className="md:text-4xl text-2xl text-center space-y-10 mt-5  font-semibold text-primary-color uppercase">
        {category.name}
      </h1>
      <div div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-5 mt-5">
        {category?.products?.map((item) => (
          <div key={item.id} className="product-card">
            <ProductCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
