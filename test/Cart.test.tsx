import React from "react";
import App from "../src/App";
import products from "./mocks/product-mock.json";
import Cart from "../src/components/Cart/Cart";

import { cleanup, findByTestId, findByText, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, afterEach, Vitest, MockedFunction, Mock } from "vitest";
import { fetchProductList } from "../src/components/Utility/fetchProducts";
import { createFetchResponse, customRender } from "./commonTestFunctions";
import userEvent from "@testing-library/user-event";

// //mocking global fetch.. dont know how to mock locally.


global.fetch = vi.fn();

describe("Cart : Empty", () => {
  // global.fetch = vi.fn().mockResolvedValueOnce(createFetchResponse([]));
  fetch.mockResolvedValueOnce(createFetchResponse([]));
  it("Should show empty basket if no basket items have rendered", async () => {
    customRender(<Cart />, true);

    const text = await screen.findByText("Your basket is empty.");
    screen.debug(undefined, Infinity);
    await waitFor(() => {
      expect(text).toBeInTheDocument();
    });
  });
});

describe("Cart : With Items", () => {
  fetch.mockResolvedValue(createFetchResponse(products));
  it("Should render the box containing price of products and checkout-button", async () => {
    customRender(<Cart />, true);

    // screen.debug(undefined, Infinity);

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

  it("should remove APPLES from basket when clicking on the remove button", async () => {
    const user = userEvent.setup();
    customRender(<Cart />, true);

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

  it("Should show price of 2 apples in checkout box when quantity of apples has been changed to 2", async () => {
    const user = userEvent.setup();
    customRender(<Cart />, true);

    //getting correct input when finding by abel
    const quantity = (await screen.findAllByLabelText(/^quantityInput/i))[0] as HTMLInputElement;
    expect(quantity).toBeInTheDocument();

    await user.type(quantity, "2{enter}");
    await waitFor(() => {
      expect(quantity.value).toBe("2");
    });

    const price = await screen.findByTestId("totalPrice");
    await waitFor(() => {
      screen.debug(price);
      expect(price).toHaveTextContent("8,-");
    });
  });

  it("show correct number of total items in the basket", async () => {
    const user = userEvent.setup();
    customRender(<Cart />, true);

    //getting correct input when finding by abel
    const quantity = (await screen.findAllByLabelText(/^quantityInput/i))[0] as HTMLInputElement;
    expect(quantity).toBeInTheDocument();

    await user.type(quantity, "123{enter}");
    await waitFor(() => {
      expect(quantity.value).toBe("123");
    });

    const price = await screen.findByTestId("totalItems");
    await waitFor(() => {
      screen.debug(price);
      expect(price).toHaveTextContent("123");
    });
  });
});
