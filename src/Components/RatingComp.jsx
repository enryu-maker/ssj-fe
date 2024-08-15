import React from "react";
import ReactStars from "react-rating-stars-component";

const RatingComp = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <div>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={20}
        activeColor="#ffd700"
      />
    </div>
  );
};

export default RatingComp;
