import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { clearCart, removeFromCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import api from "../helper/AxiosInstance";
import Modal from "react-modal";
import { createOrder } from "../features/orders/orderSlice";

Modal.setAppElement("#root");

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    street: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
    paymentMethod: "cod", // Default payment method
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    const {
      fullName,
      email,
      street,
      zipCode,
      city,
      state,
      country,
      phoneNumber,
      paymentMethod,
    } = formData;

    // Form validation
    if (
      !fullName ||
      !email ||
      !street ||
      !zipCode ||
      !city ||
      !state ||
      !country ||
      !phoneNumber
    ) {
      toast.error("Please fill in all required fields.", {
        position: "top-center",
      });
      return;
    }

    // Calculate total amount
    const totalAmount = cart.cartItems.reduce((total, cartItem) => {
      if (cartItem.size_chart && cartItem.size_chart[0]) {
        return (
          total + cartItem.size_chart[0].total_price * (cartItem.cartQuantity || 1)
        );
      }
      return total;
    }, 0);

    // Prepare order details
    const orderDetails = {
      items: cart.cartItems.map((cartItem) => ({
        product_id: cartItem.id,
        size_id: cartItem.size_chart[0]?.size[0]?.id,
        quantity: cartItem.cartQuantity || 1,
      })),
      address: {
        street,
        city,
        state,
        country,
        zipcode: zipCode,
      },
      contact_details: {
        name: fullName,
        contact_number: phoneNumber,
        email,
      },
      payment_method: paymentMethod,
      total: totalAmount,
    };

    try {
      const actionResult = await dispatch(createOrder(orderDetails)).unwrap();
      console.log(actionResult);

      if (paymentMethod === "online") {
        if (!actionResult || !actionResult.data || !actionResult.razor_pay_secrets) {
          throw new Error("Incomplete order details from server");
        }

        const razorpay = new window.Razorpay({
          key: actionResult.razor_pay_secrets.razor_pay_id,
          currency: actionResult.data.currency,
          order_id: actionResult.data.id,
          name: "Sai Shraddha Jewellers",
          description: "Order Payment",
          handler: async function (response) {
            const { razorpay_payment_id, razorpay_signature } = response;
            console.log(actionResult.order_id);
            console.log(`Bearer ${localStorage.getItem("accessToken")}`);

            try {
              const verifyResponse = await api.post(
                "/order/verify-order/",
                {
                  order_id: actionResult.order_id,
                  razorpay_payment_id: razorpay_payment_id,
                  razorpay_signature: razorpay_signature,
                  razorpay_order_id: actionResult.data.id,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                }
              );

              const verifyData = verifyResponse.data;
              console.log("Verify Response Data: ", verifyData);

              if (verifyData.status_code === 201) {
                toast.success("Order placed successfully!", {
                  position: "top-center",
                });
                dispatch(clearCart());
                navigate("/order-success");
              } else {
                setModalIsOpen(true);
                toast.error("Order failed to place. Please contact support or try again later.Click on 'Contact Us' button to reach out to our support team.", {
                  position: "top-center",
                });
                console.error("Payment failed: ", verifyData.message);
              }
            } catch (error) {
              console.error("Payment verification failed: ", error);
              setModalIsOpen(true);
            }
          },
          prefill: {
            name: fullName,
            email: email,
            contact: phoneNumber,
          },
          theme: {
            color: "#f2e9e9",
          },
        });

        razorpay.open();
      } else {
        toast.success("Order placed successfully!", { position: "top-center" });
        dispatch(clearCart());
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Failed to place order: ", error);
      toast.error("Failed to place order. Please try again later.", {
        position: "top-center",
      });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const redirectToContact = () => {
    navigate("/contact");
    closeModal();
  };

  // Calculate subtotal
  const subtotal = cart.cartItems.reduce((total, cartItem) => {
    if (cartItem.size_chart && cartItem.size_chart[0]) {
      return total + cartItem.size_chart[0].total_price * (cartItem.cartQuantity || 1);
    }
    return total;
  }, 0);

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold mb-5">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Products */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {cart?.cartItems?.map((cartItem) => (
              <div
                key={cartItem.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={cartItem.image}
                    alt={cartItem.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold">{cartItem.name}</p>
                    {cartItem?.size_chart && cartItem?.size_chart[0] && (
                      <p className="text-sm text-gray-500">
                        Weight: {cartItem?.size_chart[0]?.size[0]?.weight} grams
                      </p>
                    )}
                    <p className="text-lg font-semibold">
                      ₹ {cartItem?.size_chart[0]?.total_price?.toFixed(2)}
                    </p>
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
              <p className="text-sm font-semibold text-primary-color">
                TOTAL (Incl of all Taxes.)
              </p>
              <p className="text-lg font-semibold text-primary-color">
                ₹ {subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-green-500">YOU SAVE</p>
              <p className="text-lg font-semibold text-green-500">₹ 0.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Form */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-8">
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="street">
                Street
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="zipCode">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="city">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="state">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1" htmlFor="paymentMethod">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-4 px-4 py-2 bg-primary-color text-white font-semibold rounded-md hover:bg-primary-hover-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-opacity-50"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Payment Failure Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Payment Failure"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Payment Failure</h2>
          <p className="mb-4">
            Unfortunately, your payment could not be processed. Please try again or contact our support team for assistance.
          </p>
          <button
            onClick={redirectToContact}
            className="px-4 py-2 bg-primary-color text-white font-semibold rounded-md hover:bg-primary-hover-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-opacity-50"
          >
            Contact Support
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
