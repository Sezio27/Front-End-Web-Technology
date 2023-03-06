import Basket from "./components/Cart/Basket/Basket";
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";

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

      {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Blogs />} />
          <Route path="checkout" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter> */}
    </div>
  );
}

export default App;
