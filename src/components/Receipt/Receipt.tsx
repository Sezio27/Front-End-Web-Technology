import "./Receipt.css";

const Receipt = () => {

    const totalPrice = Number(localStorage.getItem("totalPrice"));
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

    const itemsInCart = JSON.parse(localStorage.getItem("itemsInCart") || "[]");

    const itemsPrice = itemsInCart
        .filter((item: any) => item.quantity > 0)
        .reduce((total: number, item: any) => {
            return total + item.price * item.quantity;
        }, 0);

    const rebate = totalPrice - itemsPrice;

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
                    {itemsInCart
                        .filter((item: any) => item.quantity > 0)
                        .map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price * item.quantity} DKK</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="rabat">Rebate: {rebate.toFixed(2)} DKK</p>
                <p className="total">Total price paid: {totalPrice.toFixed(2)} DKK</p>
                <p className="date">Date of receipt: {date}</p>
            </div>

        </div>
    );
};

export default Receipt;