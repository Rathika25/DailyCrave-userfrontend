import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2 className="food-display-title">Explore our Food-List</h2>
      <div className="food-display-list">
        {
          food_list.map((item) => {
            if ((category === "All" || category === item.category) && !item.special) {
              return (
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                />
              );
            } else {
              return null;
            }
          })
        }
      </div>
    </div>
  );
};

export default FoodDisplay;
