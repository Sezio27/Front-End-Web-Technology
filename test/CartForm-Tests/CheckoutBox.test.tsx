import React from "react";
import { act, prettyDOM, queryByAttribute, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi, vitest } from "vitest";

import App from "../../src/App";
import products from "../mocks/product-mock.json";
import { MemoryRouter, json } from "react-router-dom";
import Cart from "../../src/components/Cart/Cart";
import { CartProvider, useCartContext } from "../../src/contexts/CartContext";
import Checkout from "../../src/components/Cart/Checkout/Checkout";
import { Item, Product } from "../../src/Types/Types";
import { p } from "vitest/dist/types-fafda418";
import { fetchProductList } from "../../src/components/Utility/fetchProducts";

const RouterWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

const getProductsFromLocal = () => {
  const prodductList: Product[] = products;

  //   const items: Item[] = prodductList.map((t) => {
  //     return {
  //       product: t,
  //       quantity: 1,
  //     };
  //   });
  //  console.log(items)
  return prodductList.slice(0, 5);
};

const customRender = (ui) => {
  return render(<CartProvider value={getProductsFromLocal()}>{ui} </CartProvider>, { wrapper: RouterWrapper });
};

const fn = vi.fn();

const mockCheckout = vi.fn();

describe(App.name, () => {
  it("Should render cart component", async () => {
    vi.fn(fetchProductList).mockResolvedValue(products);
   //  vi.mock("../../src/components/Cart/Checkout/Checkout");

    customRender(<Cart />);

    screen.debug(undefined, Infinity);
    
    await waitFor(() => {
       const text = screen.getByText("Items in cart:");

      screen.debug(text);
      expect(text).toBeInTheDocument();
    });
  });
});

// describe(App.name, () => {
//   it("Should render checkout box", async () => {
//     const dom = customRender(<Checkout currency={""} />);

//     const spanTest = screen.getByText("Items in cart:");
//     // screen.debug()
//     expect(spanTest).toBeInTheDocument();
//   });
// });

// describe(App.name, () => {
//   it("To be on cart page", async () => {
//     const DOM = render(<App />);

//     expect(screen.getByText("Checkout Flow")).toBeInTheDocument();
//   });
// });
