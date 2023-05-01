import { render, screen, act, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi, vitest } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import CheckoutForm from "../src/components/Forms/CheckoutForm";
import { useNavigate } from "react-router-dom";
import { createFetchResponse, customRender } from "./HelperFunctions/commonTestFunctions";
import Cart from "../src/components/Cart/Cart";
import products from "./mocks/product-mock.json";
//import mockResponse from ".././src/data/mock-response.json"
//import { debug } from "vitest-preview";

global.fetch = vi.fn();

describe("App.name", () => {
  it("should show upsell", async () => {
    fetch.mockResolvedValueOnce(createFetchResponse(products));
    const user = userEvent.setup();

    customRender(<Cart wantInitialLoading={false} />);

    const removeBut = (await screen.findAllByTestId("remove-button"))[2];
    const quantity = (await screen.findAllByLabelText(/^Qty/i))[0] as HTMLInputElement;

    await user.click(removeBut);
    await waitFor(() => expect(removeBut).not.toBeInTheDocument());

    await user.type(quantity, "1{enter}");
    await waitFor(() => expect(quantity.value).toBe("1"));

    const upsell = screen.getByTestId("upSellContainer");

    await waitFor(() => expect(upsell).toBeInTheDocument());
  });

  it("should change to upsell", async () => {
    fetch.mockResolvedValueOnce(createFetchResponse(products));
    const user = userEvent.setup();

    await waitFor(() => customRender(<Cart wantInitialLoading={false} />))
    
    // screen.debug(undefined,Infinity)
    
    const quantity = screen.getAllByLabelText(/^Qty/i)[0] as HTMLInputElement;
    const apples = screen.getByText('Apples')
    expect(apples).toBeInTheDocument()
    
    
    const removeBut = screen.getAllByTestId("remove-button")[2]
    await user.click(removeBut)
    

    await user.type(quantity, "1{enter}");
    expect(quantity.value).toBe("1")

    
    const upsell = screen.getByTestId("upSellContainer");
    expect(upsell).toBeInTheDocument()
    
    const upsellBut = screen.getByRole('button', {name: /Apples pro/i})
    expect(upsellBut).toBeInTheDocument()
    
    await user.click(upsellBut)
    const applesPro = screen.getByText('Apples pro')
    expect(applesPro).toBeInTheDocument()
    expect(apples).not.toBeInTheDocument()
  });

  // it("Test that if the quantity picker works, meaning the quantity is updated correctly if a user change it", async () => {

  // });

  // it("Test that an item is displayed on the correct general format: Image, name, price,  quantity and remove button", async () => {

  // });
});
