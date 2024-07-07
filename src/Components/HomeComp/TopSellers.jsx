import React, { useEffect } from 'react';
import Divider from '../../assets/divider.png';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchTopSellerProductsAsync, selectProductsError, selectProductsLoading, selectTopSellerProducts } from '../../features/Products/AllProduct/productSlice';

function TopSellers() {

  const dispatch = useDispatch();
  const products = useSelector(selectTopSellerProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
 

  useEffect(() => {
    dispatch(fetchTopSellerProductsAsync());
  }, [dispatch]);


  return (
    <div className='flex flex-col gap-2 justify-center items-center font-Raleway py-10 '>
      <h1 className='md:text-4xl text-xl text-center font-semibold text-primary-color'>
        Top Sellers
      </h1>
      <p className='text-md text-center'>Love the most to bought the most</p>
      <img
        src={Divider}
        alt=''
        className=' object-cover'
      />

      {
        loading && (
          <div>Loading...</div>
        )
      }
      {
        error && (
          <div>Error: {error}</div>
        )
      }

      <div className='grid grid-cols-2 md:flex gap-5 p-5'>
        {products.map(
          (product, index) =>
            index <= 3 && (
              <ProductCard
                key={index}
                {...product.product}
              />
            )
        )}
      </div>
    </div>
  );
}

export default TopSellers;
