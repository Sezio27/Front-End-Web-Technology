import { Form } from "react-router-dom";
import "./Payment.css";

const email = localStorage.getItem('email');
console.log(email);

// Betalingskomponent
const Payment = () => {

  return (
    <div className="PaymentContainer">
      <div className="ContentContainer">
        <h1>Betaling</h1>
          <form className="checkboxValue">
            {/* Checkbox-sektion */}
            <div className="checkboxes">
              <div>
                <label>
                  <input type="checkbox" required />
                  Acceptér venligst vores vilkår og betingelser
                </label>
              </div>
              <div>
                 <label>
                    <input type="checkbox" />
                    Vil du gerne modtage vores nyhedsbrev?
                  </label>
              </div>
            </div>

            {/* Kommentarsektion */}
            <div className="comment">
              <label>
                <h2>Kommentarer:</h2>
                <textarea rows={8} cols={50}></textarea>
              </label>
            </div>

            {/* Indsend-knap */}
            <div className="submit">
              <button type="submit">Send</button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default Payment;