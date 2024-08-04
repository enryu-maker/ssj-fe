import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image1 from "../assets/1.webp";
import Image2 from "../assets/2.webp";

const GoldInvestment = () => {
  const navigate = useNavigate();

  const images = [
    { src: Image1, alt: "Gold Investment Image 1" },
    { src: Image2, alt: "Gold Investment Image 2" },
  ];

  const handleContactUsClick = () => {
    navigate("/contacts");
  };

  return (
    <>
      <div className="relative">
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
          className="mySwiper h-auto w-full md:h-[90vh]"
        >
          {images?.map((banner, index) => (
            <SwiperSlide key={index}>
              <a
                href={banner.alt || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={banner.src}
                  alt={banner.alt || `Banner ${index + 1}`}
                  className="w-full h-full object-fill"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={handleContactUsClick}
          className="bg-primary-color text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Contact Us
        </button>
      </div>
    </>
  );
};

export default GoldInvestment;
