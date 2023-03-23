import Basket from "./Basket/Basket";
import Checkout from "./Checkout/Checkout";
import "./Cart.css";
import { calculateItemDiscount } from "../../Utilities/SavingsUtility";
import { useCartContext } from "../../contexts/CartContext";
import { useEffect, useState } from "react";
import { fetchProductList } from "../Utility/fetchProducts";

const Cart = () => {
  const { basketItems, setBasketItems } = useCartContext();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await fetchProductList()
      setBasketItems(items)
      setLoading(false)
    }
    fetchItems()
  }, []);

  return (
    <div className="cartContainer">
      {!loading && basketItems.length > 0 ? (
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
      )}
    </div>
  );
};

export default Cart;
