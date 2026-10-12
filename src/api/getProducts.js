import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const getProducts = async ({ Dsearch ="", category="all", sort="" }) => {
  const {data: products = []} = await axios.get(API_URL);
  let results = products;
  const search = Dsearch.trim();

  if (search) {
    results = results.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if(category !== 'all'){
    results = results.filter((product) => product.category === category);
  }

  if(sort === 'low'){
    results = results.sort((a,b) => a.price - b.price);
  }
  else if(sort === 'high'){
    results = results.sort((a,b) => b.price - a.price);
  }

  return results;

};
