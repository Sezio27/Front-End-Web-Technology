import "./Receipt.css";

const Receipt = () => {

    const totalPrice = Number(localStorage.getItem("totalPrice"));
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const address1 = localStorage.getItem("address1");

    return (
        <div className="ReceiptContainer">
            <div className="ContentContainer">
                <h1>Receipt</h1>
                <p>Thank you for your purchase!</p>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Address: {address1}</p>
                <p>Total price paid: {totalPrice} DKK</p>
            </div>
        </div>
    );
};

export default Receipt;
