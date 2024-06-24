import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbPointerHeart } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { removeFromWishlist } from "../features/Wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

const WishlistPage = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = wishlist.wishlistItems.reduce((total, wishlistItem) => {
    if (wishlistItem.size_chart && wishlistItem.size_chart[0]) {
      return total + wishlistItem.size_chart[0].total_price;
    }
    return total;
  }, 0);

  const handleMoveToCart = (wishlistItem) => {
    // Dispatch action to remove from wishlist
    dispatch(removeFromWishlist(wishlistItem));

    // Dispatch action to add to cart
    dispatch(addToCart(wishlistItem));
    // Navigate to cart page
    navigate("/cart");
  };

  return (
    <>
      {wishlist.wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-semibold text-primary-color">
            Your Wishlist is Empty
          </h1>
          <p className="text-lg text-gray-400">You have no items in your wishlist.</p>
          <Link
            to="/"
            className="text-center border border-black p-3 rounded-md mt-5 hover:bg-primary-color hover:text-white"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-around font-Raleway px-5">
          <div className="flex flex-col gap-5 py-10 overflow-y-auto md:max-w-2xl md:w-full">
            {wishlist.wishlistItems.map((wishlistItem) => (
              <div key={wishlistItem.id} className="flex flex-col md:flex-row gap-5 items-start">
                {/* Wishlist item details */}
                <div className="flex gap-5 items-start">
                  <img
                    src={wishlistItem.image}
                    alt={wishlistItem.name}
                    className="w-48 h-48 rounded-md shadow-md"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-5">
                      <h2 className="text-xl md:text-2xl font-semibold text-primary-color">
                        {wishlistItem.name}
                      </h2>
                    </div>
                    {wishlistItem.size_chart && wishlistItem.size_chart[0] ? (
                      <>
                        <span className="text-gray-400">
                          Weight: {wishlistItem.size_chart[0].size[0].weight} grams
                        </span>
                        <p className="text-lg font-semibold">
                          ₹ {wishlistItem.size_chart[0].total_price.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <span className="text-gray-400">Size chart not available</span>
                    )}
                    <div className="flex gap-3 items-center mt-2 md:mt-0">
                      {/* Remove from wishlist button */}
                      <button onClick={() => dispatch(removeFromWishlist(wishlistItem))} className="text-xs font-semibold flex gap-2 items-center">
                        <RiDeleteBin6Line className="text-primary-color" />
                        Remove
                      </button>
                      <p>|</p>
                      {/* Move to Cart button */}
                      <button onClick={() => handleMoveToCart(wishlistItem)} className="text-xs font-semibold flex gap-2 items-center">
                        <TbPointerHeart className="text-primary-color" />
                        Move to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Wishlist summary */}
          <div className="hidden md:flex flex-col items-center text-justify justify-between gap-5 py-10 bg-light-bg-color md:w-1/4 w-full p-4 md:max-w-sm">
            <h1 className="text-xl md:text-2xl font-semibold text-primary-color">
              WISHLIST SUMMARY
            </h1>
            <div className="flex flex-col justify-between gap-5 mt-5">
              <div className="flex justify-between">
                <p className="text-sm md:text-base">Sub Total</p>
                <p className="text-sm md:text-base">₹ {subtotal.toFixed(2)}</p> {/* Display subtotal */}
              </div>
              <div className="flex justify-between">
                <p className="text-sm md:text-base">Discount</p>
                <p className="text-sm md:text-base">- ₹ 0.00</p> {/* Hardcoded for this example */}
              </div>
              <div className="flex justify-between">
                <p className="text-sm md:text-base">Delivery Charge</p>
                <p className="text-sm md:text-base">FREE</p> {/* Hardcoded for this example */}
              </div>
              <div className="flex justify-between gap-2">
                <p className="text-sm md:text-base font-semibold text-primary-color">
                  TOTAL (Incl of all Taxes.)
                </p>
                <p className="text-base md:text-lg font-semibold text-primary-color">
                  ₹ {subtotal.toFixed(2)}
                </p> {/* Display total */}
              </div>
              <div className="flex justify-between gap-2">
                <p className="text-base md:text-lg font-semibold text-green-500">YOU SAVE</p>
                <p className="text-base md:text-lg font-semibold text-green-500">+ ₹ 0.00</p> {/* Hardcoded for this example */}
              </div>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WishlistPage;
