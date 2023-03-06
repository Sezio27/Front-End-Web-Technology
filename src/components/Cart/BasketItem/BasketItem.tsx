import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Item, BasketFunctions } from "../../../Types/Types";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import "./BasketItemTemp.css";
import "./BasketItem.css";

const BasketItem = ({
  product,
  onQuantityChange,
  removeFromCart,
}: { product: Item } & BasketFunctions) => {
  const { id, name, price, currency, quantity } = product;
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
        <IoCloseSharp/>
      </button>
    );
  };

  return (
    <tr key={id} className="rowWrapper">
      <th className="productContainer">
        <div className="rowHeaderImage"> TEST </div>
        <div className="rowHeaderInnerContainer">
          <div className="rowHeaderSection">{name}</div>
          <div className="rowHeaderSection">nudge halløj</div>
        </div>
      </th>
      <td className = "quantityContainer">
        <QuantityPicker
          quantity={itemQuantity}
          onQuantityChange={handleQuantityChange}
        />
      </td>
      <td className ="priceContainer">{getSubtotal() + " " + currency}</td>
      <td className ="removeItemContainer">{CloseButton()}</td>
    </tr>
  );
};

export default BasketItem;
