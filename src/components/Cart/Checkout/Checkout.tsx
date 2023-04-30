import "./Checkout.css";
// import lockLogo from "./assets/lockicon.png"
import { FaChevronRight } from "react-icons/fa";
import { RoundToNearestHalf, TwoDecimals } from "../../../Utilities/NumberUtitlity";

import LockIcon from "../../../assets/lockicon.png";


import { useCartContext } from "../../../contexts/CartContext";
import { handleNavigation } from "../../../Router";

interface ICheckout {
  currency: string;
}

const Checkout = ({ currency }: ICheckout) => {
  const {calculateTotals} = useCartContext()

  const {totalQuantity, totalPrice, totalSavings, totalDiscountActive} = calculateTotals()
  
  const promtSavings = () => {
    if (totalPrice == undefined) return; 
    return totalDiscountActive
    ? `You've shaved an extra ${TwoDecimals((totalPrice * 1.1) - totalPrice)} (10%) off your total order!`
      : `Buy for ${300 - totalPrice},- more to save 10%`;
  };

    const handleCheckout = () => {
        localStorage.setItem("totalPrice", String(totalPrice));
    };

  return (
    <div className="primaryContainer">
      <div className="textSection">
        Items in cart:
        <div className="textEnd" data-testid='totalItems'>{totalQuantity}</div>
      </div>
      <div className="textSection">
        Total price of items:
        <div className="textEnd" data-testid='totalPrice'>{`${TwoDecimals(totalPrice)},- ${currency}`}</div>
      </div>
      {totalSavings > 0 && (
        <div className="savingsText">
          <span>Price savings of items</span>
          <div className="savingsTextEnd">{`${totalSavings},-`}</div>
        </div>
      )}
      <div>
        <div className="totalDiscountText"> {promtSavings()} </div>

          <button className="checkoutButton" onClick={() => handleNavigation("/checkout")}>
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
