import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem'; // ✅ Import existing card
import './Specials.css';

const Specials = () => {
  const { food_list } = useContext(StoreContext);

  const specials = Array.isArray(food_list)
    ? food_list.filter(item => item.special === true)
    : [];

  return (
    <div className="specials-page">
      <h2>Today's Special Items</h2>
      <div className="specials-grid">
        {specials.map(item => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Specials;
