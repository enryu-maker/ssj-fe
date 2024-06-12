import React, { useState } from 'react';
import { IoFilterOutline, IoChevronDownOutline } from 'react-icons/io5';
import { productsData } from '../data';
import ProductCard from '../Components/ProductCard';

function AllJewellery() {

const [sortBy, setSortBy] = useState('Best Matches');
  const [showOptions, setShowOptions] = useState(false);

  const options = ['Price: Low to High', 'Price: High to Low'];

  const handleSelectOption = (option) => {
    setSortBy(option);
    setShowOptions(false);
    // Additional logic if needed based on selected option
  }


  return (
    <div className="px-10 mt-5">
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        <IoFilterOutline className="text-primary-color font-extrabold" />
        <h1 className="text-primary-color">FILTER</h1>
      </div>
      <div className="md:flex hidden items-center gap-2 flex-wrap">
        <button className="border border-primary-color p-2 w-24 text-center">
          Bangle
        </button>
        <button className="border border-primary-color p-2 w-24 text-center">
          Earrings
        </button>
        <button className="border border-primary-color p-2 w-24 text-center">
          Necklace
        </button>
        <button className="border border-primary-color p-2 w-24 text-center">
          Pendant
        </button>
        <button className="border border-primary-color p-2 w-26 text-center">
          Mangalsutra
        </button>
      </div>
      <div className="relative z-10">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setShowOptions(!showOptions)}
      >
        <h1 className="text-primary-color text-sm">SORT BY :</h1>
        <div className="flex items-center gap-2 border rounded-md p-2">
          <h2>{sortBy}</h2>
          <IoChevronDownOutline />
        </div>
      </div>
      {showOptions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-md rounded-md ">
          {options.map((option) => (
            <div
              key={option}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    <div className="grid md:grid-cols-4 gap-5 p-5 mt-5">
      {productsData.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
    <div className="flex justify-center items-center mt-5">
      <button className="border border-black p-2 md:w-1/6 w-full rounded-md hover:bg-primary-color hover:text-white">
        See more Products
      </button>
    </div>
  </div>
  );
}

export default AllJewellery;
