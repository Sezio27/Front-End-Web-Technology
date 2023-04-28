import Cart from "./components/Cart/Cart";
import CheckoutForm from "./components/Forms/CheckoutForm";
import { CartProvider } from "./contexts/CartContext";
import Payment from "./components/Payment/Payment";
import { useState, useEffect } from "react";

enum Page {
  Home,
  Checkout,
  Payment,
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handlePopState = (event: PopStateEvent) => {
    setCurrentPage(event.state);
  };

  const navigate = (path: string, page: Page) => {
    window.history.pushState(page, "", path);
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case Page.Home:
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
                <Cart navigate={navigate} />
              </div>
            </div>
          </div>
        );
      case Page.Checkout:
        return <CheckoutForm navigate={navigate} />;
      case Page.Payment:
        return <Payment navigate={navigate} />;
      default:
        return null;
    }
  };

  return <CartProvider>{renderCurrentPage()}</CartProvider>;
}

export default App;
