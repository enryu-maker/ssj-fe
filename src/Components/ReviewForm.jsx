import React, { useState } from 'react';

const ReviewForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="p-8 rounded-md w-full ">
      {/* Rating Header */}
      <div className="text-center mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-800">5.0</h1>
        <div className="flex justify-center">
          {/* Stars */}
          {[...Array(4)].map((_, index) => (
            <svg
              key={index}
              className="w-6 h-6 text-red-600 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 .288l2.833 8.718H24l-7.167 5.2L19.667 24 12 18.564 4.333 24l2.834-9.794L0 9.006h9.167z" />
            </svg>
          ))}
        </div>
        <p className="text-sm text-gray-500">1 Review</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mb-8">
        <button
          onClick={toggleFormVisibility}
          className="bg-red-600 text-white py-2 px-4 rounded-md mr-4 flex items-center"
        >
          <span className="mr-2">&#9998;</span> Write A Review
        </button>
      </div>

      {/* Toggle Review Form */}
      {isFormVisible && (
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="score">
              * Score:
            </label>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .288l2.833 8.718H24l-7.167 5.2L19.667 24 12 18.564 4.333 24l2.834-9.794L0 9.006h9.167z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              * Title:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
              * Review:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="review"
              rows="4"
              placeholder="Enter your review"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              className="bg-red-600 text-white py-2 px-6 rounded-md shadow hover:bg-red-700 focus:outline-none focus:shadow-outline"
              type="button"
            >
              POST
            </button>
          </div>
        </form>
      )}

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-gray-800">REVIEWS</h2>
        <div className="mt-4">
          <div className="flex items-start">
            <div className="mr-4">
              <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                R
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-bold text-gray-800 mr-2">Rajon p.</h3>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-4 h-4 text-red-600 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .288l2.833 8.718H24l-7.167 5.2L19.667 24 12 18.564 4.333 24l2.834-9.794L0 9.006h9.167z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">Mr Raj</p>
              <p className="text-gray-600">Good experience with shani paul</p>
              <div className="mt-2 flex items-center text-gray-500 text-sm">
                <span className="mr-2">06/30/24</span>
                <a href="#" className="underline text-gray-600">Share</a>
                
              </div>
              <p className="mt-2 text-gray-600">Was This Review Helpful?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
