import { SearchBar } from "../components/SearchBar";
import { getProducts } from "../api/getProducts";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import ProductModal from "../components/ProductModal";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { useQuery } from "@tanstack/react-query";

function Mods() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [Dsearch, setDSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const user = useSelector((state) => state.auth.user);

  const {handleCartClick} = useCart();
  const {handleWishlist, wishlist} = useWishlist();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products", Dsearch, category, sort],
    queryFn: () => getProducts({ Dsearch, category, sort }),
  });


  return (
    <div className="flex rounded-2xl flex-col mx-10 min-h-screen gap-4 pb-10 mt-10">
      <div className=" p-5 rounded-2xl">
      {/* search bar */}
      <div className="flex justify-between gap-10 my-4 ">
        {/* Search */}
        <div className="flex-1">
          <SearchBar

            placeholder="Search products here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Filter + Sort */}
        <div className="flex gap-3 mr-15">
          <select
            className="px-5 py-2.5 rounded-lg outline-none bg-white/13 focus:bg-black text-white/90"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Wheels">Wheels</option>
            <option value="Spoiler">Spoiler</option>
            <option value="Exhaust">Exhaust</option>
          </select>

          <select
            className="px-1 mx-5 py-2.5 rounded-lg bg-white/13 focus:bg-black outline-none  text-white/90"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-0  gap-y-20 my-10 justify-items-center">
        {products?.map((product) => {
          const isWishlisted = wishlist.some(
            (item) => item.productId === product.id,
          );

          return (
            <ProductCard
              key={product.id}
              name={product.name}
              img={product.image}
              category={product.category}
              brand={product.brand}
              price={product.price}
              stock={product.stock}
              isWishlisted={user && isWishlisted}
              onWishlistClick={() => handleWishlist(product)}
              handleCartClick={() => handleCartClick(product)}
              handleCardClick={() => setSelectedProduct(product)}
            />
          );
        })}
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          handleCartClick={() => handleCartClick(selectedProduct)}
        />
      )}
      </div>
    </div>
  );
}
export default Mods;
