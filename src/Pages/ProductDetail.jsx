import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline } from "react-icons/io5";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import {
  fetchAllProductsAsync,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../features/Products/AllProduct/productSlice";
import { addToCart} from "../features/cart/cartSlice";
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const [openWeight, setOpenWeight] = useState(false);
 const { productId } = useParams();
 const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  // useEffect(()=>{
  //   dispatch(fetchSingleProductAsync(productId));
  // },[dispatch, productId]);

  

  const thisProduct = products.find((prod) => prod.id === parseInt(productId));

  const [activeImg, setActiveImage] = useState(thisProduct?.image || '');
  const [selectedWeight, setSelectedWeight] = useState(thisProduct?.size_chart?.[0]?.size?.[0]?.weight || '');

  const images = [
    thisProduct.image, // Assuming thisProduct.image is defined
    ...(thisProduct.other_images ? thisProduct.other_images.map(img => img.images) : [])
  ];

  const handleAddToCart = (product) => {
     dispatch(addToCart(product));
     navigate('/cart');
  }


  return (
    <div className="grid md:grid-cols-2 gap-5 px-20 font-Raleway mt-5">
      {
        loading && (
          <h1>Loading...</h1>
        )
      }
      {
        error && (
          <h1>Error: {error}</h1>
        )
      }
      {
        !thisProduct && (
          <h1>Product not found</h1>
        )
      }
      <div className="flex flex-col gap-6 lg:w-3/4 sm:w-full">
        <img
          src={activeImg}
          alt={thisProduct.name}
          className="w-full aspect-square object-cover rounded-xl"
        />
        <div className="flex md:flex-row flex-wrap justify-between gap-2 h-24">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={thisProduct.name}
              className="w-24 h-24 rounded-md cursor-pointer"
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <div className="flex justify-between">
          <p className="font-thin text-md">{thisProduct.id}</p>
          <Link
            to="#/"
            className="flex flex-col items-center uppercase text-sm text-primary-color transition-all ease-linear hover:scale-110"
          >
            <IoHeartOutline className="w-8 h-8 text-primary-color" />
          </Link>
        </div>
        <h1 className="text-2xl font-medium">{thisProduct.name}</h1>
        <div className="mt-2 border border-primary-color" />
        <p className="font-light text-sm mt-5">{thisProduct.description}</p>
        <div className="mt-5 flex flex-col">
          <h1 className="text-2xl font-semibold text-black">
            <span className="text-sm text-black">Offer Price</span> ₹
            {thisProduct.size_chart[0].total_price}
          </h1>
          <p className="text-sm">
            Price Inclusive of all taxes. See full{" "}
            <span className="text-primary-color">Price Breakup</span>
          </p>
        </div>
        <div className="flex md:flex-row gap-5 flex-col justify-between md:w-1/2 mt-5 relative">
          <div
            onClick={() => {
              setOpenWeight(!openWeight);
            }}
            className="flex flex-col gap-2"
          >
            <h1 className="font-medium">Gross Weight</h1>
            <div className="flex items-center justify-between border md:w-32 w-full p-2 cursor-pointer rounded-md">
              <p className="text-md font-medium">{selectedWeight} g</p>
              {openWeight ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
            </div>
            {openWeight && (
              <div className="absolute md:bottom-0 md:w-32 w-full bg-white shadow-lg rounded-md p-2 mt-2">
                {thisProduct.size_chart[0].size.map((weight, index) => (
                  <p
                    key={index}
                    className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                    onClick={() => {
                      setSelectedWeight(weight.weight);
                      setOpenWeight(false);
                    }}
                  >
                    {weight.weight} g
                  </p>
                ))}
              </div>
            )}
          </div>
         
        </div>
        <div className="flex gap-5 mt-5">
          <div>
            <h2 className="font-medium text-md">Gold Purity: 24 Karat</h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <button onClick={()=> handleAddToCart(thisProduct)} className="border border-black w-full p-3 rounded-md cursor-pointer">
            Add To Cart
          </button>
          <button className="border bg-primary-color w-full p-3 rounded-md text-white hover:bg-red-700">
            Buy Now
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <h1 className="text-2xl font-medium text-primary-color">
            Still Confused What to Buy?
          </h1>
          <p className="text-start">
            Get on live video call with our design experts, or visit your
            nearest SSJ store to get a closer look and know more about the
            product.
          </p>
          <button className="border border-black w-full p-3 rounded-md mt-5">
            Talk to an Expert
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
