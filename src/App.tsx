import Cart from "./components/Cart/Cart";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CheckoutForm from "./components/Forms/CheckoutForm";
import { CartProvider } from "./contexts/CartContext";
import Payment from "./components/Payment/Payment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route
            path="/"
            element={
              <div className="App">
                <div className="siteContainer">
                  <div className="siteSection">
                    <h1 className="Title"> Checkout Flow </h1>
                  </div>
                  <div className="siteSection">
                    <h1 className="Subtitle"> Cart </h1>
                  </div>
                  <div className="siteSectionComponent">
                    <CartProvider>
                      <Cart/>
                    </CartProvider>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/Checkout" element={<CheckoutForm/>} />
          <Route path="/Checkout/Payment" element={<Payment/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

