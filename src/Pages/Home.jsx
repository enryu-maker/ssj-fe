import React from 'react';
import HeroSection from '../Components/HeroSection';
import Gift from '../Components/HomeComp/Gift';
import ShopByCategory from '../Components/HomeComp/ShopByCategory';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Gift />
      <ShopByCategory />
    </div>
  );
};

export default Home;
