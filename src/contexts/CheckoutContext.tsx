import { createContext, useContext, useState, useEffect, ReactNode, FC } from "react";
import { UserInfo } from "../Types/Types";

interface CheckoutProviderProps {
    children: ReactNode;
  }
interface CheckoutContextData {
  userInfo: UserInfo;
  updateUserInfo: (key: keyof UserInfo, value: string) => void;
  validZip: boolean;
  setValidZip: (valid: boolean) => void;
  zipsAndCities: { zip: string, city: string }[]
}


const CheckoutContext = createContext<CheckoutContextData>({} as CheckoutContextData);

export const useCheckoutContext = () => useContext(CheckoutContext);

export const CheckoutProvider: FC<CheckoutProviderProps> = ({ children }) => {

  const [validZip, setValidZip] = useState(true);

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

  const [zipsAndCities, setZipsAndCities] = useState<{ zip: string, city: string }[]>(() => {
    const savedZipCities = localStorage.getItem("ZipCities");
    return savedZipCities ? JSON.parse(savedZipCities) : [];
  });;


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

  return (
    <CheckoutContext.Provider
      value={{
        userInfo,
        updateUserInfo,
        validZip,
        setValidZip,
        zipsAndCities,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};