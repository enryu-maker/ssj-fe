import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByTagsAsync, selectProductByTag, selectProductsLoading, selectProductsError } from '../features/Products/AllProduct/productSlice';
import { useLocation } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

const TagsProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const productsByTag = useSelector(selectProductByTag);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  console.log(productsByTag);

  // Extract tag name from the URL pathname
  const pathnameParts = location.pathname.split('/');
  const tagName = pathnameParts[pathnameParts.length - 1]; // Assuming tag name is the last part of the pathname

  useEffect(() => {
    if (tagName) {
      dispatch(fetchProductByTagsAsync(tagName));
    }
  }, [dispatch, tagName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='mt-5'>
      <h1 className='md:text-4xl text-2xl text-center font-semibold text-primary-color uppercase'>{tagName}</h1>
      {productsByTag.length === 0 ? (
        <div className='text-center mt-5'>No products found </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-5 p-5 mt-5">
          {productsByTag.map(product => (
            <div key={product.id} className="product-card">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsProduct;
