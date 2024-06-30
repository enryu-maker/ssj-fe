import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import api from '../helper/AxiosInstance';

const HeroSection = () => {
  const [banners, setBanners] = useState([]);
  console.log(banners);

  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await api.get('/web/banners/');
        const bannersData = response.data; // Adjust according to your API response structure
        setBanners(bannersData);
      } catch (error) {
        console.error('Error fetching banner images:', error);
      }
    };

    fetchBannerImages();
  }, []);

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
        navigation={true}
        modules={[Autoplay, Pagination]}
        className='mySwiper md:h-[90vh]'
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner.image} // Adjust according to your API response structure
              alt={banner.context || `Banner ${index + 1}`}
            />
            <div className='absolute font-Raleway left-10 right-10 md:top-44 top-10'>
              <p className='mt-5 md:text-4xl text-3xl font-light md:w-96 text-left text-white'>
                {banner.context || 'We are selling happiness'}
              </p>
              <button className='md:mt-5 mt-2 md:flex uppercase bg-transparent delay-100 transition-all duration-75 ease-linear hover:border-2 text-secondary-color font-semibold hover:text-primary-color py-2 px-4 border border-primary-color rounded-full'>
                {banner.context || 'Explore More'}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
