import { Item, Product } from "../../Types/Types";
import oldProductList from "../../data/products.json"

export const fetchProductList = async (): Promise<Product[]> => {
  // INITIALIZING THE HEADERS OF THE GET REQUEST
  const headers = new Headers();
  // CONTENT HEADER
  headers.append("Content-Type", "application/json");

  // INITIALIZING THE HTTP REQUEST
  const options: RequestInit = {
    method: "GET",
    headers,
    mode: "cors",
  };

  // FETCHING THE PRODUCTS AS A RESPONSE


  //const response: Response = await fetch("https://eoxxctddowfwq0k.m.pipedream.net/products", options)
  const response: Response = await fetch("https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json")
  // PARSING THE BODY OF THE RESPONSE TO A JAVASCRIPT JSON OBJECT (MAPS IT AUTOMATICALLY TO PRODUCTS)
  console.log(response.status)
  if(response.status !== 200)
  {
    const oldList: Product[] = oldProductList
    return oldList
  }
  
  const data: Product[] = await response.json();
  return data
};
