import { useState, useEffect, useContext } from "react";
import "./CheckoutForm.css";
import { Link, useNavigate} from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import { UserInfo } from "../../Types/Types";


const CheckoutForm = () => {

    const {userInfo, setUserInfo} = useCartContext()
    const DK_ZIP_URL = 'https://api.dataforsyningen.dk/postnumre';
    const navigate = useNavigate();
    const [validZip, setValidZip] = useState(true);
    const [zipsAndCities, setZipsAndCities] = useState<{zip: string, city: string}[]>([]);

 const updateUserInfo = (key: keyof UserInfo, value: string) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };


    useEffect(() => {
        if (userInfo.zipCode.length === 4) {
            console.log(zipsAndCities)
            const existingZipCityIndex = zipsAndCities.findIndex((item: {zip: string, city: string}) => item.zip === userInfo.zipCode);
            if (existingZipCityIndex !== -1) {
                setValidZip(true);
                updateUserInfo("city", zipsAndCities[existingZipCityIndex].city)
            } else {
                setValidZip(false)
            }
        }
    }, [userInfo.zipCode]);


    useEffect(() => {

        const fetchItems = async () => {
            try {
                const response = await fetch(DK_ZIP_URL);

                const data = await response.json();

                setZipsAndCities(data.map((item: {code: string, name: string}) => ({zip: item.code, city: item.name})))

            } catch (error) {
                console.log(error)
            }

        }; fetchItems()
    }, [])


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        navigate("/Checkout/Payment");
    }

  


    return (
        <div className="formContainer">
            <form className="theForm" onSubmit={handleSubmit}>

                <div className="formDivE">
                    <label className="formLabel">Country *</label>
                    <input className="formInput" type="text" name="country" value={userInfo.country}
                           onChange={(e) => updateUserInfo("country", e.target.value)} required pattern="Denmark" disabled />
                </div>

                <div className="formDivE">
                    <label className="formLabel">ZIP code *</label>
                    <input className="formInput" type="text" name="zip" value={userInfo.zipCode}
                           onChange={(e) => updateUserInfo("zipCode",e.target.value)} required pattern="\d{4}" />
                    {!validZip &&
                        <div>
                            <p className="pError">Invalid Zip Code</p>
                        </div>
                    }
                </div>

                <div className="formDivE">
                    <label className="formLabel">City *</label>
                    <input className="formInput" type="text" name="city" value={userInfo.city}
                           onChange={(e) => updateUserInfo("city",e.target.value)} required/>
                </div>

                <div className="formDivE">
                    <label className="formLabel">Address line 1 *</label>
                    <input className="formInput" type="text" name="address1" value={userInfo.address1}
                           onChange={(e) => updateUserInfo("address1",e.target.value)} required />
                </div>

                <div className="formDivE">
                    <label className="formLabel">Address line 2</label>
                    <input className="formInput" type="text" name="address2" value={userInfo.address2}
                           onChange={(e) => updateUserInfo("address2",e.target.value)}  />
                </div>

                <div className="formDivE">
                    <label className="formLabel">Billing Address</label>
                    <input className="formInput" type="text" name="bAddress" value={userInfo.billingAddress}
                           onChange={(e) => updateUserInfo("billingAddress",e.target.value)}  />
                </div>

                <div className="formDivE">
                    <label className="formLabel">First name *</label>
                    <input className="formInput" type="text" name="fName" max="50" value={userInfo.firstName}
                           onChange={(e) => updateUserInfo("firstName",e.target.value)} required pattern = "^[A-Za-z]+$"/>
                </div>

                <div className="formDivE">
                    <label className="formLabel">Last name *</label>
                    <input className="formInput" type="text" name="lName" max="50" value={userInfo.lastName}
                           onChange={(e) => updateUserInfo("lastName",e.target.value)} required pattern = "^[A-Za-z]+$"/>
                </div>

                <div className="formDivE">
                    <label className="formLabel">Phone *</label>
                    <input className="formInput" type="tel" name="phone" value={userInfo.phone}
                           onChange={(e) => updateUserInfo("phone",e.target.value)} required pattern="(\+45|45)?[1-9]\d{7}" />
                </div>

                <div className="formDivE">
                    <label className="formLabel">Email *</label>
                    <input className="formInput" type="email" name="email" value={userInfo.email}
                           onChange={(e) => updateUserInfo("email",e.target.value)} required />
                </div>

                <div className="formDivE">
                    <label className="formLabel">Company name</label>
                    <input className="formInput" type="text" name="cName" max="40" value={userInfo.companyName}
                           onChange={(e) => updateUserInfo("companyName",e.target.value)}  />
                </div>

                <div className="formDivE">
                    <label className="formLabel">Company VAT</label>
                    <input className="formInput" type="text" name="cVat" value={userInfo.companyVAT}
                           onChange={(e) => updateUserInfo("companyVAT",e.target.value)} pattern="\d{8}" />
                </div>

                <br/>

                
                    <button className="formButton">To payment</button>
            
            </form>
        </div>
    )
}

export default CheckoutForm;