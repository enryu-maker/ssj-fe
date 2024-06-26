import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByTagsAsync, selectProductByTag, selectProductsLoading, selectProductsError } from '../features/Products/AllProduct/productSlice';
import { useLocation } from 'react-router-dom';

const TagsProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const productsByTag = useSelector(selectProductByTag);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  // Extract tag name from the URL pathname
  const pathnameParts = location.pathname.split('/');
  const tagName = pathnameParts[pathnameParts.length - 1]; // Assuming tag name is the last part of the pathname

  useEffect(() => {
    // Ensure tagName is not empty before dispatching
    if (tagName) {
      dispatch(fetchProductByTagsAsync(tagName));
    }
  }, [dispatch, tagName]);

  console.log(productsByTag);

  return (
    <div>
      <h2>Products by Tag: {tagName}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {productsByTag && (
        <ul>
          {productsByTag.map(product => (
            <li key={product.id}>
              {product.name} - {product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagsProduct;
