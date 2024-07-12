import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../helper/AxiosInstance';

const Stores = () => {
  const [Store, setStore] = useState([])

  useEffect(()=>{
    const FetchingStores = async() =>{
     const response = await api.get('/store/')
     setStore(response.data)
    }
    FetchingStores()
    
  },[]);


  return (
    <div className='flex flex-col gap-5 font-Raleway min-h-screen'>
      <div className='flex md:flex-row flex-col gap-2 justify-around font-Raleway mt-5 px-5'>
        <Link to={'/sub-category/6'} className='border border-primary-color rounded-md py-2 px-5'>
          Mangalsutras
        </Link>
        <Link to={'/sub-category/4'} className='border border-primary-color rounded-md py-2 px-5'>
          Popular Pendants
        </Link>
        <Link to={'/sub-category/3'} className='border border-primary-color rounded-md py-2 px-5'>
           Earrings
        </Link>
        <Link
          to={'/products'}
          className='border border-primary-color rounded-md py-2 px-5'>
          All jewellery
        </Link>
      </div>
      <div className='flex flex-col gap-3 items-center justify-center mt-10'>
        <h1 className=' text-4xl font-semibold text-primary-color'>
          Welcome to SSJ!
        </h1>
        <p className=' text-xl font-extralight text-gray-700 text-center'>
          Shop from a wide range of exquisite designs for all occasions.
        </p>
      </div>
      <div className='flex flex-col gap-3 items-center justify-center mt-5 '>
        <h1 className='text-4xl font-semibold text-primary-color'>
          Popular Cities
        </h1>
        <div className='flex md:flex-row flex-col justify-center items-centers gap-5 mt-5 w-full px-5'>
          {Store.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center shadow-lg rounded-md md:hover:scale-110 hover:scale-105 transition-all ease-linear '>
              <h2 className=' bg-gradient-to-r from-rose-200 to-pink-50 w-full h-10 rounded-t-md flex items-center p-2 text-sm'>
                {item.store_count}
              </h2>
              <img
                src={item.city_image}
                alt=''
                className='w-40 h-36 p-5'
              />
              <h1 className=' text-primary-color font-medium mb-2'>
                {item.city}
              </h1>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Stores;
