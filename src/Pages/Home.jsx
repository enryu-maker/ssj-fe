import React from 'react';
import HeroSection from '../Components/HeroSection';
import Gift from '../Components/HomeComp/Gift';
import ShopByCategory from '../Components/HomeComp/ShopByCategory';
import ShopByCollections from '../Components/HomeComp/ShopByCollections';
import TopSellers from '../Components/HomeComp/TopSellers';
import NewForYou from '../Components/HomeComp/NewForYou';
import ShopByGender from '../Components/HomeComp/ShopByGender';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Gift />
      <ShopByCategory />
      <ShopByCollections />
      <TopSellers />
      <NewForYou />
      <ShopByGender />
    </div>
  );
};

export default Home;
