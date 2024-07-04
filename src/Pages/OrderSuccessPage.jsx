import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const handleShopMore = () => {
    navigate("/"); // Navigate to the home page or another relevant page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              rotate: [0, 10, -10, 0], // Rotate animation
              scale: [1, 1.2, 1], // Pulse animation
            }}
            transition={{
              rotate: { duration: 0.5, ease: "easeInOut" },
              scale: { duration: 0.5, ease: "easeInOut" },
              repeat: Infinity, // Repeat the animation
              repeatType: "reverse", // Reverse on repeat
            }}
          >
            <path d="M5 13l4 4L19 7" />
          </motion.svg>
        </motion.div>
        <h1 className="text-2xl font-semibold text-center text-green-600 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 text-center mb-6">
          Thank you for your purchase. Your order is being processed and you will receive a confirmation email shortly.
        </p>
        <div className="flex justify-center">
          <motion.button
            onClick={handleShopMore}
            className="bg-primary-color text-white py-2 px-4 rounded hover:bg-primary-dark"
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Shop More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;
