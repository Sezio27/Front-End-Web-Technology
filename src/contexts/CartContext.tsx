import { createContext, useContext, useState, useEffect, ReactNode, FC } from "react";
import { Item, BasketTotals, Product } from "../Types/Types";
import { calculateItemDiscount } from "../Utilities/SavingsUtility";
import { fetchProductList } from "../components/Utility/fetchProducts";


export interface CartProviderProps {
  children: ReactNode;
  value: any;
}

interface ICartContext {
  basketItems: Item[];
  setBasketItems: (basketItems: Item[]) => void;
  removeFromCart: (productId: string) => void;
  changeToUpsell: (productId: string) => void;
  calculateTotals: () => BasketTotals;
  getProductName: (productId: string) => string | undefined;
  onQuantityChange: (productId: string, quantity: number) => void;
  isProductInBasket: (productId: string) => boolean

}


// Custom wait method to showcase icon spinning
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//DEFINING CART CONTEXT AND CREATING IT
const CartContext = createContext<ICartContext>({
  basketItems: [],
  setBasketItems: () => { },
  removeFromCart: () => { },
  changeToUpsell: () => { },
  calculateTotals: () => ({
    totalQuantity: 0,
    totalPrice: 0,
    totalRebateSavings: 0,
    totalOrderSavings: 0,
    totalPriceAfterSavings: 0,
    totalDiscountActive: false,
  }),
  getProductName: () => undefined,
  onQuantityChange: () => {},
  isProductInBasket: () => false,

});


//RETURN CART CONTEXT FOR USE
export const useCartContext = () => {
  return useContext(CartContext);
};

//CART PROVIDER WHOM PROVIDES CONTEXT TO CHILDREN
export const CartProvider: FC<CartProviderProps> = ({ children, value }) => {
  

  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("products"); 
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [basketItems, setBasketItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem("basketItems"); 
    return savedItems ? JSON.parse(savedItems) : value;
  });

  //Save BasketItems in localStorage
  useEffect (() => {
    localStorage.setItem('basketItems', JSON.stringify(basketItems));
  }, [basketItems])

  useEffect(() => {
    // Fetching items from custom build method.
    const fetchItems = async () => {
      console.log("FETCHING PRODUCTS")
      const productList: Product[] = await fetchProductList();
      // await delay(1000)
      console.log("LENGTH OF PRODUCTS: " + productList.length)
      localStorage.setItem('products', JSON.stringify(productList));
      setProducts(productList);
    };
    if (products.length < 1) fetchItems(); 
    
  }, []);


   //Initializing basketItems
  useEffect(() => {

    if (products.length > 1 && JSON.stringify(basketItems) === JSON.stringify(value)) { //Will also be executed if user removes all items and refreshes page

        const tempBasketItems = products.map((product) => ({
          product: { ...product },
          quantity: 0,
        }));
        setBasketItems(tempBasketItems);
      }
    }, [products]);


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
      totalRebateSavings: 0,
      totalOrderSavings: 0,
      totalPriceAfterSavings: 0,
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
            
      totals.totalRebateSavings += basketItemDiscount;
      totals.totalPrice += subTotal;
      totals.totalQuantity += quantity;

    });

    if (totals.totalPrice >= 300) {
      totals.totalDiscountActive = true;
      totals.totalOrderSavings = (totals.totalPrice - totals.totalRebateSavings) * 0.1;
      totals.totalPriceAfterSavings = totals.totalPrice - totals.totalRebateSavings - totals.totalOrderSavings ;
    } else {
      totals.totalDiscountActive = false;
    }

    if (totals.totalPriceAfterSavings < 0) {
      console.log("PRICE AFTER DISCOUNT BELOW ZERO - ERROR");
      totals.totalPriceAfterSavings = 0;
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
        removeFromCart, 
        changeToUpsell, 
        calculateTotals, 
        getProductName, 
        onQuantityChange, 
        isProductInBasket, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
  

