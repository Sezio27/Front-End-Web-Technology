import Basket from "./Basket/Basket";
import Checkout from "./Checkout/Checkout";
import "./Cart.css";
import "../../css/LoadingLogo.css"
import reload from "../../assets/reload.png"
import { calculateItemDiscount } from "../../Utilities/SavingsUtility";
import { useCartContext } from "../../contexts/CartContext";
import { useEffect, useState } from "react";
import { fetchProductList } from "../Utility/fetchProducts";

// Custom wait method to showcase icon spinning
const delay = (ms: number) => new Promise(
  resolve => setTimeout(resolve, ms)
);

const Cart = () => {
  const { basketItems, setBasketItems } = useCartContext();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetching items from custom build method. 
    const fetchItems = async () => {
      const items = await fetchProductList()
      setBasketItems(items)
      await delay(3000)
      setLoading(false)
    }
    fetchItems()
  }, []);

  return (
    
    <div className="cartContainer">
      {loading ? <img src={reload} className="loading-logo"/> : 
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
