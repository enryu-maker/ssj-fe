import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { fetchSingleProductAsync, selectProductsError, selectProductsLoading, selectSingleProduct } from "../features/Products/AllProduct/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/Wishlist/wishlistSlice";

function ProductDetail() {
  const [openWeight, setOpenWeight] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const thisProduct = useSelector(selectSingleProduct);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const [index,setIndex] = useState(0)
  const [activeImg, setActiveImage] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (thisProduct) {
      console.log(thisProduct)
      setActiveImage(thisProduct?.image);
      if (thisProduct?.size_chart && thisProduct?.size_chart?.length > 0) {
        setSelectedWeight(thisProduct?.size_chart[0]?.size?.[0]?.weight || '');
        setSelectedPrice(thisProduct?.size_chart[0]?.total_price || '');
      }
    }
  }, [thisProduct]);

  const images = [
    thisProduct?.image,
    ...(thisProduct?.other_images ? thisProduct?.other_images?.map(img => img?.images) : [])
  ];

  // Handle weight change
  const handleWeightChange = (weight, price,index) => {
    setIndex(index)
    setSelectedWeight(weight);
    setSelectedPrice(price)
    setOpenWeight(false);
  };

  // Adding product to the cart
  const handleAddToCart = () => {
    const productWithDetails = {
      ...thisProduct,
      selectedWeight,
      selectedPrice
    };
    dispatch(addToCart(productWithDetails));
    navigate('/cart');
  };

  // Adding product to the wishlist
  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  return (
    <div className="grid md:grid-cols-2 gap-5 px-20 font-Raleway mt-5 min-h-screen place-items-center">
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error: {error}</h1>}
      {thisProduct && (
        <>
          <div className="flex flex-col gap-5 lg:w-3/4 sm:w-full">
            <img
              src={activeImg}
              alt={thisProduct.name}
              className="w-full aspect-square object-cover rounded-xl"
            />
            <div className="flex md:flex-row flex-wrap justify-between gap-2 h-24 mb-8">
              {images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={thisProduct.name}
                  className="w-20 h-20 rounded-md cursor-pointer"
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col md:mt-0 mt-24">
            <div className="flex justify-end">
              <button onClick={() => handleAddToWishlist(thisProduct)} className="flex flex-col items-center uppercase text-sm text-primary-color transition-all ease-linear hover:scale-110">
                <IoHeartOutline className="w-8 h-8 text-primary-color" />
              </button>
            </div>
            <h1 className="text-2xl font-medium">{thisProduct?.name}</h1>
            <div className="mt-2 border border-primary-color" />
            <p className="font-light text-sm mt-5">{thisProduct?.description}</p>
            <div className="mt-5 flex flex-col">
              <h1 className="text-2xl font-semibold text-black">
                <span className="text-sm text-black">Offer Price</span> ₹
                {Math.round(parseInt(selectedPrice))}
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
                  <p className="text-md font-medium">{selectedWeight}</p>
                  {openWeight ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </div>
                {openWeight && (
                  <div className="absolute md:bottom-0 md:w-32 w-full bg-white shadow-lg rounded-md p-2 mt-2">
                    {thisProduct?.size_chart?.map((size, index) => (
                      <p
                        key={index}
                        className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                        onClick={() => handleWeightChange(size.size?.[0]?.weight, size?.total_price,index)}
                      >
                        {size.size?.[0]?.weight}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-5 mt-5">
              <div className="flex justify-center items-center gap-5">
                {thisProduct.size_chart?.[index]?.size.map((item) => (
                  <h1 key={item.material.name} className="font-medium text-md">
                    {item?.material?.name}: 
                    <span className="ml-2 text-lg text-primary-color">
                      {item?.material?.purity} Karat
                    </span>
                  </h1>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 mt-5">
              <button onClick={handleAddToCart} className="border border-black w-full p-3 rounded-md cursor-pointer">
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
        </>
      )}
    </div>
  );
}

export default ProductDetail;
