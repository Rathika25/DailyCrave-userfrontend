import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Cart from './screens/Cart/Cart';
import Home from './screens/Home/Home';
import MyOrders from './screens/MyOrders/MyOrders';
import Verify from './screens/Verify/Verify';
import Footer from './components/Footer/Footer';
import PlaceOrder from './screens/PlaceOrder/PlaceOrder';
import Specials from './screens/Specials/Specials';
import LoginPopup from './components/LoginPopup/LoginPopup';
import FeedbackModal from './components/FeedbackModal/FeedbackModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './App.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {showFeedback && <FeedbackModal setShowFeedback={setShowFeedback} />}

      <Navbar
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setShowFeedback={setShowFeedback}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/specials" element={<Specials />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
