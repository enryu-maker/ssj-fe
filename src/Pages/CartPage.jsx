import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbPointerHeart } from "react-icons/tb";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/Wishlist/wishlistSlice";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate subtotal
  const subtotal = cart.cartItems.reduce((total, cartItem) => {
    if (cartItem.size_chart && cartItem.size_chart[0]) {
      return total + cartItem.size_chart[0].total_price * (cartItem.cartQuantity || 1);
    }
    return total;
  }, 0);

  const handleMoveToWishlist = (cartItem) => {
    // Dispatch action to add to wishlist
    dispatch(addToWishlist(cartItem));

    // Dispatch action to remove from cart
    dispatch(removeFromCart(cartItem));
  };

  return (
    <>
      {cart.cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-semibold text-primary-color">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-gray-400">You have no items in your cart.</p>
          <Link
            to="/"
            className="text-center border border-black p-3 rounded-md mt-5 hover:bg-primary-color hover:text-white"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-around font-Raleway px-5">
          <div className="flex flex-col gap-5 py-10 overflow-y-auto md:max-w-2xl md:w-full">
            {cart.cartItems.map((cartItem) => (
              <motion.div
                key={cartItem.id}
                className="flex flex-col md:flex-row gap-5 items-start"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={cartItem.image}
                  alt={cartItem.name}
                  className="w-full md:w-48 h-auto rounded-md shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-5">
                    <h2 className="text-2xl font-semibold text-primary-color">
                      {cartItem.name}
                    </h2>
                  </div>
                  {cartItem.size_chart && cartItem.size_chart[0] ? (
                    <>
                      <span className="text-gray-400">
                        Weight: {cartItem.size_chart[0].size[0].weight} grams
                      </span>
                      <p className="text-xl font-semibold">
                        ₹ {cartItem.size_chart[0].total_price.toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <span className="text-gray-400">Size chart not available</span>
                  )}
                  <div className="flex gap-3 items-center">
                    <motion.button
                      onClick={() => dispatch(removeFromCart(cartItem))}
                      className="text-xs font-semibold flex gap-2 items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <RiDeleteBin6Line className="text-primary-color" />
                      Remove
                    </motion.button>
                    <p>|</p>
                    <motion.button
                      onClick={() => handleMoveToWishlist(cartItem)}
                      className="text-xs font-semibold flex gap-2 items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <TbPointerHeart className="text-primary-color" />
                      Move to Wishlist
                    </motion.button>
                  </div>
                  {/* Quantity increment/decrement */}
                  <div className="flex items-center justify-between mt-2 md:w-[200px]">
                    <motion.button
                      onClick={() => dispatch(decrementQuantity(cartItem))}
                      className="bg-gray-200 h-10 w-10 rounded-full flex justify-center items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <p className="flex justify-center items-center font-medium text-md">
                      {cartItem.cartQuantity}
                    </p>
                    <motion.button
                      onClick={() => dispatch(incrementQuantity(cartItem))}
                      className="bg-gray-200 h-10 w-10 rounded-full flex justify-center items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            className="flex flex-col items-center text-justify justify-between gap-5 py-10 bg-light-bg-color md:w-1/4 w-full p-4 md:max-w-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-semibold text-primary-color">
              ORDER SUMMARY
            </h1>
            <div className="flex flex-col justify-between gap-5">
              <div className="flex justify-between">
                <p className="text-sm">Sub Total</p>
                <p className="text-sm">₹ {subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Discount</p>
                <p className="text-sm">- ₹ 0</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Delivery Charge</p>
                <p className="text-sm">FREE</p>
              </div>
              <div className="flex justify-between gap-2">
                <p className="text-sm font-semibold text-primary-color">
                  TOTAL (Incl of all Taxes.)
                </p>
                <p className="text-lg font-semibold text-primary-color">
                  ₹ {subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between gap-2">
                <p className="text-lg font-semibold text-green-500">YOU SAVE</p>
                <p className="text-lg font-semibold text-green-500">+ ₹ 0</p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={'/checkout'}
                className="flex items-center text-lg font-semibold bg-primary-color text-white p-2 rounded-md hover:bg-red-700 hover:text-white w-full md:w-auto"
              >
                Proceed To Checkout
              </Link>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CartPage;

