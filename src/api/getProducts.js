import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const getProducts = async ({ Dsearch ="", category="all", sort="" }) => {
  const { data } = await axios.get(API_URL);
  let products = [...data];
  const search = Dsearch.trim();

  if (search) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if(category !== 'all'){
    products = products.filter((product) => product.category === category);
  }

  if(sort === 'low'){
    products = products.sort((a,b) => a.price - b.price);
  }
  else if(sort === 'high'){
    products = products.sort((a,b) => b.price - a.price);
  }

  return products;

};
