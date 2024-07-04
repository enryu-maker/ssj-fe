// src/components/NotAuthenticatedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotAuthenticatedPage = () => {
  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h1 className="text-2xl font-semibold mb-4">Access Denied</h1>
        <p className="mb-4">You need to be logged in to view this page.</p>
        {/*TODO: Add the model here */}
        <Link to="/login">
          <button className="bg-primary-color text-white px-4 py-2 rounded">
            Go to Login
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotAuthenticatedPage;
