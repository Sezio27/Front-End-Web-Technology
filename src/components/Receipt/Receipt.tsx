import "./Receipt.css";

const Receipt = () => {

    const totalPrice = Number(localStorage.getItem("totalPrice"));
    const name1 = localStorage.getItem("name");
    const name2 = localStorage.getItem("name2");
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

    return (
        <div className="ReceiptContainer">

            <div className="ContentContainer">

                <h1>Receipt</h1>
                <p>Thank you for your purchase!</p>
                <p>{name1} {name2}</p>
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

                <p className="total">Total price paid: {totalPrice} DKK</p>
                <p className="date">Date of receipt: {date}</p>
            </div>

        </div>
    );
};

export default Receipt;