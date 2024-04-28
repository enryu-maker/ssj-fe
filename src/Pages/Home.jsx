import React from 'react';
import HeroSection from '../Components/HeroSection';
import Gift from '../Components/HomeComp/Gift';
import ShopByCategory from '../Components/HomeComp/ShopByCategory';
import ShopByCollections from '../Components/HomeComp/ShopByCollections';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Gift />
      <ShopByCategory />
      <ShopByCollections />
    </div>
  );
};

export default Home;
