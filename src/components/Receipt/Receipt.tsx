import "./Receipt.css";
import { useCartContext } from "../../contexts/CartContext";
import { Item } from "../../Types/Types";
const Receipt = () => {

    const { basketItems, calculateTotals } = useCartContext();

    const {totalOrderSavings, totalRebateSavings, totalPriceAfterSavings} = calculateTotals()
   
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const email = localStorage.getItem("email");
    const address1 = localStorage.getItem("address1");

    const date = new Date().toLocaleString("en", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    return (
        <div className="ReceiptContainer">

            <div className="ContentContainer">

                <h1>Receipt</h1>
                <p>Thank you for your purchase!</p>
                <p>{firstName} {lastName}</p>
                <p>Email: {email}</p>
                <p>Ship to: {address1}</p>

                <table className="ItemsTable">
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {basketItems
                        .filter((item: Item) => item.quantity > 0)
                        .map((item: Item) => (
                            <tr key={item.product.id}>
                                <td>{item.product.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.product.price * item.quantity} DKK</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="rabat">Total savings: {(totalOrderSavings + totalRebateSavings ).toFixed(2)} DKK</p>
                <p className="total">Total price paid: {totalPriceAfterSavings.toFixed(2)} DKK</p>
                <p className="date">Date of receipt: {date}</p>
            </div>

        </div>
    );
};

export default Receipt;