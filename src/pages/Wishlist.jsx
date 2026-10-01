import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getWishlist } from "../api/wishlist/getWishlist";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../api/getProducts";
import { dltWishlist } from "../api/wishlist/dltWishlist";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getCart } from "../api/cart/getCart";
import { addToCart } from "../api/cart/addToCart";
import { cartQuanityUpdater } from "../api/cart/cartQuanityUpdater";
import EmptyState from "../components/EmptyState";
import { Heart } from "lucide-react";

function Wishlist() {
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const icon = <Heart />

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: () => getWishlist(user.id),
    enabled: !!user?.id,
  });

  const { data: carts = [] } = useQuery({
    queryKey: ["carts", user?.id],
    queryFn: () => getCart(user.id),
    enabled: !!user?.id
  })

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const wishlistedProducts = products.filter((product) => {
    return wishlist.some((item) => {
      return product.id === item.productId;
    });
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
    const wishlistItem = wishlist.find((item) => item.productId === product.id);
    dltWishlistMutation.mutate(wishlistItem.id);
  };

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      navigate("/cart");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const quanityUpdateMutation = useMutation({
    mutationFn: cartQuanityUpdater,
    onSuccess: () => {
      navigate("/cart");
    },
    onError: () => {
      toast.error("Something went wrong");
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
    <div className="min-h-screen bg-black">
      {wishlist.length === 0 ? (
        <EmptyState icon={icon} name="wishlist" />
      ) : (
        <div className="p-10">
          <div className="mb-10 bg-[#111315] w-70 border-2 border-white/20 rounded-2xl p-5">
            <h1 className="text-3xl text-[#f8f7f4] font-semibold">Your Wishlist</h1>

            <p className="mt-2 text-sm text-white/80">
              Your favorite <span className="font-medium text-lg">{wishlist?.length}</span> JDM parts
            </p>
          </div>
        <div className="grid grid-cols-4 gap-x-0  gap-y-10 justify-items-center border-2 border-white/20 bg-[#111315] rounded-3xl py-10">
          
          {wishlistedProducts?.map((product) => {
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                img={product.image}
                category={product.category}
                brand={product.brand}
                price={product.price}
                isWishlisted={true}
                onWishlistClick={() => user && handleWishlist(product)}
                handleCartClick={() => handleCartClick(product)}
              />
            );
          })}
        </div>
        </div>
      )}
    </div>
  );
}
export default Wishlist;
