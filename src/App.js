import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
import Contact from './Pages/Contact';
import Footer from './Components/Footer';
import CartPage from './Pages/CartPage';
import AllJewellery from './Pages/AllJewellery';
import ProductDetail from './Pages/ProductDetail';
import Stores from './Pages/Stores';
import DailyWear from './Pages/DailyWear';

function App() {
  return (
    <Router>
      <Header />
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
          path='/dailywear'
          element={<DailyWear />}
        />
        <Route
          path='/stores'
          element={<Stores />}
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
          exact
          path='/product/:productId'
          element={<ProductDetail />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
