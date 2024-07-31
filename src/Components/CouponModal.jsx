import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupons } from "../features/coupons/couponSlice";

const CouponModal = ({
  isOpen,
  onClose,
  couponCode,
  onInputChange,
  onApplyCoupon,
}) => {
  const dispatch = useDispatch();
  const { coupons, status, error } = useSelector((state) => state.coupons);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCoupons());
    }
  }, [dispatch, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex justify-end z-50"
    >
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white shadow-lg h-full overflow-auto">
        <div className="p-4 sm:p-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none text-xl"
          >
            &times;
          </button>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={onInputChange}
              className="border rounded w-full p-2 mb-4"
            />
            <motion.button
              onClick={() => onApplyCoupon({ code: couponCode })}
              className="bg-red-600 text-white px-4 py-2 rounded w-full"
              whileHover={{ scale: 1.05, backgroundColor:  "rgb(220 38 38)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              APPLY
            </motion.button>
          </div>
          <div className="mt-6">
            <h2 className="font-bold mb-4">AVAILABLE COUPONS</h2>
            {coupons.map((item) => {
              const { coupon } = item;
              return (
                <Coupon
                  key={coupon.id}
                  id={coupon.id}
                  code={coupon.code}
                  description={coupon.description}
                  details={`Discount Amount: ${coupon.discount_amount}`}
                  discount_amount={coupon.discount_amount}
                  isUsed={item.is_used}
                  onApplyCoupon={onApplyCoupon}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Coupon = ({ id, code, description, details, isUsed, onApplyCoupon }) => {
  return (
    <motion.div
    className="bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 border border-transparent shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        <span className="bg-yellow-100 text-yellow-800 p-2 rounded-full mr-3 text-2xl shadow-md">
          💡
        </span>
        <span className={`font-bold text-xl ${isUsed ? "text-gray-400" : "text-white"}`}>
          {isUsed ? "Already Used" : code}
        </span>
      </div>
      <p className="text-2xl font-semibold mb-3 text-white">{description}</p>
      <p className="text-gray-200 text-sm">{details}</p>
      <motion.button
        onClick={() => !isUsed && onApplyCoupon({ code })}
        className={`mt-4 ${
          isUsed
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 text-white"
        } px-6 py-3 rounded-md w-full shadow-lg`}
        whileHover={!isUsed ? { scale: 1.05, backgroundColor: "rgb(220 38 38)" } : {}}
        whileTap={!isUsed ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
        disabled={isUsed}
      >
        {isUsed ? "Already Used" : "APPLY COUPON"}
      </motion.button>
    </div>
  </motion.div>
  );
};

export default CouponModal;
