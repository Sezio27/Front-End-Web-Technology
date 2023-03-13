import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { debug } from "vitest-preview";
import App from ".././src/App";

describe(App.name, () => {
    it("should render", async () => {
      render(<App />);
    
      const test = await screen.findAllByText("Cart");

      expect(test).toHaveLength(1);
    });
  });

/**
describe(App.name, () => {
  it("should get the right price", async () => {
    const user = userEvent.setup();

    render(<App />);

    const apples = screen.getByRole("row", {name: "TEST Apples Buy 5 more to save 20%! 0 0 DKK"});

    const quantityPicker = apples.getElementsByClassName("quantityContainer")[1];

    await user.type(quantityPicker, "10");

    await user.type(quantityPicker, '{enter}');

    debug();

    await screen.findByText("20 DKK");
    
  });
});
*/