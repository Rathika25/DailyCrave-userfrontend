import React, { useState, useContext, useEffect } from 'react';
import './SearchBar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { addToCart, removeFromCart, cartItems, food_list, url } = useContext(StoreContext);
  const location = useLocation();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredItems([]);
    } else {
      const results = food_list.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(results);
    }
  };

  const handleResultClick = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    setFilteredItems([]);
    setSelectedItem(null);
    setQuery('');
  }, [location.pathname]);

  return (
    <div className="search-container">
      <div className="search-bar">
        <img src={assets.search_icon} alt="Search" />
        <input
          type="text"
          placeholder="Search for food..."
          value={query}
          onChange={handleChange}
        />
      </div>

      {filteredItems.length > 0 && (
        <div className="search-results">
          {filteredItems.map(item => (
            <div
              key={item._id}
              className="search-result-card"
              onClick={() => handleResultClick(item)}
            >
              <img src={`${url}/image/${item.image}`} alt={item.name} />
              <div className="search-result-info">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <small>{item.category}</small>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <span className="popup-close" onClick={closePopup}>&times;</span>
            <img src={`${url}/image/${selectedItem.image}`} alt={selectedItem.name} />
            <h2>{selectedItem.name}</h2>
            <p><strong>Price:</strong> ₹{selectedItem.price}</p>
            <p><strong>Category:</strong> {selectedItem.category}</p>
            <p>{selectedItem.description}</p>

            <div className="popup-cart-actions">
              {cartItems[selectedItem._id] > 0 ? (
                <div className="item-counter">
                  <img
                    src={assets.remove_icon_red}
                    alt="Remove"
                    onClick={() => removeFromCart(selectedItem._id)}
                  />
                  <span>{cartItems[selectedItem._id]}</span>
                  <img
                    src={assets.add_icon_green}
                    alt="Add"
                    onClick={() => addToCart(selectedItem._id)}
                  />
                </div>
              ) : (
                <img
                  src={assets.add_icon_green}
                  alt="Add"
                  className="add-btn"
                  onClick={() => addToCart(selectedItem._id)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
