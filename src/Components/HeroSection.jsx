import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const HeroSection = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        Navigation={true}
        modules={[Autoplay, Pagination]}
        className='mySwiper md:h-[90vh]  '>
        <SwiperSlide>
          <img
            src={
              'https://images.unsplash.com/photo-1589512574123-2ba3b33bf066?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt=''
          />
          <div className='absolute font-Raleway left-10 right-10 md:top-44 top-10 '>
            <p className='mt-5 md:text-4xl text-3xl font-light md:w-96 text-left text-white'>
              We are selling happiness
            </p>
            <button className=' md:mt-5 mt-2 md:flex  uppercase bg-transparent delay-100 transition-all duration-75 ease-linear hover:border-2 text-secondary-color font-semibold hover:text-primary-color py-2 px-4 border border-primary-color  rounded-full'>
              Explore More
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
          />
          <div className='absolute font-Raleway left-10 right-10 md:top-44 top-10 '>
            <p className='mt-5 md:text-4xl text-xl font-light  md:w-96 text-left text-white'>
              Ad eu ad anim sint eu. Nostrud sit ipsum do proident laborum amet
              reprehenderit ullamco consequat esse.
            </p>
            <button className=' md:mt-5  mt-2 md:flex  uppercase bg-transparent delay-100 transition-all duration-75 ease-linear hover:border-2 text-secondary-color font-semibold hover:text-primary-color py-2 px-4 border border-primary-color rounded-full'>
              Explore More
            </button>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <img
            src='https://images.unsplash.com/photo-1450297166380-cabe503887e5?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
          />
          <div className='absolute font-Raleway  left-10 right-10 md:top-44 top-10 '>
            <p className='mt-5 flex md:w-96  md:text-4xl text-xl font-light md:text-left text-white'>
              Id nostrud commodo deserunt ex qui ut proident nisi sit enim minim
              nisi proident ad.
            </p>
            <button className='md:mt-5 mt-2 md:flex  uppercase bg-transparent delay-100 transition-all duration-75 ease-linear hover:border-2 text-secondary-color font-semibold hover:text-primary-color py-2 px-4 border border-primary-color  rounded-full'>
              View Resources
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
