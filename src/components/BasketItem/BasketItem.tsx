import {useState} from "react";
import {IoCloseSharp} from "react-icons/io5";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import { CartItem } from "../Basket/Basket";

type BasketFunctions = {
  onQuantityChange: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
}

const BasketItem = ({product, onQuantityChange, removeFromCart}: {product: CartItem} & BasketFunctions) => {
  const {id, name, price, currency, quantity} = product;
  const [itemQuantity, setItemQuantity] = useState(quantity);
  
  const handleQuantityChange = (newQuantity: number) => {
    setItemQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };

  const getSubtotal = () => {
    return price * itemQuantity;
  };

  const CloseButton = () => {
    return (
      
      <button className="close-button" onClick={() => removeFromCart(id)}>
        <IoCloseSharp size="20" color="#c52f2f"/>
      </button>
    );
  }

  return (
    <tr key={id}>
      <th>{name}</th>
      <td>{price + " " + currency}</td>
      <td><QuantityPicker quantity={itemQuantity} onQuantityChange={handleQuantityChange} /></td>
      <td>{getSubtotal() + " " + currency}</td>
      <td>{CloseButton()}</td>
    </tr>
  );
}

export default BasketItem;