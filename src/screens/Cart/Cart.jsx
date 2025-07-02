import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import  {StoreContext} from '../../context/StoreContext'
import {assets} from '../../assets/assets/'
import './Cart.css'

const Cart = () => {
  const {cartItems, food_list, removeFromCart, addToCart,getTotalCartAmount,url} =useContext(StoreContext)
  const navigate = useNavigate()
  return (
  <div className='cart'>
   <div className="cart-items-title">
      <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> 
    </div>
    <br /> <hr/>
    {food_list.map((food,index)=>{
      if(cartItems [food._id]>0){
        return (
      <>
      <div className="cart-items-title cart-items-item">
        <img  className="food-image" src={`${url}/image/${food.image}`} alt=""/>
        <p>{food.name}</p>
        <p>₹{food.price}</p>
        <p>{cartItems [food._id]}</p>
        <p>₹{cartItems[food._id] * food.price}</p>

          
          </div>
          <hr/>
          </>
    )
  }
})}
<div className="cart-bottom">
  <div className ="cart-total">
    <h2>Cart Totals</h2>
    <div>
      <div className = "cart-total-details">
        <p>Subtotal</p>
        <p>₹{getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-detalls">
          <p>Delivery Fee</p>
          <p>₹{getTotalCartAmount() ===0?0:50}</p>
          </div>
          <hr />
          <div className="cart-total-details">
          <p>Total</p>
          <p>₹{getTotalCartAmount() ===0?0:getTotalCartAmount()+50}</p>
          </div>
          </div>
          <button onClick={()=>navigate("/order")} >Proceed to Checkout</button>
          </div>
          <div className ="cart-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder=' Enter promo code' />
              <button>Apply</button>
              </div>
            </div>
          </div>
          
       </div>
  )
}

export default Cart