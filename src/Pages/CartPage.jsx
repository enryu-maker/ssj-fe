import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbPointerHeart } from 'react-icons/tb';

const CartPage = () => {
  return (
    <>
      <div className='flex items-center justify-around font-Raleway '>
        <div className='flex flex-col gap-5 py-10 overflow-y-auto'>
          <div className='flex  gap-5 items-start '>
            <img
              src='https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwfc9c925a/images/hi-res/502117SKUAAA09_1.jpg'
              alt=''
              className='w-48 h-48 rounded-md shadow-md'
            />
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center gap-5'>
                <h2 className=' text-2xl font-semibold text-primary-color'>
                  Dainty Mesh Diamond Stud Earrings
                </h2>
                <p className='text-lg'>1</p>
              </div>
              <span className=' text-gray-400'>Weight : 2.021 g</span>
              <p className='text-xl font-semibold '>₹ 45495</p>
              <div className='flex gap-3 items-center'>
                <button className=' text-xs font-semibold flex gap-2 items-center'>
                  <RiDeleteBin6Line className=' text-primary-color' />
                  Remove
                </button>
                <p>|</p>
                <button className=' text-xs font-semibold flex gap-2 items-center'>
                  <TbPointerHeart className=' text-primary-color' />
                  Move to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className='flex  gap-5 items-start '>
            <img
              src='https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwfc9c925a/images/hi-res/502117SKUAAA09_1.jpg'
              alt=''
              className='w-48 h-48 rounded-md shadow-md'
            />
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center gap-5'>
                <h2 className=' text-2xl font-semibold text-primary-color'>
                  Dainty Mesh Diamond Stud Earrings
                </h2>
                <p className='text-lg'>1</p>
              </div>
              <span className=' text-gray-400'>Weight : 2.021 g</span>
              <p className='text-xl font-semibold '>₹ 45495</p>
              <div className='flex gap-3 items-center'>
                <button className=' text-xs font-semibold flex gap-2 items-center'>
                  <RiDeleteBin6Line className=' text-primary-color' />
                  Remove
                </button>
                <p>|</p>
                <button className=' text-xs font-semibold flex gap-2 items-center'>
                  <TbPointerHeart className=' text-primary-color' />
                  Move to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className='flex flex-col items-center text-justify justify-between gap-5 py-10 bg-light-bg-color w-1/4 p-4'>
          <h1 className=' text-2xl font-semibold text-primary-color'>
            ORDER SUMMARY
          </h1>
          <div className='flex flex-col justify-between gap-5'>
            <div className='flex justify-between  '>
              <p className='text-sm'>Sub Total</p>
              <p className='text-sm'>₹ 45495</p>
            </div>
            <div className='flex justify-between '>
              <p className='text-sm'>Discount</p>
              <p className='text-sm'>- ₹ 0</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-sm'>Delivery Charge</p>
              <p className='text-sm'>FREE</p>
            </div>
            <div className='flex justify-between gap-2 '>
              <p className='text-sm font-semibold text-primary-color'>
                TOTAL(Incl of all Taxes.)
              </p>
              <p className='text-lg font-semibold text-primary-color'>
                ₹ 45495
              </p>
            </div>
            <div className='flex justify-between gap-2 '>
              <p className='text-lg font-semibold text-green-500'>YOU SAVE</p>
              <p className='text-lg font-semibold text-green-500'>+ ₹ 0</p>
            </div>
          </div>
          <button className=' flex  items-center text-lg font-semibold bg-primary-color text-white p-2 rounded-md hover:bg-red-700 hover:text-white delay-75 duration-75 ease-in'>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
