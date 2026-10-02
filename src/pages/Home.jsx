import { ProductCard } from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/getProducts";
import useCart from "../hooks/useCart";
import { useState } from "react";
import ProductModal from "../components/ProductModal";
import Hero from "../components/Hero";
import FeaturedMods from "../components/FeaturedMods";
import useWishlist from "../hooks/useWishlist";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { handleCartClick } = useCart();
  const { handleWishlist, wishlist } = useWishlist();

  const heroItems = [
    {
      id: "look-1",
      title: "Toyota Supra\nMK-4",
      image: "/images/mk4.jpg",
      credit: "BY JDM-Flux",
      meta: ["WED DEC 17", "7-11 PM", "OSAKA"],
      accent: "#000000",
    },
    {
      id: "look-2",
      title: "Nissan\nGT-R35",
      image: "/images/r35.jpg",
      meta: ["FRI OCT 24", "6-11 PM", "TOKYO"],
      accent: "#000000",
    },
    {
      id: "look-3",
      title: "Toyota GR Supra\nMK-5",
      image: "/images/mk5.jpg",
      meta: ["SAT JAN 10", "4-9 PM", "KYOTO"],
      accent: "#000000",
    },
  ];

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <main className="min-h-screen flex flex-col justify-between gap-15">
      {/* hero */}
      <Hero heroItems={heroItems} autoplay />

      {/* featured products */}
      <section>
        <h2 className="text-center text-4xl font-light tracking-widest text-white/90">
          Featured <span className="font-normal tracking-tight">Mods</span>
        </h2>
        <FeaturedMods>
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
                isWishlisted={user && isWishlisted}
                onWishlistClick={() => handleWishlist(product)}
                handleCartClick={() => handleCartClick(product)}
                handleCardClick={() => setSelectedProduct(product)}
              />
            );
          })}
        </FeaturedMods>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            handleCartClick={() => handleCartClick(selectedProduct)}
          />
        )}
      </section>

      {/* footer */}
      <div className="flex items-end justify-between bg-white/5 px-8 py-4 text-white/40">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold tracking-[0.2em] text-white/70">
            JDM FLUX
          </h1>
          <p className="text-sm text-white/50">Japanese blood. Racing soul.</p>
        </div>
        <div className="flex flex-col items-end gap-1 text-xs tracking-wide">
          <p className="text-white/50">Built for the JDM culture.</p>
          <p>© 2026 JDMFLUX</p>
        </div>
      </div>
    </main>
  );
}
export default Home;
