import "./Checkout.css";
// import lockLogo from "./assets/lockicon.png"
import { FaChevronRight } from "react-icons/fa";
import { RoundToNearestHalf, CutToTwoDecimals } from "../../../Utilities/NumberUtitlity";
import { Link } from "react-router-dom";
import LockIcon from "../../../assets/lockicon.png";
import { BasketTotals } from "../../../Types/Types";

import { useCartContext } from "../../../contexts/CartContext";

interface ICheckout {
  currency: string;
}

const Checkout = ({ currency }: ICheckout) => {
  const {calculateTotals} = useCartContext()

  const {totalQuantity, totalPrice, totalSavings, totalDiscountActive} = calculateTotals()
  
  const promtSavings = () => {
    if (totalPrice == undefined) return; 
    return totalDiscountActive
    ? `You've shaved an extra 10% off your order!`
      : `Buy for ${300 - totalPrice},- more to save 10%`;
  };

  return (
    <div className="primaryContainer">
      <div className="textSection">
        Items in cart:
        <div className="textEnd">{totalQuantity}</div>
      </div>
      <div className="textSection">
        Total price of items:
        <div className="textEnd">{`${CutToTwoDecimals(totalPrice)},- ${currency}`}</div>
      </div>
      {totalSavings > 0 && (
        <div className="savingsText">
          <span>Total price savings</span>
          <div className="savingsTextEnd">{`${totalSavings},-`}</div>
        </div>
      )}
      <div>
        <div className="totalDiscountText"> {promtSavings()} </div>
        <Link to="/Checkout">
          <button className="checkoutButton">
            <div className="checkoutButtonInside">
              <img src={LockIcon} className="checkoutButtonIcon" />
              <span className="checkoutButtonText">Checkout</span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
