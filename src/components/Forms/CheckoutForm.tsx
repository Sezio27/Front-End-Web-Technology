import { useState, useEffect } from "react";
import "./CheckoutForm.css";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import { UserInfo } from "../../Types/Types";

const CheckoutForm = () => {
  const { userInfo, setUserInfo, zipsAndCities, fetchZips } = useCartContext();
  const navigate = useNavigate();
  const [validZip, setValidZip] = useState(true);
  const [firstTime, setFirstTime] = useState(true);

  if (firstTime) {
    fetchZips();
    setFirstTime(false);
  }

  const updateUserInfo = (key: keyof UserInfo, value: string) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  useEffect(() => {
    if (userInfo.zipCode.length === 4) {
      console.log(zipsAndCities);
      const existingZipCityIndex = zipsAndCities.findIndex(
        (item: { zip: string; city: string }) => item.zip === userInfo.zipCode
      );
      if (existingZipCityIndex !== -1) {
        setValidZip(true);
        updateUserInfo("city", zipsAndCities[existingZipCityIndex].city);
      } else {
        setValidZip(false);
      }
    }
  }, [userInfo.zipCode]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    //
    if (validZip) {
      localStorage.setItem("email", userInfo.email);
      // window.location.href = '/Checkout/Payment';
      localStorage.setItem("name", userInfo.firstName);
      navigate("/Checkout/Payment");
    }
  };

  return (
    <div className="formContainer">
      <form className="theForm" onSubmit={handleSubmit}>
        <div className="formDivE">
          <label className="formLabel">Country *</label>
          <input
            className="formInput"
            type="text"
            name="country"
            value={userInfo.country}
            onChange={(e) => updateUserInfo("country", e.target.value)}
            required
            pattern="Denmark"
            disabled
          />
        </div>

        <div className="formDivE">
          <label className="formLabel">ZIP code *</label>
          <input
            className="formInput"
            type="text"
            name="zip"
            value={userInfo.zipCode}
            onChange={(e) => updateUserInfo("zipCode", e.target.value)}
            required
            pattern="\d{4}"
          />
          {!validZip && (
            <div>
              <p className="pError">Invalid Zip Code</p>
            </div>
          )}
        </div>

        <div className="formDivE">
          <label className="formLabel">City *</label>
          <input
            className="formInput"
            type="text"
            name="city"
            value={userInfo.city}
            onChange={(e) => updateUserInfo("city", e.target.value)}
            required
            disabled={validZip}
          />
        </div>

        <div className="formDivE">
          <label className="formLabel">Address line 1 *</label>
          <input
            className="formInput"
            type="text"
            name="address1"
            value={userInfo.address1}
            onChange={(e) => updateUserInfo("address1", e.target.value)}
            required
          />
        </div>

        <div className="formDivE">
          <label className="formLabel">Address line 2</label>
          <input
            className="formInput"
            type="text"
            name="address2"
            value={userInfo.address2}
            onChange={(e) => updateUserInfo("address2", e.target.value)}
          />
        </div>

        <div className="formDivE">
          <label className="formLabel">Billing Address</label>
          <input
            className="formInput"
            type="text"
            name="bAddress"
            value={userInfo.billingAddress}
            onChange={(e) => updateUserInfo("billingAddress", e.target.value)}
          />
        </div>

        <div className="formDivE">
          <label className="formLabel">First name *</label>
          <input
            className="formInput"
            type="text"
            name="fName"
            max="50"
            value={userInfo.firstName}
            onChange={(e) => updateUserInfo("firstName", e.target.value)}
            required
            pattern="^[A-Za-z]+$"
          />
        </div>

        <div className="formDivE">
          <label className="formLabel">Last name *</label>
          <input
            className="formInput"
            type="text"
            name="lName"
            max="50"
            value={userInfo.lastName}
            onChange={(e) => updateUserInfo("lastName", e.target.value)}
            required
            pattern="^[A-Za-z]+$"
          />
        </div>

        <div className="formDivE">
          <label className="formLabel">Phone *</label>
          <input
            className="formInput"
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={(e) => updateUserInfo("phone", e.target.value)}
            required
            pattern="(\+45|45)?[1-9]\d{7}"
          />
        </div>

        <div className="formDivE">
          <label className="formLabel">Email *</label>
          <input
            className="formInput"
            type="email"
            name="email"
            value={userInfo.email}
            onChange={(e) => updateUserInfo("email", e.target.value)}
            required
          />
        </div>

        <div className="formDivE">
          <label className="formLabel">Company name</label>
          <input
            className="formInput"
            type="text"
            name="cName"
            max="40"
            value={userInfo.companyName}
            onChange={(e) => updateUserInfo("companyName", e.target.value)}
          />
        </div>

        <div className="formDivE">
          <label className="formLabel">Company VAT</label>
          <input
            className="formInput"
            type="text"
            name="cVat"
            value={userInfo.companyVAT}
            onChange={(e) => updateUserInfo("companyVAT", e.target.value)}
            pattern="\d{8}"
          />
        </div>

        <br />

        <button className="formButton">To payment</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
