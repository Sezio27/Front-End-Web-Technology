import { useState, useEffect } from "react";
import products from "../../../data/products.json";
import BasketItem from "../BasketItem/BasketItem";
import NudgeMessage from "../../NudgeMessage/NudgeMessage";
import { Product, Item } from "../../../Types/Types";
import "./Basket.css";

interface IBasket {
  basketItems: Item[];
  setBasketItems: (basketItems: Item[]) => void;
}

const Basket = ({ basketItems, setBasketItems }: IBasket) => {
  const onQuantityChange = (productId: string, quantity: number) => {
    const existingItemIndex = basketItems.findIndex(
      (item) => item.id === productId
    );
    if (existingItemIndex !== -1) {
      const updatedCart = [...basketItems];
      updatedCart[existingItemIndex].quantity = quantity;
      setBasketItems(updatedCart);
    }
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = basketItems.filter((item) => item.id !== productId);
    setBasketItems(updatedCart);
  };

  return (
    <div id="basket">
      <table className="basketTable">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {basketItems.map((item) => (
            <BasketItem
              key={item.id}
              product={item}
              onQuantityChange={onQuantityChange}
              removeFromCart={removeFromCart}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Basket;
