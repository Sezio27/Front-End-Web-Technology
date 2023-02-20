import { useState} from "react";
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
type CartItem = {
    productId: string;
    quantity: number;
  }

const Basket = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const onQuantityChange = (productId: string, quantity: number) => {
        // Find the index of an item in the cart array that matches the given product ID
        const existingItemIndex = cart.findIndex(item => item.productId === productId);
     
        // If an item with the given product ID already exists in the cart,
        // create a new array that is a copy of the existing cart
        if (existingItemIndex !== -1) {
          const updatedCart = [...cart];
      
          // Update the quantity of the existing item in the copied cart
          updatedCart[existingItemIndex].quantity = quantity;
      
          // Update the state of the cart with the new copied array that has the updated quantity
          setCart(updatedCart);
        } else {
          // If there is no item with the given product ID in the cart,
          // add a new item with the given product ID and quantity to the cart
          setCart([...cart, { productId, quantity }]);
        }
      };
      
      const getTotalAmount = () => {
        // Use the reduce function to loop through all items in the cart array and return a total amount.
        return cart.reduce(
          (total: number, item: CartItem) => {
            // For each item in the cart, find the corresponding product using its ID.
            const product = products.find((p: Product) => p.id === item.productId);
            // If the product is found, add its price multiplied by the quantity of the item to the total.
            if (product) {
              return total + product.price * item.quantity;
            }
            // If the product is not found (i.e. invalid productId), return the total without adding anything.
            return total;
          },
          // The initial value for the total is 0.
          0
        );
      };



    //TODO make addToCart and removeFromCart functions


    return (
      <div id ="cart">
        <table>
        <thead>
            <tr>
              <th style={{width: "10%"}}></th>
              <th style={{width: "15%"}}>Pris</th>
              <th style={{width: "20%", paddingRight: "15px"}}>Stk</th>
              <th style={{width: "20%"}}>Beløb</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <BasketItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  currency={product.currency}
                  quantity={0}
                  onQuantityChange={onQuantityChange}
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