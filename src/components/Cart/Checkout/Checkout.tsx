import "./Checkout.css";
import { TwoDecimals } from "../../../Utilities/NumberUtitlity";
import LockIcon from "../../../assets/lockicon.png";
import { useCartContext } from "../../../contexts/CartContext";
import { handleNavigation } from "../../../Router";

interface ICheckout {
  currency: string;
}

const Checkout = ( currency : ICheckout) => {
  const { calculateTotals } = useCartContext()

  const { totalQuantity, totalPrice, totalRebateSavings, totalOrderSavings, totalPriceAfterSavings, totalDiscountActive } = calculateTotals()
  //${TwoDecimals((totalOrderSavings))}
  const promtSavings = () => {
    if (totalPrice == undefined) return;
    return totalDiscountActive
      ? `You've saved 10% off your total order!`
      : `Buy for ${300 - totalPrice},- more to save 10%`;
  };

  const handleCheckout = () => {
    localStorage.setItem("totalPrice", String(totalPrice));
    handleNavigation("/checkout");
  };

  return (
    <div className="primaryContainer">
      <div className="textSection">
        Items in cart:
        <div className="textEnd" data-testid='totalItems'>{totalQuantity}</div>
      </div>
      {totalPriceAfterSavings > 0 && (
        <div className="textSection total">
          Total price of items:
          <div className="textEnd" data-testid='totalPrice'>{`${TwoDecimals(totalPrice)},- ${currency}`}</div>
        </div>
      )
      }
      {totalRebateSavings > 0 && (
        <div className="savingsText">
          <span>Price savings of items</span>
          <div className="savingsTextEnd">{`- ${TwoDecimals(totalRebateSavings)},-`}</div>
        </div>
      )}
      {totalRebateSavings > 0 && (
        <div className="savingsText">
          <span>Buying for more than 300</span>
          <div className="savingsTextEnd">{`- ${TwoDecimals(totalOrderSavings)},-`}</div>
        </div>
      )}
      <div className="textSection">
        Total price:
        {totalPriceAfterSavings > 0 ? (
          <div className="textEnd totalAfter" data-testid='totalPriceAfter'>{`${TwoDecimals(totalPriceAfterSavings)},- ${currency}`}</div>
        ) :
          <div className="textEnd totalAfter" data-testid='totalPriceAfter'>{`${TwoDecimals(totalPrice)},- ${currency}`}</div>
        }
      </div>

      <div>
        <div className="totalDiscountText"> {promtSavings()} </div>

        <button className="checkoutButton" onClick={() => handleCheckout()}>
          <div className="checkoutButtonInside">
            <img src={LockIcon} className="checkoutButtonIcon" />
            <span className="checkoutButtonText">Checkout</span>
          </div>
        </button>

      </div>
    </div>
  );
};

export default Checkout;
