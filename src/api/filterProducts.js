export function filterProducts({products, Dsearch="", category="all", sort=""}){
    let filteredProducts = products;

  if (Dsearch.trim() !== "") {
    const search = Dsearch.trim().toLowerCase();
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(search),
    );
  }

  if(category !== 'all'){
    filteredProducts = filteredProducts.filter((product) => product.category === category);
  }

  if(sort === 'low'){
    filteredProducts = filteredProducts.sort((a,b) => a.price - b.price);
  }
  else if(sort === 'high'){
    filteredProducts = filteredProducts.sort((a,b) => b.price - a.price);
  }

  return filteredProducts;
}