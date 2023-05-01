import Cart from "./components/Cart/Cart";
import CheckoutForm from "./components/Forms/CheckoutForm";
import { CartProvider } from "./contexts/CartContext";
import Payment from "./components/Payment/Payment";
import Receipt from "./components/Receipt/Receipt";
import CheckoutResponsive from "./components/Cart/Checkout/CheckoutResponsive";
import Router from "./Router"
import { CheckoutProvider } from "./contexts/CheckoutContext";

function App() {

  const startPage = 
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
          <Cart wantInitialLoading={true}/>
      </div>
    </div>
  </div>
 
  return (
    <>
    <CartProvider value={[]}>

            <Router path="/" content={startPage}/>
            <Router path="/payment" content={<Payment/>} />
            <Router path="/receipt" content={<Receipt/>} />
            
        
    </CartProvider>
    <CheckoutProvider>
      <Router path="/checkout" content={<CheckoutForm />} />
    </CheckoutProvider>
  </>
  );
}

export default App;

