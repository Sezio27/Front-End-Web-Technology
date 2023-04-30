import { IoCloseSharp } from "react-icons/io5";
import { Item } from "../../../Types/Types";
import { calculateItemDiscount } from "../../../Utilities/SavingsUtility";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import NudgeQuantityRebate from "../../NudgeMessage/NudgeQuantityRebate";
import NudgeUpSell from "../../NudgeMessage/NudgeUpSell";
import "./BasketItem.css";

import { useCartContext } from "../../../contexts/CartContext";

const BasketItem = ({ item }: { item: Item }) => {
  const { removeFromCart, isProductInBasket, getProductName } = useCartContext();

  const { id, name, price, currency, rebateQuantity, rebatePercent, upsellProductId } = item.product;
  const quantity = item.quantity;

  let activeDiscount = false;
  let subTotalWithSavings = 0;

  const getSubtotal = () => {
    let subTotal = price * quantity;
    if (rebateQuantity == null || rebatePercent == null) return subTotal;

    activeDiscount = quantity >= rebateQuantity ? true : false;

    if (activeDiscount) {
      subTotalWithSavings = calculateItemDiscount({
        subTotal: subTotal,
        itemQuantity: undefined,
        rebatePercentage: rebatePercent,
      });
    } else subTotalWithSavings = 0;

    return activeDiscount ? subTotal - subTotalWithSavings : subTotal;
  };

  const CloseButton = () => {
    return (
      <button className="close-button" data-testid="remove-button" onClick={() => removeFromCart(id)}>
        <IoCloseSharp />
      </button>
    );
  };

  const showQuantityRebate = rebateQuantity !== 0 && rebateQuantity && rebatePercent;

  const showUpSell = upsellProductId && !isProductInBasket(upsellProductId);

  return (
    <tr key={id} className="rowWrapper" data-testid='basketItem'>
      <th className="productContainer">
        <div className="rowHeaderImage">
          <img className="image" src={item.product.imageUrl} />
        </div>
        <div className="rowHeaderInnerContainer">
          <div className="rowHeaderSection">{name}</div>
          <div className="rowHeaderSection">
          {showQuantityRebate && (
              <NudgeQuantityRebate
                rebateQuantity={rebateQuantity!}
                rebatePercentDec={rebatePercent!}
                quantity={quantity}
                price={price}
              />
            )}
            {showUpSell && <NudgeUpSell productId={id} upSellName={getProductName(upsellProductId)!} />}
          </div>
        </div>
      </th>
      <td className="quantityContainer">
        <QuantityPicker productId={id} quantity={quantity} />
      </td>
      <td className="priceContainer" data-testid='priceContainer'>
        {getSubtotal() + " " + currency}
        {(activeDiscount && subTotalWithSavings !==0) && <div>{`${subTotalWithSavings},- Saved!`}</div>}
      </td>
      <td className="removeItemContainer">{CloseButton()}</td>
    </tr>
  );
};

export default BasketItem;
