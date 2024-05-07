import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productsData } from '../data';
import { IoHeartOutline } from 'react-icons/io5';

function ProductDetail() {
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
          className='w-full h-full aspect-square object-cover rounded-xl'
        />
        <div className='flex flex-row justify-between gap-2 h-24'>
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
            className='w-24 h-24 rounded-md cursor-pointer'
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
          <p>Flat 10% off</p>
          <p>Price Inclusive of all taxes. See full Price Breakup</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
