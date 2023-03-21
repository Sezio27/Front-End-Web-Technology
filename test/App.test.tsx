import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import App from ".././src/App";
/**import { debug } from "vitest-preview"; */

describe(App.name, () => {
    it("should render", async () => {
      render(<App />);
    
      const test = await screen.findAllByText("Cart");

      expect(test).toHaveLength(1);
    });
  });


describe(App.name, () => {
  it("should calculate the right price", async () => {
    const user = userEvent.setup();

    render(<App />);

    const apples = screen.getByRole("row", {name: "Img Apples Buy 5 more to save 20%! 0 0 DKK"});

    const quantityPicker = apples.getElementsByClassName("MuiInputBase-input MuiOutlinedInput-input")[0];

    await user.type(quantityPicker, "10");

    await user.type(quantityPicker, '{enter}');

    /**debug(); */

    await screen.findByText("16 DKK");
    
  });
});