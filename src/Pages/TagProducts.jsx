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
    // Ensure tagName is not empty before dispatching
    if (tagName) {
      dispatch(fetchProductByTagsAsync(tagName));
    }
  }, [dispatch, tagName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h1 className='md:text-4xl text-2xl text-center font-semibold text-primary-color uppercase'>{tagName}</h1>
      <div div className="grid md:grid-cols-4 gap-5 p-5 mt-5">
      {productsByTag.map(product => (
          <div key={product.id} className="product-card">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsProduct;
    