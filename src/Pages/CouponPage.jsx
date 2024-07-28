import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupons } from "../features/coupons/couponSlice";

const CouponPage = () => {
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  const dispatch = useDispatch();
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
    <div className="p-4">
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
                className="border p-4 rounded-lg shadow-md relative bg-white"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="text-xl font-semibold">
                  {is_used ? "Already Used" : coupon.code}
                </h2>
                <p className="text-gray-600">{coupon.description}</p>
                <p className="mt-2 text-green-600 font-bold">
                  {coupon.discount_amount > 0
                    ? `${coupon.discount_amount} Off`
                    : "Free Shipping"}
                </p>
                <motion.button
                  onClick={() => !is_used && handleCopy(coupon.code)} // Only call handleCopy if not used
                  disabled={is_used} // Disable the button if coupon is used
                  className={`absolute top-2 right-2 ${
                    is_used
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-secondary-color text-primary-color"
                  } p-2 rounded-full hover:bg-primary-color hover:text-white focus:outline-none`}
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
    </div>
  );
};

export default CouponPage;
