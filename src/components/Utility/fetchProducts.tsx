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
  //A Try and catch method is used to check for errors.
  let json;

  try {
//const response: Response = await fetch("https://eoxxctddowfwq0k.m.pipedream.net/products", options)
    const response: Response =
        await fetch("https://SSraw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json")
    // PARSING THE BODY OF THE RESPONSE TO A JAVASCRIPT JSON OBJECT (MAPS IT AUTOMATICALLY TO PRODUCTS)
    if(!response.ok)
    {
      console.log("RESPONSE NOT 200, USING LOCAL PRODUCT LIST INSTEAD")
      const oldList: Product[] = oldProductList
      return oldList
    }
    json = await response.json();
  } catch (error) {
      console.log('AN ERROR WAS FOUND: ', error);
  }

  //on successful find of the Json file
  if (json) {
    console.log('FETCH SUCCESSFUL: ', json);
  }
  const data: Product[] = json;
  return data
};
