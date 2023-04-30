import { useState, useEffect, SyntheticEvent } from "react";
import "./CheckoutForm.css";
import { useCartContext } from "../../contexts/CartContext";
import { UserInfo } from "../../Types/Types";
import { handleNavigation, handlePop } from "../../Router";

const CheckoutForm = () => {
  
  const [validZip, setValidZip] = useState(true);
  const [zipsAndCities, setZipsAndCities] = useState<{ zip: string, city: string }[]>(() => {
    const savedZipCities = localStorage.getItem("ZipCities");
    return savedZipCities ? JSON.parse(savedZipCities) : [];
  });;

  const getInitialUserInfo = (): UserInfo => {
    const defaultUserInfo: UserInfo = {
      country: "Denmark",
      zipCode: "",
      city: "",
      address1: "",
      address2: "",
      billingAddress: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      companyName: "",
      companyVAT: "",
    };
  
    const savedUserInfo: Partial<UserInfo> = {};

    Object.keys(defaultUserInfo).forEach((key) => {
      const keyT = key as keyof UserInfo;
      const value = localStorage.getItem(key);
      if (value) {
        savedUserInfo[keyT] = value;
      }
    });
   
    return { ...defaultUserInfo, ...savedUserInfo };
  };

  const [userInfo, setUserInfo] = useState<UserInfo>(getInitialUserInfo());

  const updateUserInfo = (key: keyof UserInfo, value: string) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  const saveInput = (key: keyof UserInfo) => {
    localStorage.setItem(key, userInfo[key])
  };




  //Fetch zip/city info if not fetched before (not saved in localStorage)
  const fetchZips = async () => {
    console.log("FETCHING ZIP CODES")
    try {

      const DK_ZIP_URL = "https://api.dataforsyningen.dk/postnumre";
      const response = await fetch(DK_ZIP_URL);
      const data = await response.json();

      const zipcity = data.map((item: { nr: string, navn: string }) => ({ zip: item.nr, city: item.navn }))
      localStorage.setItem("ZipCities", JSON.stringify(zipcity))
      setZipsAndCities(zipcity)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (zipsAndCities.length < 1) {
      fetchZips();
    }

  }, []);

  //Update city-info immediately if valid zip otherwise set city-info blank and show invalid zip 
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
    } else {
      updateUserInfo("city", "")
    }
  }, [userInfo.zipCode]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (validZip) {
      // localStorage.setItem("email", userInfo.email);
      // localStorage.setItem("name", userInfo.firstName);
      // localStorage.setItem("name2", userInfo.lastName);
      // localStorage.setItem("address1", userInfo.address1);

      handleNavigation("/payment")
    }
  };
 
  return (
    <div className="formContainer">
      <form className="theForm" onSubmit={handleSubmit}>
        <div className="formDivE">
          <label className="formLabel" htmlFor="country">
            Country *
          </label>
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

        <div className="formDivE">
          <label className="formLabel" htmlFor="zip">
            ZIP code *
          </label>
          <input
            className="formInput"
            type="text"
            name="zip"
            id="zip"
            value={userInfo.zipCode}
            onChange={(e) => updateUserInfo("zipCode", e.target.value)}
            onBlur={() => saveInput("zipCode")}
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
          <label className="formLabel" htmlFor="city">
            City *
          </label>
          <input
            className="formInput"
            type="text"
            name="city"
            id="city"
            value={userInfo.city}
            onChange={(e) => updateUserInfo("city", e.target.value)}
            required
            disabled={validZip}
          />
        </div>

        <div className="formDivE">
          <label className="formLabel" htmlFor="address1">
            Address line 1 *
          </label>
          <input
            className="formInput"
            type="text"
            name="address1"
            id="address1"
            value={userInfo.address1}
            onChange={(e) => updateUserInfo("address1", e.target.value)}
            onBlur={() => saveInput("address1")}
            required
          />
        </div>

        <div className="formDivE">
          <label className="formLabel" htmlFor="address2">
            Address line 2
          </label>
          <input
            className="formInput"
            type="text"
            name="address2"
            id="address2"
            value={userInfo.address2}
            onChange={(e) => updateUserInfo("address2", e.target.value)}
            onBlur={() => saveInput("address2")}
          />
        </div>

        <div className="formDivE">
          <label className="formLabel" htmlFor="billingAddress">
            Billing Address
          </label>
          <input
            className="formInput"
            type="text"
            name="billingAddress"
            id="billingAddress"
            value={userInfo.billingAddress}
            onChange={(e) => updateUserInfo("billingAddress", e.target.value)}
            onBlur={() => saveInput("billingAddress")}
          />
        </div>

        <div className="formDivE">
          <label className="formLabel" htmlFor="firstName">
            First name *
          </label>
          <input
            className="formInput"
            type="text"
            name="firstName"
            id="firstName"
            max="50"
            value={userInfo.firstName}
            onChange={(e) => updateUserInfo("firstName", e.target.value)}
            onBlur={() => saveInput("firstName")}
            required
            pattern="^[A-Za-z]+$"
          />
        </div>

        <div className="formDivE">
          <label className="formLabel" htmlFor="lastName">
            Last name *
          </label>
          <input
            className="formInput"
            type="text"
            name="lastName"
            id="lastName"
            max="50"
            value={userInfo.lastName}
            onChange={(e) => updateUserInfo("lastName", e.target.value)}
            onBlur={() => saveInput("lastName")}
            required
            pattern="^[A-Za-z]+$"
          />
        </div>

        <div className="formDivE">
          <label className="formLabel" htmlFor="phone">
            Phone *
          </label>
          <input
            className="formInput"
            type="tel"
            name="phone"
            id="phone"
            value={userInfo.phone}
            onChange={(e) => updateUserInfo("phone", e.target.value)}
            onBlur={() => saveInput("phone")}
            required
            pattern="(\+45|45)?[1-9]\d{7}"
          />
        </div>

        <div className="formDivE">
          <label className="formLabel" htmlFor="email">
            Email *
          </label>
          <input
            className="formInput"
            type="email"
            name="email"
            id="email"
            value={userInfo.email}
            onChange={(e) => updateUserInfo("email", e.target.value)}
            onBlur={() => saveInput("email")}
            required
          />
        </div>

        <div className="formDivE">
          <label className="formLabel" htmlFor="companyName">
            Company name
          </label>
          <input
            className="formInput"
            type="text"
            name="companyName"
            id="companyName"
            max="40"
            value={userInfo.companyName}
            onChange={(e) => updateUserInfo("companyName", e.target.value)}
            onBlur={() => saveInput("companyName")}
          />
        </div>

        <div className="formDivE">
          <label className="formLabel" htmlFor="companyVat">
            Company VAT
          </label>
          <input
            className="formInput"
            type="text"
            name="companyVat"
            id="companyVat"
            value={userInfo.companyVAT}
            onChange={(e) => updateUserInfo("companyVAT", e.target.value)}
            onBlur={() => saveInput("companyVAT")}
            pattern="\d{8}"
          />
        </div>

        <br />
        <div>
          <button className="backButton" type="button" onClick={() => handlePop()}>Back</button>
          <button className="formButton">To payment</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
