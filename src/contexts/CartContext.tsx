import { createContext, useContext, useState, useEffect, ReactNode, FC } from "react";
import { Item, BasketTotals, UserInfo, Product } from "../Types/Types";
import { calculateItemDiscount } from "../Utilities/SavingsUtility";
import { fetchProductList } from "../components/Utility/fetchProducts";

interface CartProviderProps {
  children: ReactNode;
}

interface ICartContext {
  basketItems: Item[];
  setBasketItems: (basketItems: Item[]) => void;
  zipsAndCities: { zip: string, city: string }[];
  setZipsAndCities: (zipsAndCities: { zip: string, city: string }[]) => void
  fetchZips: () => void;
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
export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  let products: Product[];
  const [basketItems, setBasketItems] = useState<Item[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo)
  const [zipsAndCities, setZipsAndCities] = useState<{ zip: string, city: string }[]>([]);


  useEffect(() => {
    // Fetching items from custom build method.
    const fetchItems = async () => {
      console.log("FETCHING")
      const productList = await fetchProductList();
      products = productList;
      const items: Item[] = products.map((e) => {
        return { product: e, quantity: 0 };
      });
      console.log(items)
      console.log("SETTING ITEMS")
      await delay(2000);
      setBasketItems(items);
    };
    fetchItems();
  }, []);

  const fetchZips = async () => {
    try {
      const DK_ZIP_URL = 'https://api.dataforsyningen.dk/postnumre';
      const response = await fetch(DK_ZIP_URL);
      const data = await response.json();
      console.log(data)
      setZipsAndCities(data.map((item: { nr: string, navn: string }) => ({ zip: item.nr, city: item.navn })))
      console.log("done", zipsAndCities)
    } catch (error) {
      console.log(error)
    }

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
  

