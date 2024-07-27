import React from "react";
import { motion } from "framer-motion";

const GoldInvestment = () => {
  const investments = [
    {
      type: "24K Gold",
      amountPaid: 100000,
      currentValue: 120000,
      profitLoss: 20000,
      period: "6 Months",
    },
    {
      type: "22K Gold",
      amountPaid: 80000,
      currentValue: 85000,
      profitLoss: 5000,
      period: "12 Months",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-4xl mx-auto">
      <header className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Gold Investment Overview
        </h1>
        <p className="text-gray-700 mt-2 text-sm sm:text-base">
          Detailed summary of your gold investments.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {investments.map((investment, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-xl mb-6 border border-gray-200 bg-gradient-to-r from-[#F5E0E6] to-[#D4A0A8] backdrop-blur-md shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <p className="text-gray-700 text-base sm:text-lg">Gold Type:</p>
                <p className="font-semibold text-gray-800 text-lg sm:text-xl">
                  {investment.type}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-center sm:text-right">
                <p className="text-gray-700 text-base sm:text-lg">
                  Investment Period:
                </p>
                <p className="font-semibold text-gray-800 text-lg sm:text-xl">
                  {investment.period}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg mb-4 border border-gray-200 bg-white bg-opacity-50">
              <p className="text-gray-700 text-base sm:text-lg">Amount Paid:</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                ₹{investment.amountPaid.toLocaleString()}
              </p>
            </div>

            <div className="p-4 rounded-lg mb-4 border border-gray-200 bg-white bg-opacity-50">
              <p className="text-gray-700 text-base sm:text-lg">
                Current Value:
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                ₹{investment.currentValue.toLocaleString()}
              </p>
            </div>

            <div className="p-4 rounded-lg border border-gray-200 bg-white bg-opacity-50">
              <p className="text-gray-700 text-base sm:text-lg">Profit/Loss:</p>
              <p
                className={`text-xl sm:text-2xl font-bold ${
                  investment.profitLoss >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {investment.profitLoss >= 0
                  ? `+₹${investment.profitLoss.toLocaleString()}`
                  : `-₹${Math.abs(investment.profitLoss).toLocaleString()}`}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GoldInvestment;
