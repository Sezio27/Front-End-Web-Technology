import { render, screen, act, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi, vitest } from "vitest";
import userEvent from "@testing-library/user-event";
import App from ".././src/App";
//import mockResponse from ".././src/data/mock-response.json"
//import { debug } from "vitest-preview"; 

describe(App.name, () => {
  it("should render headers", async () => {
    render(<App />);

    const cart = screen.getByText('Cart')
    const flow = screen.getByText('Checkout Flow')
    screen.debug(cart)
    expect(cart).toBeInTheDocument()
    expect(flow).toBeInTheDocument()
  });
});


