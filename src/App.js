import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
import Contact from './Pages/Contact';
import Footer from './Components/Footer';

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
