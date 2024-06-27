import React, { useEffect } from "react";
import Divider from "../../assets/divider.png";
import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGiftedProductsAsync,
  selectGiftedProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../features/Products/AllProduct/productSlice";

function Gift() {
  const dispatch = useDispatch();
  const products = useSelector(selectGiftedProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  console.log(products);

  useEffect(() => {
    dispatch(fetchGiftedProductsAsync());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center font-Raleway py-10 ">
      <h1 className="md:text-4xl text-xl text-center font-semibold text-primary-color">
        Most Gifted
      </h1>
      <p className="text-md text-center">
        Check out the most gifted products by our customers
      </p>
      <img src={Divider} alt="" className=" object-cover" />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div className="flex md:flex-row flex-col gap-2 px-5 mt-5 ">
        {products.map(
          (product, index) =>
            index <= 3 && <ProductCard key={index} {...product.product} />
        )}
      </div>
    </div>
  );
}

export default Gift;
