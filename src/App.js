import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
import Contact from './Pages/Contact';
import Footer from './Components/Footer';
import CartPage from './Pages/CartPage';
import AllJewellery from './Pages/AllJewellery';
import ProductDetail from './Pages/ProductDetail';
import MobileHeader from './Components/MobileHeader';
import { useEffect, useState } from 'react';

function App() {
  const [isMobile, setMobile] = useState(false);
  const breakPoint = 800;

  useEffect(() => {
    const handleWindowResize = () => setMobile(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <Router>
      {isMobile < breakPoint ? <MobileHeader /> : <Header />}
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/contacts'
          element={<Contact />}
        />
        <Route
          path='/cart'
          element={<CartPage />}
        />
        <Route
          path='/shop/jewellery'
          element={<AllJewellery />}
        />
        <Route
          path='/product/:id'
          element={<ProductDetail />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
