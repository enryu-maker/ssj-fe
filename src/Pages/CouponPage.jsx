import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const dummyCoupons = [
  {
    id: 1,
    code: "SAVE20",
    description: "Get 20% off on your next purchase!",
    discount: 20,
    expiryDate: "2024-08-30T00:00:00Z",
  },
  {
    id: 2,
    code: "FREESHIP",
    description: "Free shipping on orders over $50.",
    discount: 0,
    expiryDate: "2024-09-15T00:00:00Z",
  },
  {
    id: 3,
    code: "WELCOME10",
    description: "10% off for new customers.",
    discount: 10,
    expiryDate: "2024-10-01T00:00:00Z",
  },
  {
    id: 4,
    code: "BLACKFRIDAY",
    description: "30% off sitewide for Black Friday.",
    discount: 30,
    expiryDate: "2024-11-30T00:00:00Z",
  },
  {
    id: 5,
    code: "CYBERMONDAY",
    description: "25% off on tech gadgets for Cyber Monday.",
    discount: 25,
    expiryDate: "2024-12-05T00:00:00Z",
  },
  {
    id: 6,
    code: "NEWYEAR2025",
    description: "15% off your first order in 2025.",
    discount: 15,
    expiryDate: "2025-01-15T00:00:00Z",
  },
];

const CouponPage = () => {
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedCoupon(code);
        setTimeout(() => setCopiedCoupon(null), 5000); // Reset status after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Coupons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyCoupons.length === 0 ? (
          <p>No coupons available.</p>
        ) : (
          dummyCoupons.map((coupon) => (
            <motion.div
              key={coupon.id}
              className="border p-4 rounded-lg shadow-md relative bg-white"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold">{coupon.code}</h2>
              <p className="text-gray-600">{coupon.description}</p>
              <p className="mt-2 text-green-600 font-bold">
                {coupon.discount > 0
                  ? `${coupon.discount} % Off`
                  : "Free Shipping"}
              </p>
              <p className="mt-2 text-gray-400 text-sm">
                Expires on: {new Date(coupon.expiryDate).toLocaleDateString()}
              </p>
              <motion.button
                onClick={() => handleCopy(coupon.code)}
                className="absolute top-2 right-2 bg-secondary-color text-primary-color p-2 rounded-full hover:bg-primary-color hover:text-white focus:outline-none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FontAwesomeIcon
                  icon={copiedCoupon === coupon.code ? faCheckCircle : faCopy}
                  className={`transition-opacity duration-300 ${
                    copiedCoupon === coupon.code ? "opacity-100" : "opacity-50"
                  }`}
                />
              </motion.button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default CouponPage;
