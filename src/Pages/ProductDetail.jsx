import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productsData } from '../data';
import { IoHeartOutline } from 'react-icons/io5';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [openWeight, setOpenWeight] = useState(false);

  const { productId } = useParams();
  const thisProduct = productsData.find((prod) => prod.id === productId);

  const [images, setImages] = useState({
    img: thisProduct?.imgUrl[0],
    img1: thisProduct?.imgUrl[1],
    img2: thisProduct?.imgUrl[2],
    img3: thisProduct?.imgUrl[3],
    img4: thisProduct?.imgUrl[4],
  });

  const [activeImg, setActiveImage] = useState(images.img1);

  return (
    <div className='grid md:grid-cols-2 px-20 font-Raleway mt-5 '>
      <div className='flex flex-col gap-6 lg:w-3/4 sm:w-full'>
        <img
          src={activeImg}
          alt=''
          className='w-full  aspect-square object-cover rounded-xl'
        />
        <div className='flex  md:flex-row justify-between gap-2 h-24'>
          <img
            src={images.img1}
            alt=''
            className='w-24 h-24 rounded-md cursor-pointer'
            onClick={() => setActiveImage(images.img1)}
          />
          <img
            src={images.img2}
            alt=''
            className='w-24 h-24 rounded-md cursor-pointer'
            onClick={() => setActiveImage(images.img2)}
          />
          <img
            src={images.img3}
            alt=''
            className='w-24 h-24 rounded-md cursor-pointer'
            onClick={() => setActiveImage(images.img3)}
          />
          <img
            src={images.img3}
            alt=''
            className='w-24 h-24 rounded-md cursor-pointer md:block hidden'
            onClick={() => setActiveImage(images.img4)}
          />
        </div>
      </div>
      <div className='flex flex-col mt-5'>
        <div className='flex justify-between'>
          <p className=' font-thin text-md'>{thisProduct.id}</p>
          <Link
            to='#/'
            className='flex flex-col items-center uppercase text-sm text-primary-color delay-100 transition-all ease-linear hover:scale-[1.1] '>
            <IoHeartOutline className='w-8 h-8 text-primary-color' />
          </Link>
        </div>
        <h1 className=' text-2xl  font-medium'>{thisProduct?.name}</h1>
        <div className='mt-2  border border-primary-color' />
        <p className=' font-light text-sm mt-5 '>{thisProduct.description}</p>
        <div className='mt-5 flex flex-col '>
          <h1 className=' text-2xl font-semibold text-black'>
            <span className=' text-sm text-black '>Offer Price</span> ₹
            {thisProduct.price}
          </h1>
          <p className='text-sm'>
            Price Inclusive of all taxes. See full{' '}
            <span className=' text-primary-color'>Price Breakup</span>
          </p>
        </div>
        <div className='flex md:flex-row gap-5 flex-col justify-between md:w-1/2 mt-5'>
          <div
            onClick={() => {
              setOpenWeight(!openWeight);
            }}
            className='flex flex-col gap-2 '>
            <h1 className='font-medium'>Gross Weight</h1>
            <div className='flex items-center justify-between border md:w-32 w-full p-2 cursor-pointer rounded-md relative '>
              <p className='text-md font-medium '>{thisProduct.weight} g</p>
              {openWeight ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
            </div>
          </div>
          {openWeight && (
            <div className=' absolute md:bottom-20  md:w-32  bg-white shadow-lg rounded-md p-2 mt-2'>
              <p>{thisProduct.weight[0]} g</p>
              <p>{thisProduct.weight[1]} g</p>
            </div>
          )}
          <div className='flex flex-col md:items-center gap-2'>
            <h1 className='font-medium '>Qty</h1>
            <div className='flex md:justify-normal justify-between gap-5 '>
              <button
                onClick={() => {
                  if (quantity === 0) {
                    return;
                  }
                  setQuantity(quantity - 1);
                }}
                className=' bg-gray-200 h-10 w-10 rounded-full flex justify-center items-center'>
                -
              </button>
              <p className='flex justify-center items-center font-medium text-md'>
                {quantity}N
              </p>
              <button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
                className=' bg-gray-200 h-10 w-10 rounded-full flex justify-center items-center'>
                +
              </button>
            </div>
          </div>
        </div>
        <div className=' flex gap-5 mt-5 '>
          <div>
            <h2 className=' font-medium text-md'>Gold Purity: 18 Karat</h2>
          </div>
          <div>
            <h2 className=' font-medium text-md'>Diamond weight: 0.235 c</h2>
          </div>
        </div>
        <div className=' flex flex-col md:flex-row gap-5 mt-5'>
          <button className=' border border-black w-full p-3 rounded-md'>
            Add To Cart
          </button>
          <button className=' border bg-primary-color w-full p-3 rounded-md text-white hover:bg-red-700'>
            Buy Now
          </button>
        </div>

        <div className='flex flex-col gap-2 mt-5'>
          <h1 className=' text-2xl font-medium text-primary-color'>
            Still Confused What to Buy?
          </h1>
          <p className=' text-start'>
            Get on live video call with our design experts, or visit your
            nearest SSJ store to get an closer look and know more about the
            product.
          </p>
          <button className=' border border-black w-full p-3 rounded-md mt-5'>
            Talk to an Expert
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
