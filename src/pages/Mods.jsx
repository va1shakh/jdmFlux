import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { getCart } from "../api/cart/getCart";
import { cartQuanityUpdater } from "../api/cart/cartQuanityUpdater";
import ProductModal from "../components/ProductModal";
import { toast } from "sonner";

function Mods() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [Dsearch, setDSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    queryKey: ["wishlist", user?.id],
    queryFn: () => getWishlist(user.id),
    enabled: !!user?.id,
  });

  const wishlistMutation = useMutation({
    mutationFn: addWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", user?.id]
      })
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const dltWishlistMutation = useMutation({
    mutationFn: dltWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", user?.id]
      })
    },
    onError: () => {
      toast.error("Something went wrong");
    }
  });
  const handleWishlist = (product) => {
    if(!user){
      navigate('/login');
      return;
    }
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

  const { data: carts = [] } = useQuery({
    queryKey: ["carts", user?.id],
    queryFn: () => getCart(user.id),
    enabled: !!user?.id,
  });

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      navigate("/cart");
    },
    onError: () => {
      console.log("error");
    },
  });

  const quanityUpdateMutation = useMutation({
    mutationFn: cartQuanityUpdater,
    onSuccess: () => {
      navigate("/cart");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleCartClick = (product) => {
    if(!user){
      navigate('/login');
      return;
    }
    const cartItem = carts.find((cart) => product.id === cart.productId);
    if (cartItem) {
      quanityUpdateMutation.mutate({
        cartId: cartItem.id,
        quantity: cartItem.quantity + 1,
      });
    } else {
      addToCartMutation.mutate({
        userId: user.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        image: product.image,
        productId: product.id,
        stock: product.stock,
        quantity: 1,
      });
    }
  };

  return (
    <div className="flex bg-black flex-col mx-10 min-h-screen gap-4 pb-10">
      <div className="bg-[#111315] p-5 border-2 border-white/5 rounded-2xl">
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
        <div className="flex gap-3">
          <select
            className="px-5 py-2.5 rounded-lg border-0 outline-none bg-black text-white"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Wheels">Wheels</option>
            <option value="Spoiler">Spoiler</option>
            <option value="Exhaust">Exhaust</option>
          </select>

          <select
            className="px-1 mx-5 py-2.5 rounded-lg bg-black border-0 outline-none  text-white"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-0  gap-y-10 my-9 justify-items-center">
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
