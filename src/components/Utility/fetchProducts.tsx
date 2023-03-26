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
  const response: Response = await fetch("https://eoxxctddowfwq0k.m.pipedream.net/products", options)
  // PARSING THE BODY OF THE RESPONSE TO A JAVASCRIPT JSON OBJECT (MAPS IT AUTOMATICALLY TO PRODUCTS)
  if(response.status !== 200)
  {
    const oldList: Product[] = oldProductList
    return oldList
  }
  
  const data: Product[] = await response.json();
  return data
  
  // // CREATES THE ITEMS WITH QUANTITY 0
  // const items: Item[] = data.map((e) => {
  //   return { product: e, quantity: 0 };
  // });
  // return items;
};