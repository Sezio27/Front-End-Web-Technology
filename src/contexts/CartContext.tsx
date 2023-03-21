import { createContext, useContext, useState, useEffect, ReactNode, FC} from "react";
import products from "../data/products.json";
import { Item,  BasketTotals } from "../Types/Types";
import { calculateItemDiscount } from "../Utilities/SavingsUtility";

interface CartProviderProps {
    children: ReactNode;
  }

interface ICartContext{
  basketItems: Item[];
  setBasketItems: (basketItems: Item[]) => void;
  removeFromCart: (productId: string) => void;
  changeToUpsell: (productId: string) => void;
  calculateTotals: () =>  BasketTotals; 
  getProductName: (productId: string) => string | undefined;
  onQuantityChange: (productId: string, quantity: number) => void;
  isProductInBasket: (productId: string) => boolean
}

const CartContext = createContext<ICartContext>({
    basketItems: [],
    setBasketItems: () => {},
    removeFromCart: () => {},
    changeToUpsell: () => {},
    calculateTotals: () => ({
      totalQuantity: 0,
      totalPrice: 0,
      totalSavings: 0,
      totalDiscountActive: false,
    }),
    getProductName: () => undefined,
    onQuantityChange: () => {},
    isProductInBasket: () => false
  });

  export const useCartContext = () => {
    return useContext(CartContext);
  };

  export const CartProvider: FC<CartProviderProps> = ({ children }) => {
    const [basketItems, setBasketItems] = useState<Item[]>([]);
  
    useEffect(() => {
      const tempBasketItems = products.map((product) => ({
        product: { ...product },
        quantity: 0,
      }));
      setBasketItems(tempBasketItems);
    }, []);

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
          rebatePercent !== null &&
          rebateQuantity !== null &&
          quantity >= rebateQuantity
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
        totals.totalPrice = (totals.totalPrice - totals.totalSavings) * 0.9
      } else {
        totals.totalDiscountActive = false;
      }
  
      if (totals.totalPrice < 0) {
        alert("Total price cannot be below zero after discounts are added. Something went wrong");
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
      <CartContext.Provider value={{ basketItems, setBasketItems, removeFromCart, changeToUpsell, calculateTotals, getProductName, onQuantityChange, isProductInBasket }}>
        {children}
      </CartContext.Provider>
    );
  };