import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectionsAsync, selectCollections, selectCollectionsError, selectCollectionsLoading } from '../features/Products/collectios/collectionSlice';
import CollectionCard from '../Components/CollectionCard';

const Collections = () => {
    const dispatch = useDispatch();
    const collections = useSelector(selectCollections);
    
    const loading = useSelector(selectCollectionsLoading);
    const error = useSelector(selectCollectionsError);
  
    useEffect(() => {
      dispatch(fetchCollectionsAsync());
    }, [dispatch]);


  return (
    <div className='flex flex-col items-center mt-5 space-y-10 px-8'>
        <h1 className='md:text-4xl text-2xl text-center font-semibold text-primary-color uppercase'>Collections</h1>
        {loading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        <div className='grid md:grid-cols-3 flex-col gap-5 px-5 mt-5 '>
        {collections.map((collection) => (
          <div  key={collection.id}>
            <CollectionCard {...collection} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Collections