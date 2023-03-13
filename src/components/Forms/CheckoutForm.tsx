import { useState, useEffect } from "react";
import "./CheckoutForm.css";


const CheckoutForm = () => {

    const DK_ZIP_URL = 'https://api.dataforsyningen.dk/postnumre';

    const [country, setCountry] = useState('Denmark');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [cName, setCName] = useState('');
    const [cVat, setCVat] = useState('');
    const [validZip, setValidZip] = useState(true);
    const [zipsAndCities, setZipsAndCities] = useState<{zip: string, city: string}[]>([]);

    

    useEffect(() => {
        if (country !== 'Denmark')
            setCountry('Denmark')

    }, [country])

    useEffect(() => {
        if (zip.length === 4) {
          const existingZipCityIndex = zipsAndCities.findIndex((item: {zip: string, city: string}) => item.zip === zip);
          if (existingZipCityIndex !== -1) {
            setValidZip(true);
            setCity(zipsAndCities[existingZipCityIndex].city)
          } else {
            setValidZip(false)
          }
        }
      }, [zip]);


    useEffect(() => {

        const fetchItems = async () => {
            try {
                const response = await fetch(DK_ZIP_URL);

                const data = await response.json();

                setZipsAndCities(data.map((item: {nr: string, navn: string}) => ({zip: item.nr, city: item.navn})))

            } catch (error) {
                console.log(error)
            }
          
        }; fetchItems()
    }, [])


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const formInfo = { country, zip, city, address1, address2, fName, phone, email, cName, cVat };
    }


    return (
       <div className="formContainer">
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Country:</label>
                  <input type="text" name="country" value={country}
                         onChange={(e) => setCountry(e.target.value)} required pattern="Denmark" />
              </div>
              <div>
                <div>
                  <label>ZIP code:</label>
                  <input type="text" name="zip" value={zip}
                         onChange={(e) => setZip(e.target.value)} required pattern="\d{4}" />
                   {!validZip &&
                   <div>
                    <p>Invalid Zip Code</p>
                   </div>
                   }

                </div>
              </div>
              <div>
                   

                  <label>City:</label>
                  <input type="text" name="city" value={city}
                         onChange={(e) => setCity(e.target.value)} required/>
              </div>
              
              <div>
                  <label>Address line 1:</label>
                  <input type="text" name="address1" value={address1}
                         onChange={(e) => setAddress1(e.target.value)} required />
              </div>
             <div>
                  <label>Address line 2:</label>
                  <input type="text" name="address2" value={address2}
                         onChange={(e) => setAddress2(e.target.value)}  />
              </div>
            <div>
                  <label>First name:</label>
                  <input type="text" name="fName" max="50" value={fName}
                         onChange={(e) => setFName(e.target.value)} required pattern = "^[A-Za-z]+$"/>
              </div>
             <div>
                  <label>Last name:</label>
                  <input type="text" name="lName" max="50" value={lName}
                         onChange={(e) => setLName(e.target.value)} required pattern = "^[A-Za-z]+$"/>
              </div>
             <div>
                  <label>Phone:</label>
                  <input type="tel" name="phone" value={phone}
                         onChange={(e) => setPhone(e.target.value)} required pattern="\d{8}" />
              </div>
             <div>
                  <label>Email:</label>
                  <input type="email" name="email" value={email}
                         onChange={(e) => setEmail(e.target.value)} required />
              </div>
             <div>
                  <label>Company name:</label>
                  <input type="text" name="cName" max="40" value={cName}
                         onChange={(e) => setCName(e.target.value)}  />
              </div>
             <div>
                  <label>Company VAT:</label>
                  <input type="text" name="cVat" value={cVat}
                         onChange={(e) => setCVat(e.target.value)} pattern="\d{8}" />
              </div>
              <button>To payment</button>

          </form>
       </div>
    )
}

export default CheckoutForm;