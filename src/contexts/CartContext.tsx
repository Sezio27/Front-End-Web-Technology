import { createContext, useContext, useState, useEffect, ReactNode, FC } from "react";
import { Item, BasketTotals, UserInfo, Product } from "../Types/Types";
import { calculateItemDiscount } from "../Utilities/SavingsUtility";
import { fetchProductList} from "../components/Utility/fetchProducts";


import { fetchData } from "../components/Utility/fetchData";

import oldProductList from "../data/products.json"


interface CartProviderProps {
  children: ReactNode;
  value: any;
}

interface ICartContext {
  basketItems: Item[];
  setBasketItems: (basketItems: Item[]) => void;
  zipsAndCities: { zip: string, city: string }[];
  setZipsAndCities: (zipsAndCities: { zip: string, city: string }[]) => void
  fetchZips: () => void
  removeFromCart: (productId: string) => void;
  changeToUpsell: (productId: string) => void;
  calculateTotals: () => BasketTotals;
  getProductName: (productId: string) => string | undefined;
  onQuantityChange: (productId: string, quantity: number) => void;
  isProductInBasket: (productId: string) => boolean
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

}
const initialUserInfo: UserInfo = {
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


// Custom wait method to showcase icon spinning
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//DEFINING CART CONTEXT AND CREATING IT
const CartContext = createContext<ICartContext>({
  basketItems: [],
  setBasketItems: () => { },
  zipsAndCities: [],
  setZipsAndCities: () => { },
  fetchZips: () => { },
  removeFromCart: () => { },
  changeToUpsell: () => { },
  calculateTotals: () => ({
    totalQuantity: 0,
    totalPrice: 0,
    totalSavings: 0,
    totalDiscountActive: false,
  }),
  getProductName: () => undefined,
  onQuantityChange: () => {},
  isProductInBasket: () => false,
  userInfo: initialUserInfo,
  setUserInfo: () => { }
});


//RETURN CART CONTEXT FOR USE
export const useCartContext = () => {
  return useContext(CartContext);
};

//CART PROVIDER WHOM PROVIDES CONTEXT TO CHILDREN
export const CartProvider: FC<CartProviderProps> = ({ children, value }) => {
  const [products, setProducts] = useState<Product[]>([])

  const [basketItems, setBasketItems] = useState<Item[]>(() => {
    const items = localStorage.getItem("basketItems"); 
    return items ? JSON.parse(items) : value;
  });

  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const info = localStorage.getItem("userInfo");
    return info ? JSON.parse(info) : initialUserInfo;
  });

  const [zipsAndCities, setZipsAndCities] = useState<{ zip: string, city: string }[]>(() => {
    const zipCities = localStorage.getItem("ZipCities"); 
    return zipCities ? JSON.parse(zipCities) : [];
  });;


  //Save userInfo in localStorage
  useEffect (() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo])

  //Save BasketItems in localStorage
  useEffect (() => {
    localStorage.setItem('basketItems', JSON.stringify(basketItems));
  }, [basketItems])

  const [zipCodesFetched, setZipCodesFetched] = useState(false);


  useEffect (() => {
    setZipsAndCities(zipsAndCities)
  }, [zipsAndCities])

  useEffect(() => {
    // Fetching items from custom build method.
    const fetchProducts = async () => {
      console.log("FETCHING PRODUCTS")
      const productList = await fetchData("https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json");
      setProducts(productList);
    
    };
    fetchProducts();
  }, []);


  //Initializing basketItems - to default if not saved in localStorage
  useEffect(() => {
      if (JSON.stringify(basketItems) === JSON.stringify(value)) {
        const tempBasketItems = products.map((product) => ({
          product: { ...product },
          quantity: 0,
        }));
        setBasketItems(tempBasketItems);
      } 
    }, [products]);


    useEffect(() => {

        const fetchZips = async () => {
          try {
            console.log("FETCHING ZIP")
            const data = await fetchData("https://api.dataforsyningen.dk/postnumre");
            const zipcity = data.map((item: { nr: string, navn: string }) => ({ zip: item.nr, city: item.navn }))
            localStorage.setItem("ZipCities", JSON.stringify(zipcity))

            setZipsAndCities(zipcity)
            setZipCodesFetched(true);
          } catch (error) {
            console.log(error)
          }
        }

        if (!zipCodesFetched) {
          fetchZips();
        }

    }, [zipCodesFetched]);


  const fetchZips = () => {
    setZipCodesFetched(false);
  }

  const removeFromCart = (productId: string) => {
    const updatedCart = basketItems.filter((item) => item.product.id !== productId);
    setBasketItems(updatedCart);
  };

  const changeToUpsell = (productId: string) => {
    const currentProductIndex = basketItems.findIndex((item) => item.product.id === productId);

    if (currentProductIndex !== -1) {
      const currentProduct = basketItems[currentProductIndex].product;

      if (currentProduct.upsellProductId) {
        const newProduct = products.find((product) => product.id === currentProduct.upsellProductId);

        if (newProduct) {
          const item: Item = {
            product: newProduct,
            quantity: basketItems[currentProductIndex].quantity,
          };

          const updatedBasketItems = [...basketItems];
          updatedBasketItems[currentProductIndex] = item;
          setBasketItems(updatedBasketItems);
        }
      }
    }
  };

  const calculateTotals = () => {
    const totals: BasketTotals = {
      totalQuantity: 0,
      totalPrice: 0,
      totalSavings: 0,
      totalDiscountActive: false,
    };

    basketItems.forEach(({ product, quantity }) => {
      const { price, rebatePercent, rebateQuantity } = product;
      const subTotal = price * quantity;

      const basketItemDiscount =
        rebatePercent !== null && rebateQuantity !== null && quantity >= rebateQuantity
          ? calculateItemDiscount({
              subTotal,
              itemQuantity: quantity,
              rebatePercentage: rebatePercent,
            })
          : 0;

      totals.totalSavings += basketItemDiscount;
      totals.totalPrice += subTotal;
      totals.totalQuantity += quantity;
    });

    if (totals.totalPrice >= 300) {
      totals.totalDiscountActive = true;
      totals.totalPrice = (totals.totalPrice - totals.totalSavings) * 0.9;
    } else {
      totals.totalDiscountActive = false;
    }

    if (totals.totalPrice < 0) {
      console.log("PRICE AFTER DISCOUNT BELOW ZERO - ERROR");
      totals.totalPrice = 0;
    }

    return totals;
  };

  const getProductName = (productId: string) => {
    console.log(products)
      return products.find((item) => item.id == productId)?.name;
  };

  const onQuantityChange = (productId: string, quantity: number) => {
    const existingItemIndex = basketItems.findIndex((item) => item.product.id === productId);

    if (existingItemIndex !== -1) {
      const updatedCart = [...basketItems];
      updatedCart[existingItemIndex].quantity = quantity;
      setBasketItems(updatedCart);
    }
  };

  const isProductInBasket = (productId: string) => {
    return basketItems.some((item) => item.product.id == productId);
  };

  return (
    <CartContext.Provider
      value={{
        basketItems, 
        setBasketItems, 
        zipsAndCities, 
        setZipsAndCities, 
        fetchZips,
        removeFromCart, 
        changeToUpsell, 
        calculateTotals, 
        getProductName, 
        onQuantityChange, 
        isProductInBasket, 
        userInfo, 
        setUserInfo
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
  

