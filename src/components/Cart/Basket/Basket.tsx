import BasketItem from "../BasketItem/BasketItem";
import "./Basket.css";
import { useCartContext } from "../../../contexts/CartContext";

const Basket = () => {
  const { basketItems } = useCartContext()

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
            key={item.product.id}
            item={item}
            />
        ))}
      </tbody>
    </table>
  );
};

export default Basket;
