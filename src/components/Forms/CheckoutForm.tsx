import { useState, useEffect, SyntheticEvent } from "react";
import "./CheckoutForm.css";
import { UserInfo } from "../../Types/Types";
import { handleNavigation, handlePop } from "../../Router";
import { useCheckoutContext } from "../../contexts/CheckoutContext";
import reload from "../../assets/reload.png"

const CheckoutForm = () => {
  const { userInfo, updateUserInfo, validZip, zipsAndCities } = useCheckoutContext();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (zipsAndCities.length > 0) setLoading(false)
  }, [zipsAndCities]);

  const saveInput = (key: keyof UserInfo) => {
    localStorage.setItem(key, userInfo[key])
  };
  
  // //TODO - update city immediately, and not on re-render
  // useEffect(() => {
  //   if (userInfo.zipCode.length === 4) {
  //     const existingZipCityIndex = zipsAndCities.findIndex(
  //       (item: { zip: string; city: string }) => item.zip === userInfo.zipCode
  //     );
  //     if (existingZipCityIndex !== -1) {
  //       setValidZip(true);
  //       updateUserInfo("city", zipsAndCities[existingZipCityIndex].city);
  //     } else {
  //       setValidZip(false);
  //     }
  //   }
  // }, [userInfo.zipCode]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (validZip) {
      handleNavigation("/payment")
    }
  };


  const renderInput = (
    label: string,
    type: string,
    name: string,
    onBlur: boolean,
    required?: boolean,
    pattern?: string,
    disabled?: boolean,
    maxLength?: number,
  ) => {

    const toKeyType = name as keyof UserInfo

    return (
      <div className="formDivE">
        <label className="formLabel" htmlFor={name}>
          {label}
        </label>

        {onBlur ?
          <input
            className="formInput"
            type={type}
            name={name}
            id={name}
            value={userInfo[toKeyType]}
            onChange={(e) => updateUserInfo(toKeyType, e.target.value)}
            onBlur={() => saveInput(toKeyType)}
            required={required}
            pattern={pattern}
            disabled={disabled}
            maxLength={maxLength}
          />
          :
          <input
            className="formInput"
            type={type}
            name={name}
            id={name}
            value={userInfo[toKeyType]}
            onChange={(e) => updateUserInfo(toKeyType, e.target.value)}
            required={required}
            pattern={pattern}
            disabled={disabled}
            maxLength={maxLength}
          />}

      </div>
    )
  }

  return (
    <div className="formContainer">
      {loading ? <img src={reload} className="loading-logo" /> :
        <form className="theForm" onSubmit={handleSubmit}>

          {renderInput("Country *", "text", "country", false, true, "Denmark", true)}

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

          {renderInput("City *", "text", "city", false, true, undefined, true)}
          {renderInput("Address line 1 *", "text", "address1", true, true)}
          {renderInput("Address line 2", "text", "address2", true)}
          {renderInput("Billing Address", "text", "billingAddress", true)}
          {renderInput("First name *", "text", "firstName", true, true, "^[A-Za-z]+$")}
          {renderInput("Last name *", "text", "lastName", true, true, "^[A-Za-z]+$")}
          {renderInput("Phone *", "tel", "phone", true, true, "(\\+45|45)?[1-9]\\d{7}")}
          {renderInput("Email *", "email", "email", true, true)}
          {renderInput("Company name", "text", "companyName", true)}
          {renderInput("Company VAT", "text", "companyVAT", true, undefined, "\\d{8}")}


          <br />
          <div>
            <button className="backButton" type="button" onClick={() => handlePop()}>Back</button>
            <button className="formButton">To payment</button>
          </div>
        </form>
      }
    </div>
  );
};

export default CheckoutForm;
