import React from "react";
import products from "./mocks/product-mock.json";
import { Product } from "../src/Types/Types";
import { CartProvider } from "../src/contexts/CartContext";
import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

const RouterWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

const getProductsFromLocal = (RenderWithoutProducts: boolean, Slice?: number) => {
   console.log("WHAT IS THIS BRHU : " + RenderWithoutProducts)
  if (RenderWithoutProducts) return [];
  const prodductList: Product[] = products
  prodductList.forEach((T) => console.log("PRODUCT: " + JSON.stringify(T)))
  
  if(Slice !== undefined)
    return prodductList.slice(0, Slice);
  else return prodductList
};


export function createFetchResponse(data) {
  return { ok: true, json: () => new Promise((resolve) => resolve(data)) };
}

export const customRender = (ui, RenderWithoutProducts: boolean) => {
//   return render(<CartProvider value={getProductsFromLocal(RenderWithoutProducts)}>{ui} </CartProvider>, { wrapper: RouterWrapper });
  return render(<CartProvider value={[]}>{ui} </CartProvider>, {wrapper: BrowserRouter});
};