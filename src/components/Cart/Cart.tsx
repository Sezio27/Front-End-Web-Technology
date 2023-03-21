import Basket from "./Basket/Basket";
import Checkout from "./Checkout/Checkout";
import products from "../../data/products.json";
import { Item, BasketTotals, SavingsAction, SavingsState, SavingsActionKind } from "../../Types/Types";
import { ReducerWithoutAction, useEffect, useMemo, useReducer, useState } from "react";
import "./Cart.css";
import { calculateItemDiscount } from "../Utilities/SavingsUtility";
import { ICalculateSavings } from "../Utilities/UtilityTypes";

const Cart = () => {
  const [basketItems, setBasketItems] = useState<Item[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalSavings, setTotalSavings] = useState<number>(0);
  const [totalDiscountActive, setTotalDiscountActive] = useState<boolean>(false);

  useEffect(() => {
    const tempBasketItems = products.map((product) => ({
      product: {...product},
      quantity: 0
    }));
    setBasketItems(tempBasketItems);
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [basketItems]);

  const calculateTotals = () => {
    let totals: BasketTotals = { totalQuantity: 0, totalPrice: 0, totalSavings: 0 };
    basketItems.map(({ product, quantity }) => {
      const {price, rebatePercent, rebateQuantity} = product
      let subTotal: number = price * quantity;

      let basketItemDiscount: number = 0;

      if (!(rebatePercent === null || rebateQuantity === null)) {
        if (quantity >= rebateQuantity)
          basketItemDiscount = calculateItemDiscount({
            subTotal: subTotal,
            itemQuantity: quantity,
            rebatePercentage: rebatePercent,
          });
      }
      totals.totalSavings += basketItemDiscount;
      totals.totalPrice += subTotal;
      totals.totalQuantity += quantity;
    });

    let tempTotalPrice: number = totals.totalPrice;

    // removing item discount before total discount ;-)  
    tempTotalPrice -= totals.totalSavings;
    if (totals.totalPrice >= 300) {
      setTotalDiscountActive(true);
      tempTotalPrice *= 0.9;
    } else setTotalDiscountActive(false);

    if (tempTotalPrice < 0) return alert("Total price cannot be below zero after discounts are added. Something went wrong");

    setTotalPrice(tempTotalPrice);
    setTotalSavings(totals.totalSavings);
    setTotalQuantity(totals.totalQuantity);
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
              cartQuantity={totalQuantity}
              totalPrice={totalPrice}
              currency={""}
              totalSavings={totalSavings}
              totalDiscountActive={totalDiscountActive}
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
