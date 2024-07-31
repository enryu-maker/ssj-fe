import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CouponClaim = () => {
  const [coupons, setCoupons] = useState([
    { code: "SUMMER20", description: "20% off on summer items", details: "Valid until August 31, 2024. Applicable on all summer collections.", isClaimed: false },
    { code: "WINTER15", description: "15% off on winter apparel", details: "Valid until December 31, 2024. Limited to winter clothing.", isClaimed: true },
    { code: "SPRING10", description: "10% off on spring fashion", details: "Valid until May 31, 2024. Applies to selected items.", isClaimed: false },
    { code: "FALL25", description: "25% off on fall collection", details: "Valid until November 30, 2024. Includes all fall items.", isClaimed: false },
    { code: "NEWYEAR30", description: "30% off for the new year", details: "Valid from January 1 to January 31, 2025. No minimum purchase required.", isClaimed: true },
    { code: "EASTER10", description: "10% off on Easter specials", details: "Valid until April 30, 2024. Applies to Easter-themed items.", isClaimed: false },
    { code: "BLACKFRIDAY50", description: "50% off on Black Friday sale", details: "Valid from November 24 to November 30, 2024. No exclusions.", isClaimed: false },
    { code: "CYBERMONDAY25", description: "25% off on Cyber Monday deals", details: "Valid from December 1 to December 7, 2024. Online purchases only.", isClaimed: false },
    { code: "VALENTINE15", description: "15% off on Valentine’s Day gifts", details: "Valid until February 14, 2025. Applies to all gifts and flowers.", isClaimed: true },
    { code: "SUMMER30", description: "30% off on summer clearance", details: "Valid until September 30, 2024. Discounts on all summer stock.", isClaimed: false },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCoupons = coupons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(coupons.length / itemsPerPage);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const controls = useAnimation();

  const handleClaimCoupon = (index) => {
    if (coupons[index].isClaimed) return;

    const updatedCoupons = [...coupons];
    updatedCoupons[index].isClaimed = true;
    setCoupons(updatedCoupons);

    setModalMessage(`Coupon ${updatedCoupons[index].code} Added to Your Profile!`);
    setModalOpen(true);

    controls.start({
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }).then(() => {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3 }
      });
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className='p-6 md:p-8 min-h-screen'>
      <h1 className="text-4xl font-bold mb-8 text-center">Coupon Claims</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
        {currentCoupons.map((coupon, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 border border-transparent shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="bg-white bg-opacity-20 text-white p-3 rounded-full mr-3 text-2xl shadow-md">
                  💡
                </span>
                <span className={`font-bold text-xl ${coupon.isClaimed ? "text-gray-400" : "text-white"}`}>
                  {coupon.isClaimed ? "Claimed" : coupon.code}
                </span>
              </div>
              <p className="text-2xl font-semibold mb-3 text-white">{coupon.description}</p>
              <p className="text-gray-200 text-sm">{coupon.details}</p>
              <motion.button
                className={`mt-4 ${
                  coupon.isClaimed
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white"
                } px-6 py-3 rounded-md w-full shadow-lg`}
                whileHover={!coupon.isClaimed ? { scale: 1.05 } : {}}
                whileTap={!coupon.isClaimed ? { scale: 0.95 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
                disabled={coupon.isClaimed}
                onClick={() => handleClaimCoupon(index)}
                animate={controls}
              >
                {coupon.isClaimed ? "Claimed" : "Claim"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-red-600 text-white px-4 py-2 rounded-md disabled:opacity-50 shadow-lg"
        >
          Previous
        </button>
        <span className="text-lg text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-red-600 text-white px-4 py-2 rounded-md disabled:opacity-50 shadow-lg"
        >
          Next
        </button>
      </div>

      {/* Modern Inline Modal */}
      {modalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 p-8 rounded-xl shadow-lg max-w-md w-full relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center text-white">{modalMessage}</h2>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-2 hover:bg-gray-200 focus:outline-none"
            >
              ✕
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-red-600 text-white px-6 py-3 rounded-md w-full mt-4 shadow-lg hover:bg-blue-700"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default CouponClaim;
