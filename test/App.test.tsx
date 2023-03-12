import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import App from ".././src/App";

describe(App.name, () => {
    it("should render", async () => {
      render(<App />);

    
      const test = await screen.findAllByText("Cart");

      expect(test).toHaveLength(1);
    });
  });