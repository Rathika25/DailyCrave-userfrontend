import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import {Link} from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar';
import { FaMoon, FaSun } from 'react-icons/fa';

import './Navbar.css';

const Navbar = ({ showLogin, setShowLogin, setShowFeedback, toggleDarkMode, darkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cartItems, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const getTotalCartCount = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  const totalCount = getTotalCartCount();

  return (
    <>
      <div className="navbar">
        <div className="navbar-top">
          <div className="hamburger-wrapper" onClick={() => setSidebarOpen(true)}>
            <div className="hamburger">&#9776;</div>
            {totalCount > 0 && <span className="sidebar-dot dot-on-hamburger" />}
          </div>

          <img className='logo' src={assets.logo} alt="logo" onClick={() => navigate('/')} />

          <div className="navbar-right">
            <div className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </div>

            {!token ? (
              <button onClick={() => setShowLogin(true)}>Sign in</button>
            ) : (
              <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="Profile" />
                <ul className='nav-profile-dropdown'>
                  
                  <Link to="/myorders" >  <img src={assets.bag_icon} alt="" /><p>Orders</p></Link>
                  
                  <hr />
                  <li onClick={logout}>
                    <img src={assets.logout_icon} alt="" /><p>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="navbar-search-bar-wrapper">
          <SearchBar />
        </div>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <span className="close-btn" onClick={() => setSidebarOpen(false)}>&times;</span>

        <div onClick={() => { navigate('/'); setSidebarOpen(false); }}>Home</div>

        <div className="sidebar-cart-link" onClick={() => {
          navigate('/cart', { replace: true });
          setSidebarOpen(false);
        }}>
          <span>Cart</span>
          {totalCount > 0 && <span className="sidebar-dot" />}
        </div>

        <div onClick={() => { navigate('/myorders'); setSidebarOpen(false); }}>My Orders</div>
        <div
  onClick={() => {
    navigate('/', { replace: false }); // go to homepage
    setSidebarOpen(false);
    setTimeout(() => {
      const el = document.getElementById('food-display');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100); 
  }}
>
  Menu
</div>

        <div onClick={() => { navigate('/specials'); setSidebarOpen(false); }}>Specials</div>

        <a href="#" onClick={(e) => {
          e.preventDefault();
          setShowFeedback(true);
          setSidebarOpen(false);
        }}>Feedback</a>

        <a href="#footer" onClick={() => setSidebarOpen(false)}>Contact Us</a>
      </div>

      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}
    </>
  );
};

export default Navbar;
