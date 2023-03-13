import "./Checkout.css";
// import lockLogo from "./assets/lockicon.png"
import { FaChevronRight } from "react-icons/fa";
import { RoundToNearestHalf } from "../../Utilities/NumberUtitlity";
import { Link } from "react-router-dom";

interface ICheckout {
  cartQuantity: number;
  totalPrice: number;
  currency: string;
  totalSavings: number;
  totalDiscountActive: boolean;
}

const Checkout = ({ cartQuantity, totalPrice, currency, totalDiscountActive, totalSavings }: ICheckout) => {
  const promtSavings = () => {
    if (totalPrice == undefined) return;

    return totalDiscountActive
      ? `You've shaved an extra 10% (${RoundToNearestHalf(totalPrice * 1.1 - totalPrice)},-) off your order!`
      : `Buy for ${300 - totalPrice},- more to save 10%`;
  };

  return (
    <div className="primaryContainer">
      <div className="textSection">
        Items in cart:
        <div className="textEnd">{cartQuantity}</div>
      </div>
      <div className="textSection">
        Total price of items:
        <div className="textEnd">{`${RoundToNearestHalf(totalPrice)},- ${currency}`}</div>
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
            {/* <img src={lockLogo} className="checkoutButtonIcon"/> */}
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
