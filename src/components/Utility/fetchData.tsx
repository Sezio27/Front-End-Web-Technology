export const fetchData = async (url: string): Promise<any> => {
  
  const response = await fetch(url)

  if (response.status !== 200) {
    console.log("Failed to fetch data from", url)
  }

  return response.json()
};

