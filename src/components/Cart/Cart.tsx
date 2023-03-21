import Basket from "./Basket/Basket";
import Checkout from "./Checkout/Checkout";
import products from "../../data/products.json";
import { Item, BasketTotals, SavingsAction, SavingsState, SavingsActionKind } from "../../Types/Types";
import { ReducerWithoutAction, useEffect, useMemo, useReducer, useState } from "react";
import "./Cart.css";
import { calculateItemDiscount } from "../../Utilities/SavingsUtility";
import { ICalculateSavings } from "../../Utilities/UtilityTypes";

const Cart = () => {
  const [basketItems, setBasketItems] = useState<Item[]>([]);

  useEffect(() => {
    const tempBasketItems = products.map((product) => ({
      product: {...product},
      quantity: 0
    }));
    setBasketItems(tempBasketItems);
  }, []);

  
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

 
    // Apply total discount
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

  const getProductName = (productId: string) => {
    return products.find((item) => item.id == productId)?.name;
  };


  return (
    <div className="cartContainer">
      {basketItems.length > 0 ? (
        <div className="cartSection">
          <div className="basketContainer">
            <Basket
              basketItems={basketItems}
              setBasketItems={setBasketItems}
              removeFromCart={removeFromCart}
              changeToUpsell={changeToUpsell}
              getProductName={getProductName}
            />
          </div>
          <div className="checkoutContainer">
            <Checkout
              totals={calculateTotals()}
              currency={""}
            />
          </div>
        </div>
      ) : (
        <span>Your basket is empty.</span>
      )}
    </div>
  );
};

export default Cart;
