import "./Payment.css";
import { handleNavigation } from "../../Router";

const Payment = () => {

  const goBack = () => {
    window.history.back();
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleNavigation("/checkout/receipt")
  };

  return (
    <div className="PaymentContainer">
      <div className="ContentContainer">
        <h1>Payment</h1>
          <form className="checkboxValue" onSubmit={handleSubmit}>
            <div className="checkboxes">
              <div>
              <label>
                <input type="checkbox" required />
                  Please accept our Terms and conditions
                </label>
              </div>
              <div>
                 <label>
                <input type="checkbox" />
                Would you like to receive our newsletter?
              </label>
              
            </div>
          </div>

          <div className="comment">
            <label>
              <h2>Comments:</h2>
              <textarea rows={8} cols={50}></textarea>
            </label>
          </div>

          <br />
          <table>
            <button className="backButton" type="button" onClick={goBack}>Back</button>
            
            <button className="submit">Submit</button>
          </table>
          
          </form>

      </div>
    </div> 
  );

};

export default Payment;
