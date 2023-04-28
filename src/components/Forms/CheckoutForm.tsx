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

  // Henter postnumre første gang komponenten renderes
  if (firstTime) {
    fetchZips();
    setFirstTime(false);
  }

  // Opdaterer brugeroplysninger med den givne nøgle og værdi
  const updateUserInfo = (key: keyof UserInfo, value: string) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  // Opdaterer byen baseret på postnummeret og tjekker, om postnummeret er gyldigt
  useEffect(() => {
    if (userInfo.zipCode.length === 4) {
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

  // Håndterer formularindsendelse og navigerer til betalingssiden
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validZip) {
      localStorage.setItem("email", userInfo.email);
      localStorage.setItem("name", userInfo.firstName);
      navigate("/Checkout/Payment");
    }
  };

  return (
    <div className="formContainer">
      <form className="theForm" onSubmit={handleSubmit}>
        {/* Land */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="country">Country *</label>
          <input
            className="formInput"
            type="text"
            name="country"
            id="country"
            value={userInfo.country}
            onChange={(e) => updateUserInfo("country", e.target.value)}
            required
            pattern="Denmark"
            disabled
          />
        </div>

        {/* Postnummer */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="zip">ZIP code *</label>
          <input
            className="formInput"
            type="text"
            name="zip"
            id="zip"
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

        {/* By */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="city">City *</label>
          <input
            className="formInput"
            type="text"
            name="city"
            id="city"
            value={userInfo.city}
            onChange={(e) => updateUserInfo("city", e.target.value)}
            required
            disabled={!validZip}/>
        </div>
            {/* Adresse linje 1 */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="address1">Address line 1 *</label>
          <input
            className="formInput"
            type="text"
            name="address1"
            id="address1"
            value={userInfo.address1}
            onChange={(e) => updateUserInfo("address1", e.target.value)}
            required
          />
        </div>

        {/* Adresse linje 2 */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="address2">Address line 2</label>
          <input
            className="formInput"
            type="text"
            name="address2"
            id="address2"
            value={userInfo.address2}
            onChange={(e) => updateUserInfo("address2", e.target.value)}
          />
        </div>

        {/* Faktureringsadresse */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="billingAddress">Billing Address</label>
          <input
            className="formInput"
            type="text"
            name="billingAddress"
            id="billingAddress"
            value={userInfo.billingAddress}
            onChange={(e) => updateUserInfo("billingAddress", e.target.value)}
          />
        </div>

        {/* Fornavn */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="firstName">First name *</label>
          <input
            className="formInput"
            type="text"
            name="firstName"
            id="firstName"
            max="50"
            value={userInfo.firstName}
            onChange={(e) => updateUserInfo("firstName", e.target.value)}
            required
            pattern="^[A-Za-z]+$"
          />
        </div>

        {/* Efternavn */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="lastName">Last name *</label>
          <input
            className="formInput"
            type="text"
            name="lastName"
            id="lastName"
            max="50"
            value={userInfo.lastName}
            onChange={(e) => updateUserInfo("lastName", e.target.value)}
            required
            pattern="^[A-Za-z]+$"
          />
        </div>

        {/* Telefon */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="phone">Phone *</label>
          <input
            className="formInput"
            type="tel"
            name="phone"
            id="phone"
            value={userInfo.phone}
            onChange={(e) => updateUserInfo("phone", e.target.value)}
            required
            pattern="(\+45|45)?[1-9]\d{7}"
          />
        </div>

        {/* E-mail */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="email">Email *</label>
          <input
            className="formInput"
            type="email"
            name="email"
            id="email"
            value={userInfo.email}
            onChange={(e) => updateUserInfo("email", e.target.value)}
            required
          />
        </div>

        {/* Firmanavn */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="companyName">Company name</label>
          <input
            className="formInput"
            type="text"
            name="companyName"
            id="companyName"
            max="40"
            value={userInfo.companyName}
            onChange={(e) => updateUserInfo("companyName", e.target.value)}/>
        </div>

        {/* Firmaets momsnummer */}
        <div className="formDivE">
          <label className="formLabel" htmlFor="companyVat">Company VAT</label>
          <input
            className="formInput"
            type="text"
            name="companyVat"
            id="companyVat"
            value={userInfo.companyVAT}
            onChange={(e) => updateUserInfo("companyVAT", e.target.value)}
            pattern="\d{8}"
          />
        </div>

        <br />

        {/* Betalingsknap */}
        <button className="formButton">To payment</button>
      </form>
    </div>
  );
};
export default CheckoutForm;