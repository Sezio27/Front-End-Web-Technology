import { useState, useEffect} from "react";
import "./CheckoutForm.css";

const CheckoutForm = () => {

    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [fName, setFName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [cName, setCName] = useState('');
    const [cVat, setCVat] = useState('');


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        //Object to do stuff with - made from user input info
        const formInfo = { zip, city, address1, address2, fName, phone, email, cName, cVat };
    }

    return (
          <form onSubmit={handleSubmit}>

              <p>
                  <label>ZIP code:</label>
                  <input type="number" name="zip" value={zip}
                         onChange={(e) => setZip(e.target.value)} required />
              </p>
              <p>
                  <label>City:</label>
                  <input type="text" name="city" value={city}
                         onChange={(e) => setCity(e.target.value)} required />
              </p>
              <p>
                  <label>Address line 1:</label>
                  <input type="text" name="address1" value={address1}
                         onChange={(e) => setAddress1(e.target.value)} required />
              </p>
              <p>
                  <label>Address line 2:</label>
                  <input type="text" name="address2" value={address2}
                         onChange={(e) => setAddress2(e.target.value)}  />
              </p>
              <p>
                  <label>Name:</label>
                  <input type="text" name="fName" max="50" value={fName}
                         onChange={(e) => setFName(e.target.value)} required />
              </p>
              <p>
                  <label>Phone:</label>
                  <input type="tel" name="phone" pattern="\d{8}" value={phone}
                         onChange={(e) => setPhone(e.target.value)} required />
              </p>
              <p>
                  <label>Email:</label>
                  <input type="email" name="email" value={email}
                         onChange={(e) => setEmail(e.target.value)} required />
              </p>
              <p>
                  <label>Company name:</label>
                  <input type="text" name="cName" max="40" value={cName}
                         onChange={(e) => setCName(e.target.value)}  />
              </p>
              <p>
                  <label>Company VAT:</label>
                  <input type="text" name="cVat" pattern="\d{8}" value={cVat}
                         onChange={(e) => setCVat(e.target.value)}  />
              </p>
              <button>To payment</button>
          </form>
    )

}

export default CheckoutForm;