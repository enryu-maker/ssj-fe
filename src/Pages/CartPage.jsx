import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbPointerHeart } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../features/cart/cartSlice";


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
          <div className="flex flex-col gap-5 py-10 overflow-y-auto">
            {cart.cartItems.map((cartItem) => (
              <div key={cartItem.id} className="flex gap-5 items-start">
                <img
                  src={cartItem.image}
                  alt={cartItem.name}
                  className="w-48 h-48 rounded-md shadow-md"
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
                    <button onClick={() => dispatch(removeFromCart(cartItem))} className="text-xs font-semibold flex gap-2 items-center">
                      <RiDeleteBin6Line className="text-primary-color" />
                      Remove
                    </button>
                    <p>|</p>
                    <button className="text-xs font-semibold flex gap-2 items-center">
                      <TbPointerHeart className="text-primary-color" />
                      Move to Wishlist
                    </button>
                  </div>
                  {/* Quantity increment/decrement */}
                  <div className="flex items-center justify-between mt-2 md:w-[200px]">
                    <button
                      onClick={() => dispatch(decrementQuantity(cartItem))}
                      className="bg-gray-200 h-10 w-10 rounded-full flex justify-center items-center"
                    >
                      -
                    </button>
                    <p className="flex justify-center items-center font-medium text-md">
                      {cartItem.cartQuantity}N
                    </p>
                    <button
                      onClick={() => dispatch(incrementQuantity(cartItem))}
                      className="bg-gray-200 h-10 w-10 rounded-full flex justify-center items-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="flex flex-col items-center text-justify justify-between gap-5 py-10 bg-light-bg-color md:w-1/4 w-3/4 p-4">
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
            <button className="flex items-center text-lg font-semibold bg-primary-color text-white p-2 rounded-md hover:bg-red-700 hover:text-white delay-75 duration-75 ease-in">
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
