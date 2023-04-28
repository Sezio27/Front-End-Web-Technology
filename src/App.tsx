import Cart from "./components/Cart/Cart";
import CheckoutForm from "./components/Forms/CheckoutForm";
import { CartProvider } from "./contexts/CartContext";
import Payment from "./components/Payment/Payment";
import Router from "./Router"

function App() {


const startPage  = 
  <div className="App">
    <div className="siteContainer">
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
  </div>;


  return (
    <CartProvider value={[]}>
  
    <Router path="/" content = {startPage}/>
    <Router path="/Checkout" content = {<CheckoutForm />}/>
    <Router path="/Payment" content = {<Payment />}/>
   
    </CartProvider>
  );
}

export default App;

