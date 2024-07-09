
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock } from 'react-icons/fi'; 
import Login from './Login'; 

const NotAuthenticatedPage = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center"
      >
        <div className="text-6xl text-primary-color mb-4">
          <FiLock /> {/* Icon for "locked" */}
        </div>
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-6">You need to be logged in to view this page.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-color text-white px-6 py-3 rounded-lg shadow-md cursor-pointer"
          onClick={handleOpenModal}
        >
          <span className="text-lg font-semibold">Login</span>
        </motion.div>
      </motion.div>

      {/* Modal Login */}
      {isLoginModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-2xl">
            <div className="rounded-lg shadow-lg bg-white outline-none focus:outline-none">
              <div className="relative flex-auto">
                <Login setModal={handleCloseModal} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NotAuthenticatedPage;
