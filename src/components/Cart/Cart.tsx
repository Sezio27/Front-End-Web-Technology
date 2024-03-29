import Basket from "./Basket/Basket";
import Checkout from "./Checkout/Checkout";
import "./Cart.css";
import "../../css/LoadingLogo.css"
import reload from "../../assets/reload.png"
import { useCartContext } from "../../contexts/CartContext";
import { useEffect, useState } from "react";


interface ICart {
  wantInitialLoading: boolean
}

const Cart = ({wantInitialLoading} : ICart) => {
  const { basketItems } = useCartContext();

  const [loading, setLoading] = useState<boolean>(false);


  //Manually / forced loading
  useEffect(() => {
    if(!wantInitialLoading)
      return
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  
  /* This is for the actual implementation of loading, meaning the site loads untill data has been fetched

  useEffect(() => {
    if(basketItems.length > 0 ) setLoading(false)
  }, [basketItems]);
   */

  return (
    
    <div className="cartContainer">
      {loading ? <img src={reload} className="loading-logo" alt="loading-logo"/> :
      (basketItems.length > 0 ? (
        <div className="cartSection">
          <div className="basketContainer">
            <Basket />
          </div>
          <div className="checkoutContainer">
            <Checkout currency={""} />
          </div>
        </div>
      ) : (
        <span>Your basket is empty.</span>
      ))}
    </div>
  )
};

export default Cart;
