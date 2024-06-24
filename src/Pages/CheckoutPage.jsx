import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../features/cart/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    phoneNumber: "",
    paymentMethod: "card", // Default payment method
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    if (cart.cartItems.length === 1) {
      navigate("/cart");
    }
  };

  const handlePlaceOrder = async () => {
    const { fullName, email, address, zipCode, city, state, phoneNumber, paymentMethod, cardNumber, expiryDate, cvv } = formData;

    // Form validation
    if (!fullName || !email || !address || !zipCode || !city || !state || !phoneNumber) {
      toast.error("Please fill in all required fields.", {
        position: 'top-center',
      })
      
      return;
    }

    // Prepare order details
    const orderDetails = {
      items: cart.cartItems,
      fullName, 
      email,
      address: `${address}, ${city}, ${state} - ${zipCode}`,
      phoneNumber,
      paymentMethod,
      cardNumber: paymentMethod === "card" ? cardNumber : null,
      expiryDate: paymentMethod === "card" ? expiryDate : null,
      cvv: paymentMethod === "card" ? cvv : null,
    };

    // try {
    //   await dispatch(placeOrderAsync(orderDetails)).unwrap();
    //   navigate('/checkout-success'); // Navigate to a success page or any other page you want
    // } catch (error) {
    //   console.error("Failed to place order: ", error);
    //   alert("Failed to place order. Please try again later.");
    // }
  };

  // Calculate subtotal
  const subtotal = cart.cartItems.reduce((total, cartItem) => {
    if (cartItem.size_chart && cartItem.size_chart[0]) {
      return total + cartItem.size_chart[0].total_price * (cartItem.cartQuantity || 1);
    }
    return total;
  }, 0);

  if (cart.cartItems.length === 0) {
    navigate("/cart");
    return null; // Optionally return a loader or message while redirecting
  }

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold mb-5">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Products */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {cart.cartItems.map((cartItem) => (
              <div key={cartItem.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-4">
                  <img src={cartItem.image} alt={cartItem.name} className="w-16 h-16 rounded-md object-cover" />
                  <div>
                    <p className="font-semibold">{cartItem.name}</p>
                    {cartItem.size_chart && cartItem.size_chart[0] && (
                      <p className="text-sm text-gray-500">
                        Weight: {cartItem.size_chart[0].size[0].weight} grams
                      </p>
                    )}
                    <p className="text-lg font-semibold">₹ {cartItem.size_chart[0].total_price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(cartItem)}
                  className="text-sm text-red-600 hover:text-red-700 focus:outline-none"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
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
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-primary-color">TOTAL (Incl of all Taxes.)</p>
              <p className="text-lg font-semibold text-primary-color">₹ {subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-green-500">YOU SAVE</p>
              <p className="text-lg font-semibold text-green-500">+ ₹ 0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details Form */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-8">
        <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullname" className="font-semibold">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold">Email</label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="address" className="font-semibold">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="font-semibold">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="city" className="font-semibold">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="state" className="font-semibold">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="font-semibold">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="paymentMethod" className="font-semibold">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
            {formData.paymentMethod === "card" && (
              <>
                <div>
                  <label htmlFor="cardNumber" className="font-semibold">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label htmlFor="expiryDate" className="font-semibold">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    placeholder="MM/YYYY"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="font-semibold">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="bg-primary-color text-white py-2 px-4 rounded hover:bg-red-700 mt-4"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
