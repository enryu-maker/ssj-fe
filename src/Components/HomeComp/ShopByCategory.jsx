import React, { useEffect } from 'react';
import Divider from '../../assets/divider.png';
import CategoryCard from '../CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryAsync, selectCategories, selectCategoryError, selectCategoryLoading, selectCategorys } from '../../features/Products/category/categorySlice';

function ShopByCategory() {

  const dispatch = useDispatch();
  const Categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  useEffect(() => {
    dispatch(fetchCategoryAsync());
  }, [dispatch]);


  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex flex-col gap-5 justify-center items-center mt-10 '>
      <h1 className='md:text-4xl text-xl text-center font-semibold text-primary-color'>
        Shop By Category
      </h1>
      <p className='text-md text-center'>
        Browse through your favorite categories. We've got them all!
      </p>
      <img
        src={Divider}
        alt=''
        className='object-cover'
      />
      <div className='grid md:grid-cols-6 grid-cols-2 gap-5 px-10 mt-5 '>
        {Categories.map((category, index) => (
          <CategoryCard
            key={index}
            {...category}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopByCategory;
