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
        className='mySwiper h-auto w-full md:h-[90vh]'
      >
        {banners?.map((banner, index) => (
          <SwiperSlide key={index}>
            <a href={banner.context || '#'} target="_blank" rel="noopener noreferrer">
              <img
                src={banner.image} // Adjust according to your API response structure
                alt={banner.context || `Banner ${index + 1}`}
                className='w-full h-full object-fill'
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
