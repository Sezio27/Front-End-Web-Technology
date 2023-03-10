import Basket from "./Basket/Basket";
import Checkout from "./Checkout/Checkout";
import products from "../../data/products.json";
import { Item, BasketTotals } from "../../Types/Types";
import { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [basketItems, setBasketItems] = useState<Item[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const tempBasketItems = products.map((product) => ({
      id: product.id,
      quantity: 0,
      name: product.name,
      price: product.price,
      currency: product.currency,
      rebateQuantity: product.rebateQuantity,
      rebatePercent: product.rebatePercent,
      upsellProductId: product.upsellProductId
    }));
    setBasketItems(tempBasketItems);
  }, []);
  
  useEffect(() => {
    calculateTotals()
  }, [basketItems]);

  const calculateTotals = () => {
    
    let totals: BasketTotals = {totalQuantity: 0, totalPrice: 0}
    basketItems.map(({price, quantity}: Item) => {
      totals.totalPrice += price*quantity
      totals.totalQuantity += quantity
    })
    setTotalPrice(totals.totalPrice)
    setTotalQuantity(totals.totalQuantity)
  }

  const addToCart = (newItem: Item, index: number) => {
    const updatedCart = basketItems.splice(index, 0, newItem)
    setBasketItems(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = basketItems.filter((item) => item.id !== productId);
    setBasketItems(updatedCart);
  };

  const changeToUpsell = (productId: string) => {

    const currentProduct = basketItems.find(item => item.id == productId);
    console.log(currentProduct)
    if (currentProduct && currentProduct.upsellProductId != null) {

      const currentProductIndex = basketItems.indexOf(currentProduct)
      const newProduct = products.find(item => item.id === currentProduct.upsellProductId);

      if (newProduct) {
        const item: Item = {
          id: newProduct.id,
          quantity: currentProduct.quantity,
          name: newProduct.name,
          price: newProduct.price,
          currency: newProduct.currency,
          rebateQuantity: newProduct.rebateQuantity,
          rebatePercent: newProduct.rebatePercent,
          upsellProductId: newProduct.upsellProductId,
        };
        
        addToCart(item, currentProductIndex);
        removeFromCart(productId);
      }
    }
  }

  const getProductName = (productId: string) => {
    return products.find(item => item.id == productId)?.name;
  }
    
  return (
    <div className="cartContainer">
      {basketItems.length > 0 ? (
        <div className="cartSection">
          <div className="basketContainer">
            <Basket basketItems={basketItems} setBasketItems={setBasketItems} removeFromCart={removeFromCart} changeToUpsell={changeToUpsell} getProductName={getProductName} />
          </div>
          <div className="checkoutContainer">
            <Checkout cartQuantity={totalQuantity} totalPrice={totalPrice} currency={""} />
          </div>
        </div>
      ) : (
        <span>Your basket is empty.</span>
      )}
    </div>
  );
};

export default Cart;
