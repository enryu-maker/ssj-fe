import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 bg-black bg-opacity-50 rounded-full">
      <div className="w-12 h-12 border-4 border-t-4 border-primary-color border-opacity-50 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
