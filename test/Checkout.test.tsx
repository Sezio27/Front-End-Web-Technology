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
  it("should correctly fill in city after zip input", async () => {
    fetch.mockResolvedValueOnce(createFetchResponse(zipMock));
    const user = userEvent.setup();
    customRenderZip(<CheckoutForm />);

    const kbh = "København S";
    const zipInput = "ZIP code *";
    const cityInput = "City *";

    const zipElement = await screen.findByLabelText(zipInput);
    const city = await screen.findByLabelText(cityInput);

    await user.type(zipElement, "2300");

    await waitFor(() => {
      expect(zipElement).toHaveValue("2300");
      screen.debug(undefined, Infinity);
    });
    await waitFor(() => expect(city).toHaveValue(kbh));
  });

  it("Testing required fields of form", () => {
    fetch.mockResolvedValueOnce(createFetchResponse(zipMock));
    const user = userEvent.setup();
    await waitFor(() => customRenderZip(<CheckoutForm />))
    
    const submitBut = screen.getBy
  });
});
