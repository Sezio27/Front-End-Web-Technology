import { useState, useEffect} from "react";
import products from '../../data/products.json';
import BasketItem from "../BasketItem/BasketItem";

type Product = {
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number | null;
    rebatePercent: number | null;
    upsellProductId: string | null;
    
}
export type CartItem = {
    id: string;
    quantity: number;
    name: string;
    price: number;
    currency: string;
  }

const Basket = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
      const cartItems = products.map((product) => ({ id: product.id, quantity: 0, name: product.name, price: product.price, currency: product.currency}));
      setCart(cartItems);
      }, []);

    const onQuantityChange = (productId: string, quantity: number) => {

        const existingItemIndex = cart.findIndex(item => item.id === productId);
    
        if (existingItemIndex !== -1) {
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity = quantity;
          setCart(updatedCart);
        } 
      };
      
      const getTotalAmount = () => {

        return cart.reduce(
          (total: number, item: CartItem) => {
            const product = products.find((p: Product) => p.id === item.id);
            if (product) {
              return total + product.price * item.quantity;
            }
            return total;
          },
          0
        );
      };

      const removeFromCart = (productId: string) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
      }



    return (
      <div id ="cart">
        <table>
        <thead>
            <tr>
              <th style={{width: "10%"}}></th>
              <th style={{width: "15%"}}>Pris</th>
              <th style={{width: "20%", paddingRight: "15px"}}>Stk</th>
              <th style={{width: "20%"}}>Beløb</th>
              <th style={{width: "4%"}}></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <BasketItem
                  key={item.id}
                  product = {item}
                  onQuantityChange={onQuantityChange}
                  removeFromCart={removeFromCart}
            />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total</td>
              <td style={{borderTop: "2px solid black", borderTopLeftRadius: "5px", borderTopRightRadius: "5px"}}>{getTotalAmount()} DKK</td>
            </tr>
          </tfoot>
        </table>
      </div>
      );

}

export default Basket;