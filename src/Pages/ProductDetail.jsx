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

function ProductDetail() {
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

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (thisProduct) {
      if (thisProduct?.size_chart && thisProduct?.size_chart.length > 0) {
        setSelectedWeight(thisProduct?.size_chart[0]?.size?.[0]?.weight || "");
        setSelectedPrice(thisProduct?.size_chart[0]?.total_price || "");
      }
    }
  }, [thisProduct]);

  const images = [
    thisProduct?.image,
    ...(thisProduct?.other_images
      ? thisProduct?.other_images.map((img) => img?.images)
      : []),
  ];

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

  // Calculate price breakup
  const priceBreakup =
    thisProduct?.size_chart?.map((item) => ({
      component: "Base Component",
      gold_rate: item.size[0].material.current_price,
      weight: `${item.size[0].weight} g`,
      discount: "0", // Assuming no discount
      final_value: `Rs ${item.total_price.toFixed(2)}`,
    })) || [];

  const totalWeight = priceBreakup
    .reduce((sum, item) => {
      const weight = parseFloat(item.weight.replace(" g", ""));
      return sum + (isNaN(weight) ? 0 : weight);
    }, 0)
    .toFixed(3);

  const subtotal = priceBreakup
    .reduce((sum, item) => {
      const finalValue = parseFloat(
        item.final_value.replace("Rs ", "").replace(",", "")
      );
      return sum + (isNaN(finalValue) ? 0 : finalValue);
    }, 0)
    .toFixed(2);

  // Get making charges from the product data
  const makingChargesRaw =
    thisProduct?.size_chart?.[0]?.size?.[0]?.making_charges;
  const makingCharges = Number(makingChargesRaw) || 0;
  const grandTotal = parseFloat(subtotal).toFixed(2);

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
    <div className="flex flex-col items-center font-Raleway mt-5 min-h-screen px-5 sm:px-10 md:px-20 overflow-hidden">
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error: {error}</h1>}
      {thisProduct && (
        <>
          <div className="flex flex-col md:flex-row md:gap-20 w-full lg:w-3/4">
            <div className="flex flex-col gap-5 w-full md:w-1/2 ">
              <div className="relative mt-5">
                <Slider {...settings}>
                  {images.map((item, index) => (
                    <div key={index} className="w-full aspect-square">
                      {typeof item === "string" && item.endsWith(".mp4") ? (
                        <video
                          src={item}
                          controls
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
                  <IoHeartOutline className="w-8 h-8 text-primary-color" />
                </button>
              </div>
              <h1 className="text-2xl font-medium">{thisProduct?.name}</h1>
              <div className="mt-2 border-t border-primary-color" />
              <p className="font-light text-sm mt-5">
                {thisProduct?.description}
              </p>
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
              <div className="flex gap-5 mt-5">
                <div className="flex justify-center items-center gap-5">
                  {thisProduct.size_chart?.[index]?.size.map((item) => (
                    <h1
                      key={item.material.name}
                      className="font-medium text-md"
                    >
                      {item?.material?.name}:{" "}
                      <span className="ml-2 text-lg text-primary-color">
                        {item?.material?.purity} Karat
                      </span>
                    </h1>
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5 mt-5">
                <button
                  onClick={handleAddToCart}
                  className="border border-black w-full p-3 rounded-md cursor-pointer transition-transform duration-300 hover:bg-gray-200"
                >
                  Add To Cart
                </button>
                <button
                  onClick={handleBuy}
                  className="border bg-primary-color w-full p-3 rounded-md text-white transition-transform duration-300 hover:bg-red-700"
                >
                  Buy Now
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-5">
                <h1 className="text-2xl font-medium text-primary-color">
                  Still Confused What to Buy?
                </h1>
                <p className="text-start">
                  Get on live video call with our design experts, or visit your
                  nearest SSJ store to get personalized recommendations!
                </p>
                <button className="w-full bg-primary-color p-3 rounded-md text-white transition-transform duration-300 hover:bg-primary-dark">
                  Book a Free Video Call
                </button>
              </div>
            </div>
          </div>
          {/* Price Breakup */}
          <div className="w-full lg:w-4/5 xl:w-3/5 mt-10 px-4 md:px-6 lg:px-8 xl:px-12 space-y-10 ">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-color mb-4 md:mb-6">
              Price Breakup
            </h1>
            <div className="bg-gray-50 p-4 md:p-6 lg:p-8 xl:p-10 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm md:text-base lg:text-lg mb-4">
                <span className="font-semibold">Component</span>
                <span className="font-semibold">Gold Rate</span>
                <span className="font-semibold">Weight</span>
                <span className="font-semibold">Discount</span>
                <span className="font-semibold">Final Value</span>
              </div>
              <div className="border-t border-gray-200">
                {priceBreakup.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 py-2 text-sm md:text-base lg:text-lg border-b border-gray-200"
                  >
                    <span>{item.component}</span>
                    <span>{item.gold_rate}</span>
                    <span>{item.weight}</span>
                    <span>{item.discount}</span>
                    <span className="font-semibold">{item.final_value}</span>
                  </div>
                ))}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-2 text-sm md:text-base lg:text-lg border-t border-gray-200 font-semibold">
                  <span>Total Weight</span>
                  <span></span>
                  <span>{totalWeight} g</span>
                  <span></span>
                  <span></span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-2 text-sm md:text-base lg:text-lg border-b border-gray-200 font-semibold">
                  <span>Grand Total</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>Rs {subtotal}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-2 text-sm md:text-base lg:text-lg border-t border-gray-200 font-semibold">
                  <span>Making Charges</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>Rs {makingCharges.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-2 text-sm md:text-base lg:text-lg border-t border-gray-200 font-semibold">
                  <span>Grand Total</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>Rs {grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Related Products */}
      <div className="w-full mt-10 flex justify-center overflow-x-auto scrollbar-hide">
        <SuggestedProducts currentProductId={thisProduct.id} />
      </div>
    </div>
  );
}

export default ProductDetail;
