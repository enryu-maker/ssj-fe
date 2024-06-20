import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";
import CartPage from "./Pages/CartPage";
import AllJewellery from "./Pages/AllJewellery";
import ProductDetail from "./Pages/ProductDetail";
import Stores from "./Pages/Stores";
import DailyWear from "./Pages/DailyWear";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermAndCondition from "./Pages/TermAndCondition";
import ScrollToTop from "./Components/ScrollTo";
import RefundPolicy from "./Pages/RefundPolicy";
import AboutUs from "./Pages/AboutUs";
import { selectIsAuthenticated } from "./features/Auth/authSlice";
import { useSelector } from "react-redux";
import MyOrders from "./Pages/MyOrders";

function App() {

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className="h-full w-full">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermAndCondition />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/dailywear" element={<DailyWear />} />
          <Route path="/stores" element={<Stores />} />
          {isAuthenticated && (
            <Route path="/my-orders" element={<MyOrders />} />
          )}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shop/jewellery" element={<AllJewellery />} />
          <Route exact path="/product/:productId" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
