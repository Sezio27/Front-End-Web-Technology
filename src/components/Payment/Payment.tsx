import { Form } from "react-router-dom";
import "./Payment.css";

const email = localStorage.getItem('email');
console.log(email);


const Payment = () => {

  return (
    <div className="PaymentContainer">
      <div className="ContentContainer">
        <h1>Payment</h1>
          <form className="checkboxValue">
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
                Would you like to recieve our newsletter?
              </label>
              
            </div>
          </div>

          <div className="comment">
            <label>
              <h2>Comments:</h2>
              <textarea rows={8} cols={50}></textarea>
            </label>
          </div>

          <div className="submit">
            <button type="submit">Submit</button>
          </div>
          </form>

      </div>
    </div> 
  );
/*   const checkboxValue = document.querySelector('from');

        checkboxValue.addEventListner('submit', (e) => {
           e.preventDefault();

          document.querySelectorAll('[type="checkbox"]').forEach(item => {
            if (item.checked === true ){
                checkboxes.push(itemsValue);
      }

  })
      consol.log(checkboxes); */
};
/* }; */

export default Payment;
