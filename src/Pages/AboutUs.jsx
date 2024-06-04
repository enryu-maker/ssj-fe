import React from 'react';
import Image from '../assets/about_image.jpeg'; // Import your image

const AboutUs = () => {
  return (
    <div className='font-Raleway min-h-screen px-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center'>
        <div className='text-left'>
          <h1 className='text-4xl font-extrabold text-primary-color mb-5'>About Sai Shraddha Jewellers</h1>
          <p className='text-lg font-normal text-gray-700 leading-relaxed max-w-lg'>
            Sai Shraddha Jewellers is a family-owned business established in [year of establishment]. We take pride in offering a wide range of exquisite jewellery designs meticulously crafted to cater to the diverse tastes of our customers. With a legacy of [number of years] years in the industry, we have built a reputation for unparalleled craftsmanship, quality, and customer service.
          </p>
          <div className='mt-8'>
            <h2 className='text-2xl font-semibold text-primary-color mb-3'>Our Mission</h2>
            <p className='text-lg font-normal text-gray-700 leading-relaxed max-w-lg'>
              Our mission is to adorn every special moment of your life with timeless elegance and sophistication. Whether it's an engagement ring symbolizing love and commitment, a stunning necklace adding glamour to your attire, or a pair of earrings accentuating your beauty, we strive to create jewellery that resonates with your unique style and personality.
            </p>
          </div>
        </div>
        <div className="md:order-first relative mt-5">
          <img src={Image} alt="Sai Shraddha Jewellers" className="rounded-lg shadow-lg mb-8 mx-auto mt-8 md:mt-0" style={{ maxWidth: '600px' }} />
          <div className="gradient-animation absolute inset-0 rounded-lg"></div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <div className="bg-gradient-to-r from-primary-color to-secondary-color rounded-full h-2 w-36 animate-pulse"></div>
      </div>
    </div>
  );
};

export default AboutUs;
