import { useState, useEffect } from "react";
import "./CheckoutForm.css";


const CheckoutForm = () => {

    const POSTNUMRE_URL = 'https://api.dataforsyningen.dk/postnumre';

    const [country, setCountry] = useState('Denmark');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [fName, setFName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [cName, setCName] = useState('');
    const [cVat, setCVat] = useState('');

    useEffect(() => {

            if (country !== 'Denmark')
                setCountry('Denmark')

    }, [country])

    //Bruges som en prop så values kan tilgås i useEffect
    let [byData, setByData] = useState([
        {
            "href": "https://api.dataforsyningen.dk/postnumre/1050",
            "nr": "1050",
            "navn": "København K",
            "stormodtageradresser": null,
            "bbox": [
                12.5841266,
                55.67871944,
                12.58827962,
                55.68185111
            ],
            "visueltcenter": [
                12.58600133,
                55.68065246
            ],
            "kommuner": [
                {
                    "href": "https://api.dataforsyningen.dk/kommuner/0101",
                    "kode": "0101",
                    "navn": "København"
                }
            ],
            "ændret": "2018-04-30T15:23:13.528Z",
            "geo_ændret": "2014-11-04T16:01:00.879Z",
            "geo_version": 1,
            "dagi_id": "191050"
        }])

    useEffect(() => {

        const fetchItems = async () => {

            const response = await fetch(POSTNUMRE_URL);
            byData = (await response.json());

            for (let i = 0; i < byData.length; i++) {
                if (zip === byData[i].nr) {
                    setCity(byData[i].navn);
                }
                //Måske lidt ooga booga måde at validere zip for nu..
                else if (zip.length > 3 && !byData.some(by => by.nr === zip)) {
                    setZip('');
                }
            }
        }
        (async () => await fetchItems())();
    }, [zip])

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        //Et form objekt - til senere?
        const formInfo = { country, zip, city, address1, address2, fName, phone, email, cName, cVat };
    }

    return (
          <form onSubmit={handleSubmit}>
              <p>
                  <label>Country:</label>
                  <input type="text" name="country" value={country}
                         onChange={(e) => setCountry(e.target.value)} required pattern="Denmark" />
              </p>
              <p>
                  <label>ZIP code:</label>
                  <input type="text" name="zip" value={zip}
                         onChange={(e) => setZip(e.target.value)} required pattern="\d{4}" />
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
                  <input type="tel" name="phone" value={phone}
                         onChange={(e) => setPhone(e.target.value)} required pattern="\d{8}" />
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
                  <input type="text" name="cVat" value={cVat}
                         onChange={(e) => setCVat(e.target.value)} pattern="\d{8}" />
              </p>
              <button>To payment</button>
          </form>
    )
}

export default CheckoutForm;