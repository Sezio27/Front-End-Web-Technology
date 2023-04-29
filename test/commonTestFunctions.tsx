import React from "react";
import products from "./mocks/product-mock.json";
import { Product } from "../src/Types/Types";
import { CartProvider } from "../src/contexts/CartContext";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const RouterWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

const getProductsFromLocal = (RenderWithoutProducts: boolean, Slice?: number) => {
  if (RenderWithoutProducts) return [];
  const prodductList: Product[] = products;
  if(Slice !== undefined)
    return prodductList.slice(0, Slice);
  else return prodductList
};

export const customRender = (ui, containProducts: boolean) => {
  return render(<CartProvider value={getProductsFromLocal(containProducts)}>{ui} </CartProvider>, { wrapper: RouterWrapper });
};