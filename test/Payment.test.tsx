import React from "react";

import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CheckoutForm from "../src/components/Forms/CheckoutForm";
import { customRenderCart, createFetchResponse, customRenderZip } from "./HelperFunctions/commonTestFunctions";
import zipMock from "./mocks/zip-mock.json";
import products from "./mocks/product-mock.json";
import Payment from "../src/components/Payment/Payment";

global.fetch = vi.fn();

describe("Testing payment page", () => {
  it("should show payment", async () => {
    await waitFor(() => render(<Payment />));

    const header = screen.getByRole("heading", { name: /payment/i });

    expect(header).toBeInTheDocument();
  });

  it("TOS is required to be selected when trying to press the submit button  ", async () => {
    const user = userEvent.setup();
    await waitFor(() => render(<Payment />));

    const tosBut = screen.getByLabelText(/please accept our terms and conditions/i) as HTMLInputElement;
    const submitBut = screen.getByRole('button', {name: /Submit/i}) as HTMLInputElement;
    expect(submitBut).toBeInTheDocument();
    expect(tosBut).toBeInTheDocument();

    await user.click(submitBut);

    expect(tosBut).toBeInvalid();
    expect(tosBut.validationMessage).toEqual("Constraints not satisfied");

    await user.click(tosBut);

    await user.click(submitBut);
    expect(tosBut).toBeValid();
  });
});
