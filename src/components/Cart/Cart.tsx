import React from "react";
import Basket from "./Basket/Basket";
import Checkout from "./Checkout/Checkout";
import "./Cart.css";
import "../../css/LoadingLogo.css";
import reload from "../../assets/reload.png";
import { useCartContext } from "../../contexts/CartContext";
import { useEffect, useState } from "react";

// Definerer en prop type for Cart-komponenten
interface CartProps {
  navigate: (path: string, page: number) => void;
}

// Cart-komponenten modtager navigate-funktionen som en prop
const Cart: React.FC<CartProps> = ({ navigate }) => {
  const { basketItems } = useCartContext();

  // Tilstandsstyring for indlæsning
  const [loading, setLoading] = useState<boolean>(true);

  // Opdaterer loading-tilstanden, når indholdet i kurven ændres
  useEffect(() => {
    if (basketItems.length > 0) setLoading(false);
  }, [basketItems]);

  // Funktion til at håndtere klik på checkout-knappen
  const handleCheckoutClick = () => {
    navigate("/Checkout", 1);
  };

  // Returnerer komponentens indhold
  return (
    <div className="cartContainer">
      {loading ? (
        // Viser et indlæsningsbillede, når data indlæses
        <img src={reload} className="loading-logo" />
      ) : basketItems.length > 0 ? (
        // Viser indholdet af kurven og checkout, når der er varer i kurven
        <div className="cartSection">
          <div className="basketContainer">
            <Basket />
          </div>
          <div className="checkoutContainer">
            <Checkout currency={""} onCheckoutClick={handleCheckoutClick} />
          </div>
        </div>
      ) : (
        // Viser en besked, når kurven er tom
        <span>Din kurv er tom.</span>
      )}
    </div>
  );
};

export default Cart;
