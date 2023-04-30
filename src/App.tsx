import Cart from "./components/Cart/Cart";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CheckoutForm from "./components/Forms/CheckoutForm";
import { CartProvider } from "./contexts/CartContext";
import Payment from "./components/Payment/Payment";
import Receipt from "./components/Receipt/Receipt";
import products from "./data/products.json";
import { Item } from "./Types/Types";
import {useState, useEffect} from "react"
import CheckoutResponsive from "./components/Cart/Checkout/CheckoutResponsive";


function App() {

 
  return (
    <CartProvider value={[]}>
      <BrowserRouter>
        <Routes>
            <Route
              path="/"
              element={
                <div className="App">
                  <div className="siteContainer">
                      <CheckoutResponsive currency={""}></CheckoutResponsive>
                    <div className="siteSection">
                      <h1 className="Title"> Checkout Flow </h1>
                    </div>
                    <div className="siteSection">
                      <h1 className="Subtitle"> Cart </h1>
                    </div>
                    <div className="siteSectionComponent">
                        <Cart/>
                    </div>
                  </div>
                </div>
              }
            />
            
            <Route path="/Checkout" element={<CheckoutForm />} />
            <Route path="/Checkout/Payment" element={<Payment/>} />
            <Route path="/Checkout/Receipt" element={<Receipt/>} />
            
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

