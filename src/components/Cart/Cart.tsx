import Basket from "./Basket/Basket";
import UpSellList from "../UpSell/UpSellList";
import Checkout from "./Checkout/Checkout";
import products from "../../data/products.json";
import { Product, Item, BasketTotals } from "../../Types/Types";
import { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [basketItems, setBasketItems] = useState<Item[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const tempBasketItems = products.map((product) => ({
      id: product.id,
      quantity: 0,
      name: product.name,
      price: product.price,
      currency: product.currency,
    }));
    setBasketItems(tempBasketItems);
  }, []);
  
  useEffect(() => {
    calculateTotals()
  }, [basketItems]);

  const calculateTotals = () => {
    let totals: BasketTotals = {totalQuantity: 0, totalPrice: 0}
    basketItems.map(({price, quantity}:Item) => {
      totals.totalPrice += price*quantity
      totals.totalQuantity += quantity
    })
    setTotalPrice(totals.totalPrice)
    setTotalQuantity(totals.totalQuantity)
  }
    
  return (
    <div className="cartContainer">
      <div className="cartSection">
        <div className="basketContainer">
          <Basket basketItems={basketItems} setBasketItems={setBasketItems} />
        </div>
        <div className="checkoutContainer">
          <Checkout cartQuantity={totalQuantity} totalPrice={totalPrice} currency={""} />
        </div>
      </div>
      <div className="cartSection">
        
        <UpSellList />
      </div>
    </div>
  );
};

export default Cart;
