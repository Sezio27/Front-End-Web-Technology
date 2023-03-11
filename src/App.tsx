import Cart from "./components/Cart/Cart";
import CheckoutForm from "./components/Forms/CheckoutForm";

function App() {
  return (
    <div className="App">
      <div className="siteContainer">
        <div className="siteSection">
          <h1 className="Title"> Checkout Flow </h1>
        </div>
        <div className="siteSection">
          <h1 className="Subtitle"> Cart </h1>
        </div>
        <div className="siteSectionComponent">
          <Cart />
        </div>
      </div>
    </div>
  );
}
export default App;
