import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheckCircle, faGift } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupons } from "../features/coupons/couponSlice";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coupons, status, error } = useSelector((state) => state.coupons);
  console.log(coupons);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCoupons());
    }
  }, [dispatch, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  const handleCopy = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedCoupon(code);
        setTimeout(() => setCopiedCoupon(null), 5000); // Reset status after 5 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Your Coupons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.length === 0 ? (
          <p>No coupons available.</p>
        ) : (
          coupons.map((item) => {
            const { coupon, is_used } = item; // Access the nested coupon object and is_used property
            return (
              <motion.div
                key={coupon.id}
                className="bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 border border-transparent shadow-lg rounded-xl p-4 relative"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className={`text-xl font-semibold ${is_used ? "text-gray-400" : "text-white"}`}>
                  {is_used ? "Already Used" : coupon.code}
                </h2>
                <p className="text-gray-200">{coupon.description}</p>
                <p className="mt-2 text-green-200 font-bold">
                  {coupon.discount_amount > 0
                    ? `${coupon.discount_amount} Off`
                    : "Free Shipping"}
                </p>
                <motion.button
                  onClick={() => !is_used && handleCopy(coupon.code)}
                  disabled={is_used}
                  className={`absolute top-2 right-2 p-2 rounded-full ${
                    is_used
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  } focus:outline-none`}
                  whileHover={!is_used ? { scale: 1.2 } : {}}
                  whileTap={!is_used ? { scale: 0.9 } : {}}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FontAwesomeIcon
                    icon={copiedCoupon === coupon.code ? faCheckCircle : faCopy}
                    className={`transition-opacity duration-300 ${
                      copiedCoupon === coupon.code
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  />
                </motion.button>
              </motion.div>
            );
          })
        )}
      </div>
      <motion.button
        onClick={() => navigate("/coupon-claim")}
        className="absolute top-4 right-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white py-2 px-4 rounded-md flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300 sm:py-3 sm:px-6 text-sm sm:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <FontAwesomeIcon icon={faGift} className="text-lg sm:text-xl" />
        <span className="hidden sm:inline">Coupon Claim</span>
        <span className="inline sm:hidden">Claim</span>
      </motion.button>
    </div>
  );
};

export default CouponPage;
