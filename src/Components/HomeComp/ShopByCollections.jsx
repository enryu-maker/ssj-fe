import React, { useEffect } from "react";
import Divider from "../../assets/divider.png";
import { Collection } from "../../data";
import CollectionCard from "../CollectionCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCollectionsAsync,
  selectCollections,
  selectCollectionsError,
  selectCollectionsLoading,
} from "../../features/Products/collectios/collectionSlice";

function ShopByCollections() {
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);
  const loading = useSelector(selectCollectionsLoading);
  const error = useSelector(selectCollectionsError);

  useEffect(() => {
    dispatch(fetchCollectionsAsync());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center font-Raleway py-10 ">
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <h1 className="md:text-4xl text-xl text-center font-semibold text-primary-color">
        Shop By Collections
      </h1>
      <p className="md:text-md text-center">
        Whatever the occasion, we've got a beautiful piece of jewellery for you.
      </p>
      <img src={Divider} alt="" className=" object-cover" />

      <div className="flex md:flex-row flex-col gap-2 px-5 mt-5 ">
        {collections.map((collection, index) => (
          <CollectionCard key={index} {...collection} />
        ))}
      </div>
    </div>
  );
}

export default ShopByCollections;
