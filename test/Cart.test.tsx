import React from "react";
import App from "../src/App";
import products from "./mocks/product-mock.json";
import Cart from "../src/components/Cart/Cart";

import { cleanup, findByTestId, findByText, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, afterEach, Vitest, MockedFunction, Mock } from "vitest";
import { fetchProductList } from "../src/components/Utility/fetchProducts";
import { createFetchResponse, customRender } from "./HelperFunctions/commonTestFunctions";
import userEvent from "@testing-library/user-event";

// //mocking global fetch.. dont know how to mock locally.

global.fetch = vi.fn();

describe("Cart : Empty", () => {
  fetch.mockResolvedValueOnce(createFetchResponse([]));
  it("Should show empty basket if no basket items have rendered", async () => {
    await waitFor(() => customRender(<Cart wantInitialLoading={false} />));

    const text = await screen.findByText("Your basket is empty.");
    await waitFor(() => {
      expect(text).toBeInTheDocument();
    });
  });
});

describe("Cart : With Items", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    fetch.mockResolvedValue(createFetchResponse(products));
  });

  it("Should render the box containing price of products and checkout-button", async () => {
    customRender(<Cart wantInitialLoading={false} />);

    const text = await screen.findByText("Items in cart:");
    await waitFor(() => {
      expect(text).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(text).toBeVisible();
    });
    // await waitFor(() => { })

    const but = await screen.findByRole("button", { name: /checkout/i });
    await waitFor(() => {
      expect(but).toBeVisible();
    });
  });

  it("Should show price of 2 apples in checkout box when quantity of apples has been changed to 2", async () => {
    const user = userEvent.setup();
    await waitFor(() => customRender(<Cart wantInitialLoading={false} />));

    //getting correct input when finding by abel
    const quantity = screen.getAllByLabelText(/^Qty/i)[0] as HTMLInputElement;

    expect(quantity).toBeInTheDocument();
    user.type(quantity, "2{enter}");
    await waitFor(() => expect(quantity.value).toBe("2"));

    const price = screen.getByTestId("totalPrice");

    await waitFor(() => expect(price).toHaveTextContent("8,-"));
  });

  it("should remove APPLES from basket when clicking on the remove button", async () => {
    const user = userEvent.setup();
    customRender(<Cart wantInitialLoading={false} />);

    // const removeBut = await screen.findByRole('button', { name: /close/i });
    const removeBut = (await screen.findAllByTestId("remove-button"))[0];
    const itemToRemove = await screen.findByText("Apples");

    await waitFor(() => {
      expect(itemToRemove).toBeEnabled();
    });

    await waitFor(() => {
      expect(itemToRemove).toBeInTheDocument();
    });

    await user.click(removeBut);

    await waitFor(() => {
      expect(itemToRemove).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(removeBut).not.toBeInTheDocument();
    });
  });

  it("show correct number of total items in the basket", async () => {
    const user = userEvent.setup();
    await waitFor(() => customRender(<Cart wantInitialLoading={false} />));

    //getting correct input when finding by abel
    const quantity = screen.getAllByLabelText(/^Qty/i)[0] as HTMLInputElement;
    expect(quantity).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();

    user.type(quantity, "2{enter}");
    await waitFor(() => expect(quantity.value).toBe("2"));

    const totalItems = screen.getByTestId("totalItems");
    await waitFor(() => expect(totalItems).toHaveTextContent("2"));
  });
});
