import React from "react";
import App from "../src/App";
import products from "./mocks/product-mock.json";
import Cart from "../src/components/Cart/Cart";
import { Product } from "../src/Types/Types";
import { CartProvider } from "../src/contexts/CartContext";

import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { fetchProductList } from "../src/components/Utility/fetchProducts";
import { customRender } from "./commonTestFunctions";

const fn = vi.fn();

// const mockCheckout = vi.fn();

// vi.fn(fetchProductList).mockResolvedValue(products);


describe(App.name, () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  })
  it("Should render the box containing price of products and checkout-button", async () => {
    const dom = customRender(<Cart />, false);
    const container = dom.container;

    screen.debug(undefined, Infinity);

    await waitFor(() => {
      const text = screen.getByText("Items in cart:");
      const button = container.getElementsByClassName("checkoutButton");
      expect(text).toBeInTheDocument();
      expect(button.length).toBe(1);
    });
  });
  
  it("Should render the basket", async () => {
    const dom = customRender(<Cart />, false);
    const container = dom.container;

    // screen.debug(undefined, Infinity);

    await waitFor(() => {
      const basket = container.getElementsByClassName("basketTable");
      expect(basket.length).toBe(1);
    });
  });
  
  it("Should show empty basket if no basket items have rendered", async () => {
    customRender(<Cart />, true);
    screen.debug(undefined, Infinity);

    await waitFor(() => {
      const text = screen.getByText("Your basket is empty.");
      expect(text).toBeInTheDocument();
    });
  });
});
