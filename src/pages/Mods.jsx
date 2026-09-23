import { useMutation, useQuery } from "@tanstack/react-query";
import { SearchBar } from "../components/SearchBar";
import { getProducts } from "../api/getProducts";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";
import { addWishlist } from "../api/wishlist/addWishlist";
import { useSelector } from "react-redux";
import { getWishlist } from "../api/wishlist/getWishlist";
import { dltWishlist } from "../api/wishlist/dltWishlist";
import { addToCart } from "../api/cart/addToCart";
import { useNavigate } from "react-router";

function Mods() {
  const [search, setSearch] = useState("");
  const [Dsearch, setDSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", Dsearch, category, sort],
    queryFn: () => getProducts({ Dsearch, category, sort }),
  });

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(user.id),
    enabled: !!user,
  });

  const wishlistMutation = useMutation({
    mutationFn: addWishlist,
    onSuccess: () => {
      console.log("added");
    },
    onError: () => {
      console.log("error");
    },
  });

  const dltWishlistMutation = useMutation({
    mutationFn: dltWishlist,
    onSuccess: () => {
      console.log("removed");
    },
  });
  const handleWishlist = (product) => {
    const wishlistItem = wishlist.find((item) => item.productId === product.id);
    if (wishlistItem) {
      dltWishlistMutation.mutate(wishlistItem.id);
    } else {
      wishlistMutation.mutate({
        userId: user?.id,
        productId: product.id,
      });
    }
  };

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      navigate('/cart');
    },
    onError: () => {
      console.log('error')
    }
  })

  const handleCartClick = (product) => {
    addToCartMutation.mutate({
      userId: user.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      image: product.image,
      quanity: 1
    })
  }

  return (
    <div className="flex flex-col mx-10 min-h-screen gap-4 pb-10">
      {/* search bar */}
      <div className="flex justify-between gap-10 my-4">
        {/* Search */}
        <div className="flex-1">
          <SearchBar
            placeholder="Search products here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Filter + Sort */}
        <div className="flex gap-3">
          <select
            className="px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Wheels">Wheels</option>
            <option value="Spoiler">Spoiler</option>
            <option value="Exhaust">Exhaust</option>
          </select>

          <select
            className="px-1 mx-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-0  gap-y-10 justify-items-center">
        {data?.map((product) => {
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
              onWishlistClick={() => user && handleWishlist(product)}
              handleCartClick={() => user && handleCartClick(product)}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Mods;
