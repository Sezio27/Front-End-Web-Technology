import React, { FC, ReactElement, ReactNode } from "react";
import products from "../mocks/product-mock.json";
import { Product } from "../../src/Types/Types";
import { CartProvider, CartProviderProps } from "../../src/contexts/CartContext";
import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { CheckoutProvider, CheckoutProviderProps } from "../../src/contexts/CheckoutContext";
import Router, { IRouter } from "../../src/Router";

const RouterWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

const getProductsFromLocal = (RenderWithoutProducts: boolean, Slice?: number) => {
  if (RenderWithoutProducts) return [];
  const prodductList: Product[] = products;
  prodductList.forEach((T) => console.log("PRODUCT: " + JSON.stringify(T)));

  if (Slice !== undefined) return prodductList.slice(0, Slice);
  else return prodductList;
};

export function createFetchResponse(data) {
  return { ok: true, json: () => new Promise((resolve) => resolve(data)) };
}

export const customRenderCart = (ui) => {
  //   return render(<CartProvider value={getProductsFromLocal(RenderWithoutProducts)}>{ui} </CartProvider>, { wrapper: RouterWrapper });
  return render(<CartProvider value={[]}>{ui} </CartProvider>, { wrapper: BrowserRouter });
};

export const customRenderZip = (ui: ReactElement, router: boolean) => {
  if (router) return render(<CheckoutProvider> {routerWrapper({ path: "/checkout", content: ui })} </CheckoutProvider>);
  else return render(<CheckoutProvider> {ui} </CheckoutProvider>);
};

export const routerWrapper = ({ path, content }: IRouter) => {
  return <Router path={path} content={content} />;
};
