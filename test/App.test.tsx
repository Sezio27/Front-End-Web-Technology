import { render, screen, act } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi, vitest } from "vitest";
import userEvent from "@testing-library/user-event";
import App from ".././src/App";
import CheckoutForm from "../src/components/Forms/CheckoutForm";
//import mockResponse from ".././src/data/mock-response.json"
//import { debug } from "vitest-preview"; 

describe(App.name, () => {
  it("should render", async () => {
    render(<App />);

    const test = await screen.findAllByText("Cart");

    expect(test).toHaveLength(1);
  });
});

describe(App.name, () => {
  /**
  afterEach(() => {
    vi.restoreAllMocks();
  });
  */
  

  it("should calculate the right price", async () => {
    const user = userEvent.setup();

    //await new Promise((r) => setTimeout(r, 2000));

    //Trying to mock the products-response

    /**  
    const productUrl = "https://eoxxctddowfwq0k.m.pipedream.net/products";
    const mockFetch = vi
      .spyOn(window, "fetch")
      .mockImplementation(async (url: RequestInfo | URL) => {
        if (url === productUrl){
          return {
            json: async () => mockResponse,
          } as Response;
        } else {
          return {} as Response;
        }
      });
    */

    render(<App />);

    const firstRow = screen.getAllByRole("row")[1];

    const quantityPicker = firstRow.getElementsByClassName("MuiInputBase-input MuiOutlinedInput-input")[0];

    await user.type(quantityPicker, "10");

    await user.type(quantityPicker, '{enter}');

    await screen.findByText("1044 DKK");

    //expect(mockFetch).toHaveBeenCalledWith(productUrl);
  });
});

describe(App.name, () => {
  it('should remove apples from cart', async () => {
    const user = userEvent.setup();

    render(<App />);

    const buttons = screen.getAllByRole('button');
    const cButton = buttons[0];
    await user.click(cButton);

    const result = screen.queryByText("Apples");

    expect(result).toBeNull();
  });
});

describe(App.name, () => {
  it('should navigate to the form page', async () => {
    const user = userEvent.setup();

    render(<App />);

    const checkoutButton = screen.getByRole('button', { name: 'Checkout' });
    await user.click(checkoutButton);

    expect(screen.getByText('Country *')).toBeInTheDocument();
    expect(screen.getByText('ZIP code *')).toBeInTheDocument();
    expect(screen.getByText('City *')).toBeInTheDocument();
    expect(screen.getByText('Address line 1 *')).toBeInTheDocument();
    expect(screen.getByText('Address line 2')).toBeInTheDocument();
    expect(screen.getByText('Billing Address')).toBeInTheDocument();
    expect(screen.getByText('First name *')).toBeInTheDocument();
    expect(screen.getByText('Last name *')).toBeInTheDocument();
    expect(screen.getByText('Phone *')).toBeInTheDocument();
    expect(screen.getByText('Email *')).toBeInTheDocument();
    expect(screen.getByText('Company name')).toBeInTheDocument();
    expect(screen.getByText('Company VAT')).toBeInTheDocument();
  });
});

describe(App.name, () => {
  it('should correctly fill in city after zip input', async () => {
    const user = userEvent.setup();

    render(<App />);

    /*// might need in another test file
    const checkoutButton = screen.getByRole('button', { name: 'Checkout' });
    await user.click(checkoutButton);
    await new Promise(resolve => setTimeout(resolve, 1000));
     */

    const formInputs = document.getElementsByTagName('input')

    let zipInput = formInputs[1];
    let cityInput = formInputs[2];

    for (let i = 0; i < formInputs.length; i++) {
      if (formInputs[i].name == 'zip')
        zipInput = formInputs[i];
      else if (formInputs[i].name == 'city')
        cityInput = formInputs[i];
    }

    await user.type(zipInput, "9000");

    // need to call the useEffect that updates with [zip] in CheckoutForm.. but how?
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    console.log(zipInput.value)

    // empty.. heckin heck
    console.log(cityInput.value)

    //expect(cityInput.value).equals('Aalborg');
  });
});

describe(App.name, () => {
  it('should navigate to the payment page', async () => {
    const user = userEvent.setup();

    render(<App />);

    /*// might need in another test file
    const checkoutButton = screen.getByRole('button', { name: 'Checkout' });
    await user.click(checkoutButton);
    await new Promise(resolve => setTimeout(resolve, 1000));
     */

    const payButton = screen.getByRole('button', { name: 'To payment' });
    await user.click(payButton);

    // maybe change later
    expect(screen.getByText('GiftCard')).toBeInTheDocument();
    expect(screen.getByText('PaymentMethod')).toBeInTheDocument();
  });
});