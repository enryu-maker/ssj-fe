import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Divider from "../../assets/divider.png";
import CollectionCard from "../CollectionCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCollectionsAsync,
  selectCollections,
  selectCollectionsError,
  selectCollectionsLoading,
} from "../../features/Products/collectios/collectionSlice";
import { useInView } from "react-intersection-observer";

function ShopByCollections() {
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);
  const loading = useSelector(selectCollectionsLoading);
  const error = useSelector(selectCollectionsError);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    dispatch(fetchCollectionsAsync());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center font-Raleway py-10">
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <motion.h1
        className="md:text-4xl text-xl text-center font-semibold text-primary-color uppercase"
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        Shop By Collections
      </motion.h1>
      <motion.p
        className="md:text-md text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        Whatever the occasion, we've got a beautiful piece of jewellery for you.
      </motion.p>
      <motion.img
        src={Divider}
        alt=""
        className="object-cover"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.75, ease: "easeOut" }}
      />

      <div ref={ref} className="flex md:flex-row flex-col gap-2 px-5 mt-5">
        {collections.map((collection, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <CollectionCard {...collection} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ShopByCollections;
