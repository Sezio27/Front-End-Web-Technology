import BasketItem from "../BasketItem/BasketItem";
import { Item } from "../../../Types/Types";
import "./Basket.css";

interface IBasket {
  basketItems: Item[];
  setBasketItems: (basketItems: Item[]) => void;
  removeFromCart: (id: string) => void;
  changeToUpsell: (id: string) => void;
  getProductName: (id: string) => string | undefined;
}

const Basket = ({ basketItems, setBasketItems, removeFromCart, changeToUpsell, getProductName }: IBasket) => {

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


  const isProductInBasket = (productId: string) => {
    return basketItems.some(item => item.id == productId)
  }


  return (
   
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
              changeToUpsell={changeToUpsell}
              isProductInBasket={isProductInBasket}
              getProductName = {getProductName}
            />
          ))}
        </tbody>
      </table>
   
  );
};

export default Basket;
