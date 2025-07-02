import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const url = 'https://dailycrave-backend1.onrender.com';

  const fetchFoodList = async () => {
    const response = await axios.get(url + '/api/food/list');
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.get(url + "/api/cart/get", { headers: { token } });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    const updatedCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] - 1 };
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.delete(`${url}/api/cart/remove?itemId=${itemId}`, { headers: { token } });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (let eltId in cartItems) {
      if (cartItems[eltId] > 0) {
        let itemInfo = food_list.find(food => food._id === eltId);
        if (itemInfo) total += itemInfo.price * cartItems[eltId];
      }
    }
    return total;
  };

  const getTotalCartItems = () => {
  let total = 0;
  Object.values(cartItems).forEach(qty => {
    total += qty;
  });
  return total;
};


 

  const contextValue = {
    cartItems,
    setCartItems,
    food_list,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems, 
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
