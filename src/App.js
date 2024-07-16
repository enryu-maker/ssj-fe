import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
import Contact from './Pages/Contact';
import Footer from './Components/Footer';
import CartPage from './Pages/CartPage';
import AllJewellery from './Pages/AllJewellery';
import ProductDetail from './Pages/ProductDetail';
import Stores from './Pages/Stores';
import DailyWear from './Pages/DailyWear';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermAndCondition from './Pages/TermAndCondition';
import ScrollToTop from './Components/ScrollTo';
import RefundPolicy from './Pages/RefundPolicy';
import AboutUs from './Pages/AboutUs';
import Collections from './Pages/Collections';
import CollectionProduct from './Pages/CollectionProduct';
import WishList from './Pages/WishList';
import CheckoutPage from './Pages/CheckoutPage';
import Categories from './Pages/Categories';
import TagProducts from './Pages/TagProducts';
import NotFoundPage from './Pages/NotFoundPage';
import Dashboard from './Pages/Dashboard';
import OrderSuccessPage from './Pages/OrderSuccessPage';
import NotAuthenticatedPage from './Pages/NotAuthenticatedPage';
import PrivateRoute from './helper/PrivateRoute';
import SearchPage from './Pages/SearchPage';
import SpinWheelPage from './Pages/SpinWheelPage';
import OrderDetails from './Pages/OrderDetails';

const App = () => {
  const location = useLocation();
  const isSpinWheelPage = location.pathname === '/spin-wheel';

  return (
    <div className="h-full w-full">
      <ScrollToTop />
      {!isSpinWheelPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermAndCondition />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/dailywear" element={<DailyWear />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/products" element={<AllJewellery />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:collectionId" element={<CollectionProduct />} />
        <Route path="/sub-category/:categoryId" element={<Categories />} />
        <Route path="/Tag/:tagName" element={<TagProducts />} />
        <Route path="/not-auth" element={<NotAuthenticatedPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/spin-wheel" element={<SpinWheelPage />} />
        <Route path="/order/:transactionId" element={<OrderDetails/>} />

        {/* Protected Routes */}
        <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/checkout" element={<PrivateRoute element={<CheckoutPage />} />} />
        <Route path="/order-success" element={<PrivateRoute element={<OrderSuccessPage />} />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isSpinWheelPage && <Footer />}
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
