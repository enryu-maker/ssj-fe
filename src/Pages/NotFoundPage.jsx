import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-screen bg-gray-100"
    >
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-color flex items-center justify-center">
          <span>4</span>
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              ease: "linear"
            }}
            className="inline-block"
          >
            o
          </motion.span>
          <span>4</span>
        </h1>
        <p className="text-2xl mt-4 text-gray-700">Oops! Page not found.</p>
        <p className="text-lg mt-2 text-gray-600">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={handleGoHome}
          className="mt-6 px-4 py-2 bg-primary-color text-white rounded hover:bg-red-700"
        >
          Go Home
        </button>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
