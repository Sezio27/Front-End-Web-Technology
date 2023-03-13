import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Item, BasketFunctions, SavingsActionKind } from "../../../Types/Types";
import { RoundToNearestHalf } from "../../Utilities/NumberUtitlity";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import "./BasketItemTemp.css";
import "./BasketItem.css";
import NudgeQuantityRebate from "../../NudgeMessage/NudgeQuantityRebate";
import NudgeUpSell from "../../NudgeMessage/NudgeUpSell";


const BasketItem = ({
  product,
  onQuantityChange,
  removeFromCart,
  changeToUpsell,
  isProductInBasket,
  getProductName,

   }: { product: Item } & BasketFunctions) => {
  
  const { id, name, price, currency, quantity, rebateQuantity, rebatePercent, upsellProductId } = product;
  const [itemQuantity, setItemQuantity] = useState(quantity);
  let activeDiscount: boolean = false;
  let priceSavings: number = 0;
  
  
  const handleQuantityChange = (newQuantity: number) => {
    setItemQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };

  const getSubtotal = () => {
    let subTotal: number = price * itemQuantity;
    let subTotalWithSavings: number = 0;
    if(rebateQuantity == null || rebatePercent == null) return null;
    
    activeDiscount = itemQuantity >= rebateQuantity ? true : false
    
    if (activeDiscount) {
      subTotalWithSavings = RoundToNearestHalf(subTotal * (1 - rebatePercent))
      const beforeSavings: number = priceSavings;
      priceSavings = RoundToNearestHalf(subTotal - subTotalWithSavings)
      
    } else priceSavings = 0
    
    return activeDiscount ? subTotalWithSavings : subTotal
  };

  const CloseButton = () => {
    return (
      <button className="close-button" onClick={() => removeFromCart(id)}>
        <IoCloseSharp />
      </button>
    );
  };

  const showQuantityRebate = rebateQuantity && rebatePercent;

  const showUpSell = upsellProductId && !isProductInBasket(upsellProductId);

  return (
    <tr key={id} className="rowWrapper">
      <th className="productContainer">
        <div className="rowHeaderImage"> Img </div>
        <div className="rowHeaderInnerContainer">
          <div className="rowHeaderSection">{name}</div>
          <div className="rowHeaderSection">
            {showQuantityRebate ? (
              <NudgeQuantityRebate
                rebateQuantity={rebateQuantity!}
                rebatePercentDec={rebatePercent!}
                quantity={quantity}
                price={price}
              />
            ) : (
              <></>
            )}
            {showUpSell ? (
              <NudgeUpSell productId={id} upSellName={getProductName(upsellProductId)!} changeToUpsell={changeToUpsell} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </th>
      <td className="quantityContainer">
        <QuantityPicker quantity={itemQuantity} onQuantityChange={handleQuantityChange} />
      </td>
      <td className="priceContainer">
        {getSubtotal() + " " + currency}
        { activeDiscount && 
        <div>
          {`saved ${priceSavings},-`}
        </div>
        }
      </td>
      <td className="removeItemContainer">{CloseButton()}</td>
    </tr>
  );
};

export default BasketItem;
