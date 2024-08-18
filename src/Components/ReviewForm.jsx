import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../helper/AxiosInstance";

const ReviewForm = ({ productId, reviews, avgRating, isReviewed }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");

  //   review update function

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleShare = (reviewId) => {
    const reviewUrl = `${window.location.origin}/reviews/${reviewId}`; // Adjust URL structure as needed

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this review",
          url: reviewUrl,
        })
        .then(() => {
          toast.success("Thanks for sharing!");
        })
        .catch((error) => {
          console.log("Share failed", error);
        });
    } else {
      // Fallback for browsers that do not support the Share API
      navigator.clipboard
        .writeText(reviewUrl)
        .then(() => {
          setCopySuccess("Link copied to clipboard!");
          setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
        })
        .catch((error) => {
          setCopySuccess("Failed to copy link.");
          console.error("Copy failed", error);
        });
    }
  };

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async () => {
    if (rating === null || review.trim() === "") {
      // Handle validation (e.g., show an error message)
      return;
    }

    const data = {
      rating,
      review,
      product: productId,
    };

    try {
      const response = await api.post("/review/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      toast.success("Review submitted successfully!");
      setRating(null);
      setReview("");
      setIsFormVisible(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  return (
    <div className="p-8 rounded-md w-full ">
      {/* Rating Header */}
      <div className="text-center mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-800">
          {parseFloat(avgRating?.toFixed(1))}
        </h1>
        <div className="flex justify-center">
          {/* Stars */}
          {[...Array(isNaN(avgRating) ? 0 : Math.floor(avgRating))]?.map(
            (_, index) => (
              <svg
                key={index}
                className="w-6 h-6 text-primary-color fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 .288l2.833 8.718H24l-7.167 5.2L19.667 24 12 18.564 4.333 24l2.834-9.794L0 9.006h9.167z" />
              </svg>
            )
          )}
        </div>
        <p className="text-sm text-gray-500">{reviews?.length} Review</p>
      </div>

      {/* Buttons */}
      {isReviewed ? (
        <div className="flex justify-center mb-8">
          <button
            onClick={toggleFormVisibility}
            className=" bg-primary-color text-white py-2 px-4 rounded-md mr-4 flex items-center"
          >
            <span className="mr-2">&#9998;</span> Edit Review
          </button>
        </div>
      ) : (
        <div className="flex justify-center mb-8">
          <button
            onClick={toggleFormVisibility}
            className=" bg-primary-color text-white py-2 px-4 rounded-md mr-4 flex items-center"
          >
            <span className="mr-2">&#9998;</span> Write A Review
          </button>
        </div>
      )}

      {/* Toggle Review Form */}
      {isFormVisible && (
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="score"
            >
              * Score:
            </label>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-6 h-6 cursor-pointer ${
                    index < rating ? "text-red-600" : "text-gray-400"
                  } hover:text-red-600 fill-current`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() => handleRatingClick(index)}
                >
                  <path d="M12 .288l2.833 8.718H24l-7.167 5.2L19.667 24 12 18.564 4.333 24l2.834-9.794L0 9.006h9.167z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="review"
            >
              * Review:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="review"
              rows="4"
              placeholder="Enter your review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-primary-color text-white py-2 px-6 rounded-md shadow hover:bg-red-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              POST
            </button>
          </div>
        </form>
      )}

      {/* Reviews Section */}
      <h2 className="text-lg font-bold text-gray-800 font-Raleway">REVIEWS</h2>
      {reviews && reviews.length > 0 ? (
        reviews?.map((review) => (
          <div className="font-Raleway" key={review?.id}>
            <div className="mt-4">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="bg-primary-color text-white w-8 h-8 rounded-full flex items-center justify-center">
                    {review?.user?.name?.charAt(0)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold text-gray-800 mr-2">
                      {review?.user.name}
                    </h3>
                    <div className="flex">
                      {[
                        ...Array(isNaN(review?.rating) ? 0 : review?.rating),
                      ].map((_, index) => (
                        <svg
                          key={index}
                          className="w-4 h-4 text-primary-color fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .288l2.833 8.718H24l-7.167 5.2L19.667 24 12 18.564 4.333 24l2.834-9.794L0 9.006h9.167z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review?.review}</p>
                  <div className="mt-2 flex items-center text-gray-500 text-sm">
                    <span className="mr-2">
                      {new Date(review?.created_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </span>
                    <button
                      onClick={() => handleShare(review.id)}
                      className="flex items-center underline text-blue-600"
                    >
                      <svg
                        className="w-4 h-4 mr-1 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 16.08C17.24 16.08 16.56 16.38 16.06 16.88L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.13C16.47 7.63 17.16 7.92 18 7.92C19.38 7.92 20.5 6.79 20.5 5.42C20.5 4.05 19.38 2.92 18 2.92C16.62 2.92 15.5 4.05 15.5 5.42C15.5 5.66 15.54 5.89 15.59 6.12L8.54 10.29C8.03 9.79 7.34 9.5 6.5 9.5C5.12 9.5 4 10.63 4 12C4 13.37 5.12 14.5 6.5 14.5C7.34 14.5 8.03 14.21 8.54 13.71L15.69 17.88C15.64 18.11 15.6 18.34 15.6 18.58C15.6 19.95 16.72 21.08 18.1 21.08C19.48 21.08 20.6 19.95 20.6 18.58C20.6 17.21 19.48 16.08 18 16.08ZM18 4.92C18.83 4.92 19.5 5.59 19.5 6.42C19.5 7.25 18.83 7.92 18 7.92C17.17 7.92 16.5 7.25 16.5 6.42C16.5 5.59 17.17 4.92 18 4.92ZM6.5 13.5C5.67 13.5 5 12.83 5 12C5 11.17 5.67 10.5 6.5 10.5C7.33 10.5 8 11.17 8 12C8 12.83 7.33 13.5 6.5 13.5ZM18 19.08C17.17 19.08 16.5 18.41 16.5 17.58C16.5 16.75 17.17 16.08 18 16.08C18.83 16.08 19.5 16.75 19.5 17.58C19.5 18.41 18.83 19.08 18 19.08Z" />
                      </svg>
                    </button>
                    {copySuccess && (
                      <span className="ml-2 text-green-500">{copySuccess}</span>
                    )}
                  </div>
                  <p className="mt-2 text-gray-600">Was This Review Helpful?</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 mt-4">
          No reviews yet. Be the first to review!
        </p>
      )}
    </div>
  );
};

export default ReviewForm;
