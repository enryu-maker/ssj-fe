import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchCollectionByIdAsync,
  selectCollection,
  selectCollectionsError,
  selectCollectionsLoading,
} from '../features/Products/collectios/collectionSlice'
import ProductCard from '../Components/ProductCard';

const CollectionProduct = () => {
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const collection = useSelector(selectCollection);
  const loading = useSelector(selectCollectionsLoading);
  const error = useSelector(selectCollectionsError);

  useEffect(() => {
    if (collectionId) {
      dispatch(fetchCollectionByIdAsync(collectionId));
    }
  }, [dispatch, collectionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!collection || !collection.batch) {
    return <div>Collection not found</div>;
  }

  return (
    <div>
      <h1 className='md:text-4xl text-2xl text-center font-semibold text-primary-color uppercase'>{collection.name}</h1>
      <div className="grid md:grid-cols-4 gap-5 p-5 mt-5">
        {collection?.batch?.map(item => (
          <div key={item.id} className="product-card">
            <ProductCard {...item.product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionProduct;
