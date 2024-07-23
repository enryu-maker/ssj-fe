import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. The item must be in its original condition.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping typically takes 5-7 business days. Expedited shipping options are available.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship internationally. Shipping costs and delivery times vary by destination.",
    },
    // Add more FAQs as needed
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen mt-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-color">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border rounded-lg overflow-hidden shadow-md"
            layout
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="flex items-center justify-between p-4 cursor-pointer bg-secondary-color hover:bg-primary-color hover:text-white"
              onClick={() => handleToggle(index)}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeIndex === index ? (
                  <IoIosArrowUp className="w-6 h-6" />
                ) : (
                  <IoIosArrowDown className="w-6 h-6" />
                )}
              </motion.div>
            </motion.div>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="p-4 bg-gray-50"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.3 },
                    height: { duration: 0.3 },
                  }}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
