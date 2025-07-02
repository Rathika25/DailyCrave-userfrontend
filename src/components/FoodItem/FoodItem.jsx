import { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, setCartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img className="food-item-image" src={`${url}/image/${image}`} alt={name} />
        {
          cartItems[id] > 0 ? (
            <div className="food-item-counter">
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add" />
            </div>
          ) : (
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              className="add"
              alt="add to cart"
            />
          )
        }
      </div>
      <div className="food-item-info">
        <p className="food-item-name">{name}</p>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-price-rating">
          <p className="food-item-price">₹{price}</p>
          <img src={assets.rating_stars} alt="rating" />
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
