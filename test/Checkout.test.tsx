import React from "react";
import App from "../src/App";

import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CheckoutForm from "../src/components/Forms/CheckoutForm";
import { customRender, createFetchResponse } from "./commonTestFunctions";
import zipMock from "./mocks/zip-mock.json";
import products from "./mocks/product-mock.json";

global.fetch = vi.fn();

// beforeAll(() => vi.resetAllMocks())

describe("Checkout form testing", () => {
  fetch.mockResolvedValueOnce(createFetchResponse(zipMock));
  fetch.mockResolvedValueOnce(createFetchResponse(products));
  it("should correctly fill in city after zip input", async () => {
    customRender(<CheckoutForm />, true);

    const user = userEvent.setup();

    const kbh = "København S";
    const zipInput = "ZIP code *";
    const cityInput = "City *";

    const zipElement = await screen.findByLabelText(zipInput);
    const city = await screen.findByLabelText(cityInput);

    await user.type(zipElement, "2300");
    await waitFor(() => expect(zipElement).toHaveValue("2300"));
    await waitFor(() => expect(city).toHaveValue(kbh));
    screen.debug(city);
  });

  it("Can go to payment after filling out all required form inputs.", async () => {
    fetch.mockResolvedValueOnce(createFetchResponse(zipMock));
    fetch.mockResolvedValueOnce(createFetchResponse(products));
    customRender(<CheckoutForm />, true);

    const user = userEvent.setup();

    const zipInput = "ZIP code *";
    const adressInput = "Address line 1 *";
    const firstNameInput = "First name *";
    const lastNameInput = "Last name *";
    const phoneInput = "Phone *";
    const emailInput = "Email *";

    const zipElement = await screen.findByLabelText(zipInput);
    const adress = await screen.findByLabelText(adressInput);
    const firstname = await screen.findByLabelText(firstNameInput);
    const lastname = await screen.findByLabelText(lastNameInput);
    const phone = await screen.findByLabelText(phoneInput);
    const email = await screen.findByLabelText(emailInput);

    const but = await screen.findByRole("button", { name: /to payment/i });

    await waitFor(() => expect(but).toBeInTheDocument());

    await user.type(zipElement, "2300");
    await user.type(adress, "stræden");
    await user.type(firstname, "brian");
    await user.type(lastname, "olsen");
    await user.type(phone, "40404040");
    await user.type(email, "test@hotmail.com");

    await waitFor(() => expect(zipElement).toHaveValue("2300"));
    await waitFor(() => expect(adress).toHaveValue("stræden"));
    await waitFor(() => expect(firstname).toHaveValue("brian"));
    await waitFor(() => expect(lastname).toHaveValue("olsen"));
    await waitFor(() => expect(phone).toHaveValue("40404040"));
    await waitFor(() => expect(email).toHaveValue("test@hotmail.com"));
    
    await user.click(but);
  });
});
