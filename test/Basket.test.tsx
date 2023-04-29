import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import products from "./mocks/product-mock.json";

import Basket from "../src/components/Cart/Basket/Basket";
import { customRender } from "./commonTestFunctions";
import { CartProvider } from "../src/contexts/CartContext";
import { Product } from "../src/Types/Types";
import { MemoryRouter } from "react-router-dom";
import Cart from "../src/components/Cart/Cart";

describe(Basket.name, () => {
  it("should render Basket", async () => {
    const dom = customRender(<Basket />, false);

    await waitFor(() => {
      expect(dom).toBeDefined();
    });
  });
});

describe(App.name, () => {
  
});
