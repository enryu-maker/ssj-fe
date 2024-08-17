import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline } from "react-icons/io5";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  fetchSingleProductAsync,
  selectProductsError,
  selectProductsLoading,
  selectSingleProduct,
} from "../features/Products/AllProduct/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/Wishlist/wishlistSlice";
import SuggestedProducts from "../Components/SuggestedProducts";
import RatingComp from "../Components/RatingComp";
import ReviewForm from "../Components/ReviewForm";

const SingleProduct = () => {
  const [openWeight, setOpenWeight] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thisProduct = useSelector(selectSingleProduct);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const [index, setIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  console.log(thisProduct);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (thisProduct?.size_chart && thisProduct?.size_chart.length > 0) {
      setSelectedWeight(thisProduct.size_chart[0]?.size?.[0]?.weight || "");
      setSelectedPrice(thisProduct.size_chart[0]?.total_price || "");
    }
  }, [thisProduct]);

  const images = [
    thisProduct?.image,
    ...(thisProduct?.other_images
      ? thisProduct.other_images.map((img) => img?.images)
      : []),
    thisProduct?.video,
  ].filter(Boolean);

  const handleWeightChange = (weight, price, index) => {
    setIndex(index);
    setSelectedWeight(weight);
    setSelectedPrice(price);
    setOpenWeight(false);
  };

  const handleAddToCart = () => {
    const productWithDetails = {
      ...thisProduct,
      selectedWeight,
      selectedPrice,
    };
    dispatch(addToCart(productWithDetails));
  };

  const handleBuy = () => {
    const productWithDetails = {
      ...thisProduct,
      selectedWeight,
      selectedPrice,
    };
    dispatch(addToCart(productWithDetails));
    navigate("/cart");
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const priceBreakup =
    thisProduct?.size_chart?.[0]?.price_breakdown?.map((item) => ({
      component: item.material,
      gold_rate: item.material_price,
      weight: `${item.weight} g`,
      discount: "0",
      gst: "0",
      final_value: item.price.toFixed(2),
    })) || [];

  const totalWeight = priceBreakup
    .reduce((sum, item) => {
      const weight = parseFloat(item.weight.replace(" g", ""));
      return sum + (isNaN(weight) ? 0 : weight);
    }, 0)
    .toFixed(2);

  const subtotal = priceBreakup
    .reduce((sum, item) => {
      const finalValue = parseFloat(item.final_value);
      return sum + (isNaN(finalValue) ? 0 : finalValue);
    }, 0)
    .toFixed(2);

  const makingChargesRaw =
    thisProduct?.size_chart?.[0]?.size?.[0]?.making_charges;
  const makingCharges = parseFloat(makingChargesRaw) || 0;

  const gst = thisProduct?.size_chart?.[0]?.price_breakdown?.gst || 0;

  const grandTotal = thisProduct?.size_chart?.[0]?.total_price;

  const actual_price = thisProduct?.size_chart?.[0]?.actual_price ?? undefined;

  const discountPercentage =
    Math.round(thisProduct?.size_chart?.[0]?.discount_percentage) || undefined;

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex flex-col items-center font-Raleway mt-5 min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error: {error}</h1>}
      {thisProduct && (
        <>
          <div className="flex flex-col md:flex-row md:gap-8 lg:gap-16 w-full lg:w-3/4">
            <div className="flex flex-col gap-5 w-full md:w-1/2">
              <div className="relative mt-5">
                {discountPercentage && (
                  <span className="bg-gradient-to-r from-green-400 to-green-600 text-white flex items-center justify-center w-12 h-12 px-3 py-1 text-xs absolute top-3 left-3 rounded-full shadow-lg z-30">
                    {discountPercentage}% OFF
                  </span>
                )}
                <div className="absolute bottom-2 right-3 z-50">
                  <RatingComp />
                </div>
                <Slider {...settings}>
                  {images.map((item, index) => (
                    <div key={index} className="w-full aspect-w-1 aspect-h-1">
                      {item.endsWith(".mp4") ? (
                        <video
                          src={item}
                          type="video/mp4"
                          muted
                          autoPlay
                          loop
                          className="w-full h-full object-cover rounded-xl"
                          alt={`Slide ${index}`}
                        />
                      ) : (
                        <img
                          src={item}
                          alt={`Slide ${index}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      )}
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 mt-5">
              <div className="flex justify-end">
                <button
                  onClick={() => handleAddToWishlist(thisProduct)}
                  className="flex flex-col items-center uppercase text-sm text-primary-color transition-transform duration-300 hover:scale-110"
                >
                  <IoHeartOutline className="w-6 h-6 md:w-8 md:h-8 text-primary-color" />
                </button>
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">
                {thisProduct?.name}
              </h1>
              <div className="mt-2 border-t border-primary-color" />
              <p className="font-light text-sm md:text-base mt-5">
                {thisProduct?.description}
              </p>
              <div className="mt-5 flex flex-col">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">
                  <span className="text-sm md:text-base lg:text-lg text-black">
                    Offer Price
                  </span>{" "}
                  ₹{Math.round(parseInt(selectedPrice))}
                </h1>
                <p className="text-sm md:text-base line-through text-red-500 mt-2">
                  <span className="text-sm md:text-base lg:text-lg">
                    Price:
                  </span>{" "}
                  ₹{Math.round(parseInt(actual_price))}
                </p>
                <p className="text-sm md:text-base">
                  Price Inclusive of all taxes. See full{" "}
                  <span className="text-primary-color">Price Details</span>
                </p>
              </div>
              <div className="flex md:flex-row gap-4 md:gap-8 flex-col justify-between md:w-1/2 mt-5 relative">
                <div
                  onClick={() => setOpenWeight(!openWeight)}
                  className="flex flex-col gap-2"
                >
                  <h1 className="font-medium text-base md:text-lg">
                    Gross Weight
                  </h1>
                  <div className="flex items-center justify-between border border-gray-300 md:w-32 w-full p-2 cursor-pointer rounded-md">
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
                          onClick={() =>
                            handleWeightChange(
                              size.size?.[0]?.weight,
                              size?.total_price,
                              index
                            )
                          }
                        >
                          {size.size?.[0]?.weight}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4 md:gap-8 mt-5">
                <div className="flex justify-center items-center gap-4 md:gap-6">
                  {thisProduct.size_chart?.[index]?.size.map((item) => (
                    <h1
                      key={item.material.name}
                      className="font-medium text-sm md:text-base"
                    >
                      {item?.material?.name}:{" "}
                      <span className="ml-2 text-sm md:text-base text-primary-color">
                        {item?.material?.purity} Karat
                      </span>
                      <h1 className="font-medium text-sm md:text-base text-primary-color">
                        HSN-HX2KX
                      </h1>
                    </h1>
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-5">
                <button
                  onClick={handleAddToCart}
                  className="border border-black w-full p-3 rounded-md cursor-pointer transition-transform duration-300 hover:bg-gray-200 text-sm md:text-base"
                >
                  Add To Cart
                </button>
                <button
                  onClick={handleBuy}
                  className="border bg-primary-color w-full p-3 rounded-md text-white transition-transform duration-300 hover:bg-red-700 text-sm md:text-base"
                >
                  Buy Now
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-5">
                <h1 className="text-xl md:text-2xl font-medium text-primary-color">
                  Still Confused What to Buy?
                </h1>
                <p className="text-sm md:text-base text-start">
                  Get on live video call with our design experts, or visit your
                  nearest SSJ store to get personalized recommendations!
                </p>
                <button
                  onClick={() => navigate("/contacts")}
                  className="w-full bg-primary-color p-3 rounded-md text-white transition-transform duration-300 hover:bg-primary-dark text-sm md:text-base"
                >
                  Book a Free Video Call
                </button>
              </div>
            </div>
          </div>

          {/* Price Breakup */}
          <div className="w-full  mt-10 px-4 sm:px-6 md:px-8 lg:px-12 space-y-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-color mb-4 md:mb-6 uppercase">
              Price Details
            </h1>
            <div className="overflow-x-auto">
              <div className="">
                <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 p-4 md:p-6 lg:p-8 text-sm md:text-base lg:text-lg font-medium text-primary-color border-b border-primary-color">
                  <span>Component</span>
                  <span>Material Rate</span>
                  <span>Weight</span>
                  <span>Discount</span>
                  <span>Final Value</span>
                </div>
                <div className="">
                  {priceBreakup.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 py-4 px-2 md:px-4 lg:px-6 text-sm md:text-base lg:text-lg"
                    >
                      <span className="font-medium">{item.component}</span>
                      <span>{item.gold_rate}</span>
                      <span>{item.weight}</span>
                      <span>{item.discount}</span>
                      <span className="font-medium">Rs {item.final_value}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 py-4 px-2 md:px-4 lg:px-6 text-sm md:text-base lg:text-lg font-medium">
                    <span>Making Charges</span>
                    <span>-</span>
                    <span>-</span>
                    <span>-</span>
                    <span>Rs {makingCharges.toFixed(2)}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 py-4 px-2 md:px-4 lg:px-6 text-sm md:text-base lg:text-lg border-t border-primary-color font-medium">
                    <span>Sub Total</span>
                    <span>-</span>
                    <span>-</span>
                    <span>-</span>
                    <span>Rs {subtotal}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 py-4 px-2 md:px-4 lg:px-6 text-sm md:text-base lg:text-lg border-t border-primary-color font-medium">
                    <span>Gst</span>
                    <span>-</span>
                    <span>-</span>
                    <span>-</span>
                    <span>Rs {gst}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 py-4 px-2 md:px-4 lg:px-6 text-sm md:text-base lg:text-lg border-t border-b border-primary-color font-medium">
                    <span>Hallmaking Charges</span>
                    <span>-</span>
                    <span>-</span>
                    <span>-</span>
                    <span>Rs {0}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 py-4 px-2 md:px-4 lg:px-6 text-sm md:text-base lg:text-lg font-medium text-gray-700">
                    <span>Total Weight</span>
                    <span>-</span>
                    <span>{totalWeight} g (Gross Weight)</span>
                    <span>-</span>
                    <span>-</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 py-4 px-2 md:px-4 lg:px-6 text-sm md:text-base lg:text-lg font-medium">
                    <span>Grand Total</span>
                    <span>-</span>
                    <span>-</span>
                    <span>-</span>
                    <span>Rs {grandTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
        {/* Review form  */}

        <div>
          <ReviewForm/>
        </div>

      {/* Related Products */}
      <div className="w-full mt-10 flex justify-center overflow-x-auto scrollbar-hide">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <SuggestedProducts
            currentProductId={thisProduct.id}
            Title={"You May Also Like"}
          />
        </div>
      </div>
      {/* Extra feature Products */}
      <div className="w-full mt-10 flex justify-center overflow-x-auto scrollbar-hide">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <SuggestedProducts
            currentProductId={thisProduct.id}
            Title={"New Jewellery Variety"}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
