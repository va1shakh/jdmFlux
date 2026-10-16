import { ProductCard } from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/getProducts";
import useCart from "../hooks/useCart";
import { useState } from "react";
import ProductModal from "../components/ProductModal";
import { Hero } from "../components/Hero";
import FeaturedMods from "../components/FeaturedMods";
import useWishlist from "../hooks/useWishlist";
import { useSelector } from "react-redux";
import { HeroSection } from "../components/HeroSection";
import Footer from "../components/Footer";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { handleCartClick } = useCart();
  const { handleWishlist, wishlist } = useWishlist();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <main className="flex min-h-screen flex-col justify-between gap-8 sm:gap-10">
      {/* Hero */}
      <HeroSection
        desktopImage="/images/desktop.jpg"
        mobileImage="/images/mobile.jpg"
        description="Built for JDM enthusiasts. Discover performance parts, iconic builds, and the culture that drives you."
      />

      {/* Featured Products */}
      <section className="mt-5 border-b-2 border-b-white/20">
        <h2 className="mb-8 text-center text-2xl font-light tracking-widest text-white/90 sm:mb-10 sm:text-3xl md:mb-14 md:text-4xl">
          Featured <span className="font-normal tracking-tight">Mods</span>
        </h2>

        {/* Centered carousel container */}
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8">
          <FeaturedMods>
            {products?.map((product) => {
              const isWishlisted = wishlist.some(
                (item) => item.productId === product.id,
              );

              return (
                <div
                  key={product.id}
                  className="min-w-0 shrink-0 grow-0 basis-full px-2 sm:basis-1/2 lg:basis-1/3"
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
          </FeaturedMods>
        </div>

        {/* Keep your ProductModal here */}
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
export default Home;
