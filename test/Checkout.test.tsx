import React from "react";

import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CheckoutForm from "../src/components/Forms/CheckoutForm";
import { customRenderCart, createFetchResponse, customRenderZip } from "./HelperFunctions/commonTestFunctions";
import zipMock from "./mocks/zip-mock.json";
import products from "./mocks/product-mock.json";

global.fetch = vi.fn();



describe("Testing the checkout form component", () => {
  it("should correctly fill in city after correct zip input", async () => {
    fetch.mockResolvedValueOnce(createFetchResponse(zipMock));
    const user = userEvent.setup();
    customRenderZip(<CheckoutForm />, false);

    const kbh = "København S";
    const zipInput = "ZIP code *";
    const cityInput = "City *";

    const zipElement = await screen.findByLabelText(zipInput);
    const city = await screen.findByLabelText(cityInput);

    await user.type(zipElement, "2300");

    await waitFor(() => {
      expect(zipElement).toHaveValue("2300");
    });
    await waitFor(() => expect(city).toHaveValue(kbh));
  });
  
  it("should show error message when wrong zip code is filled in", async () => {
    fetch.mockResolvedValueOnce(createFetchResponse(zipMock));
    const user = userEvent.setup();
    await waitFor(() => customRenderZip(<CheckoutForm />, false))
    
    const zipInput = "ZIP code *";

    const zipElement = screen.getByLabelText(zipInput);

    await user.type(zipElement, "99999");
    const errorMessage = await screen.findByText('Invalid Zip Code')
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument()
    });
  });

  it("Testing required fields (Zip field) of form when pressing button", async () => {
    fetch.mockResolvedValueOnce(createFetchResponse(zipMock));
    const user = userEvent.setup();
    await waitFor(() => customRenderZip(<CheckoutForm />, false))
    
    const zipInput = "ZIP code *";
    const zipField = screen.getByLabelText(zipInput) as HTMLInputElement
    expect(zipField).toBeInTheDocument();

    const submitBut = screen.getByText("To payment");
    expect(submitBut).toBeInTheDocument();
    
    await user.click(submitBut)
    expect(zipField).toBeInvalid()
    expect(zipField.validationMessage).toEqual('Constraints not satisfied')
  });
  
  // it("Can go to payment page after form fields have been correct input", async () => {
  //   fetch.mockResolvedValueOnce(createFetchResponse(zipMock));
  //   const user = userEvent.setup();
  //   await waitFor(() => customRenderZip(<CheckoutForm />, false))
    
    
    
  //   const zipInput = "ZIP code *";
  //   const address = "Address line 1 *"
  //   const firstname = "First name *"
  //   const lastname = "Last name *"
  //   const phone = "Phone *"
  //   const email = "Email *"
    
    
    
  //   const zipField = screen.getByLabelText(zipInput) as HTMLInputElement
  //   const addressField = screen.getByLabelText(address) as HTMLInputElement
  //   const firstnameField = screen.getByLabelText(firstname) as HTMLInputElement
  //   const lastnameField = screen.getByLabelText(lastname) as HTMLInputElement
  //   const phoneField = screen.getByLabelText(phone) as HTMLInputElement
  //   const emailField = screen.getByLabelText(email) as HTMLInputElement


  //   await user.type(zipField, '2300')
  //   await user.type(addressField, 'test vej')
  //   await user.type(firstnameField, 'gyrild')
  //   await user.type(lastnameField, 'Testensen')
  //   await user.type(phoneField, '11223344')
  //   await user.type(emailField, 'gyrildTest@hotmail.com')

  //   // const submitBut = screen.getByText("To payment");
  //   const submitBut = screen.getByRole('button', {name: /payment/i});
  //   expect(submitBut).toBeInTheDocument();
    
  //   await user.click(submitBut)
  //   await waitFor(() => expect(submitBut).toHaveBeenCalledTimes(1))
    
  //   // const paymentSite = screen.getByRole('heading', {name: 'Payment'})
  //   // await waitFor(() => expect(paymentSite).toBeInTheDocument())
  // });
});
