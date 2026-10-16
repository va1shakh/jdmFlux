import { SearchBar } from "../components/SearchBar";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductModal from "../components/ProductModal";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { useGetProducts } from "../hooks/useGetProducts";
import { filterProducts } from "../api/filterProducts";

function Mods() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [Dsearch, setDSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const user = useSelector((state) => state.auth.user);

  const { handleCartClick } = useCart();
  const { handleWishlist, wishlist } = useWishlist();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: allProducts = [], isLoading, isError } = useGetProducts();
  const products = allProducts.filter((product) => product.isDeleted === false);
  const filteredProducts = filterProducts({
    products,
    Dsearch,
    category,
    sort,
  });

 return (
  <main className="w-full min-w-0 px-3 pb-10 sm:px-4 lg:px-6">

    {/* CONTENT BOX */}
    <section className="mx-auto w-full min-w-0 max-w-[384px] rounded-2xl border border-white/10 p-3 sm:max-w-[768px] sm:p-4 lg:max-w-[1152px] lg:p-5">

      {/* TOOLBAR */}
      <div className="mb-8 flex min-w-0 flex-col gap-4 md:flex-row md:items-center">

        {/* Search */}
        <div className="w-full min-w-0 md:flex-1">
          <SearchBar
            placeholder="Search products here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category + Sort */}
        <div className="grid w-full grid-cols-2 gap-3 md:w-auto md:shrink-0">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 w-full min-w-0 rounded-xl border border-white/10 bg-white/10 px-2 text-sm text-white outline-none sm:px-3 md:min-w-[150px]"
          >
            <option value="all">All Categories</option>
            <option value="Wheels">Wheels</option>
            <option value="Spoiler">Spoiler</option>
            <option value="Exhaust">Exhaust</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-11 w-full min-w-0 rounded-xl border border-white/10 bg-white/10 px-2 text-sm text-white outline-none sm:px-3 md:min-w-[160px]"
          >
            <option value="">Sort by Price</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

        </div>
      </div>
      {/* END TOOLBAR */}


      {/* PRODUCTS */}
      {isLoading ? (
        <p className="py-12 text-center text-white/60">
          Loading products...
        </p>
      ) : isError ? (
        <p className="py-12 text-center text-red-400">
          Failed to load products. Please try again.
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="py-12 text-center text-white/60">
          No products found.
        </p>
      ) : (
        <div className="flex flex-wrap gap-x-4 gap-y-8">

          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.some(
              (item) => item.productId === product.id
            );

            return (
              <div
                key={product.id}
                className="w-full min-w-0 sm:w-[calc(50%_-_0.5rem)] lg:w-[calc(33.333333%_-_0.667rem)]"
              >
                <ProductCard
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
              </div>
            );
          })}

        </div>
      )}
      {/* END PRODUCTS */}

    </section>
    {/* END CONTENT BOX */}


    {/* PRODUCT MODAL */}
    {selectedProduct && (
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        handleCartClick={() => handleCartClick(selectedProduct)}
      />
    )}

  </main>
);
}
export default Mods;
