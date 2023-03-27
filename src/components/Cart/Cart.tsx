import Basket from "./Basket/Basket";
import Checkout from "./Checkout/Checkout";
import "./Cart.css";
import { calculateItemDiscount } from "../../Utilities/SavingsUtility";
import { useCartContext } from "../../contexts/CartContext";
import { useState } from "react";


const Cart = () => {
  const { basketItems, fetchZips } = useCartContext();
 
  const [firstTime, setFirstTime] = useState(true)

  // cart (sand) -> checkout (falsk) -> user klikker tilbage, bliver sand igen

  if (firstTime) {
    fetchZips()
    setFirstTime(false)
  }
  
  return (
    <div className="cartContainer">
      {basketItems.length > 0 ? (
        <div className="cartSection">
          <div className="basketContainer">
            <Basket/>
          </div>
          <div className="checkoutContainer">
            <Checkout currency={""}/>
          </div>
        </div>
      ) : (
        <span>Your basket is empty.</span>
      )}
    </div>
  );
};

export default Cart;
