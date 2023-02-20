import {useState} from "react";
import QuantityPicker from "../QuantityPicker/QuantityPicker";

type BasketItemProps = {
  id: string;
  name: string; 
  price: number; 
  currency: string; 
  quantity: number; 
  onQuantityChange: (id: string, quantity: number) => void
}

const BasketItem = ({id, name, price, currency, quantity, onQuantityChange}: BasketItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleQuantityChange = (newQuantity: number) => {
    setItemQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };

  const getSubtotal = () => {
    return price * itemQuantity;
  };

  return (
    <tr key={id}>
      <th>{name}</th>
      <td>{price + " " + currency}</td>
      <td><QuantityPicker quantity={itemQuantity} onQuantityChange={handleQuantityChange} /></td>
      <td>{getSubtotal() + " " + currency}</td>
    </tr>
  );
}

export default BasketItem;