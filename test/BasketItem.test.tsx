import { render, screen, act } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi, vitest } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import CheckoutForm from "../src/components/Forms/CheckoutForm";
import { useNavigate } from "react-router-dom";
//import mockResponse from ".././src/data/mock-response.json"
//import { debug } from "vitest-preview"; 

describe(App.name, () => {
  it("should render", async () => {
    render(<App />);
    
    const test = await screen.findAllByText("Cart");

    expect(test).toHaveLength(1);
  });
});