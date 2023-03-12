import "./Checkout.css";
// import lockLogo from "./assets/lockicon.png"
import { FaChevronRight } from "react-icons/fa";

interface ICheckout {
  cartQuantity: number;
  totalPrice: number | undefined;
  currency: string;
  totalDiscountActive: boolean;
}

const Checkout = ({ cartQuantity, totalPrice, currency, totalDiscountActive }: ICheckout) => {
  const promtSavings = () => {
    if (totalPrice == undefined) return;
    return totalDiscountActive ? `You've shaved 10% of your order!` : `Buy for ${300 - totalPrice},- more to save 10%!`;
  };

  return (
    <div className="primaryContainer">
      <div className="textSection">
        Items in cart:
        <div className="textEnd">{cartQuantity}</div>
      </div>
      <div className="textSection">
        Total price of items:
        <div className="textEnd">{`${totalPrice},- ${currency}`}</div>
      </div>
      <div>
        <div className="savingsText"> {promtSavings()} </div>
        <button className="checkoutButton">
          {/* <img src={lockLogo} className="checkoutButtonIcon"/> */}
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
