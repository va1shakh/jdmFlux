import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getWishlist } from "../api/wishlist/getWishlist";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../api/getProducts";
import { dltWishlist } from "../api/wishlist/dltWishlist";
import { Link } from "react-router";

function Wishlist() {
  const user = useSelector((state) => state.auth.user);

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(user.id),
    enabled: !!user,
  });

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
      console.log("removed");
    },
  });

  const handleWishlist = (product) => {
    const wishlistItem = wishlist.find((item) => item.productId === product.id);
    dltWishlistMutation.mutate(wishlistItem.id);
  };

  return (
    <div>
      {wishlist.length === 0 ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          {" "}
          <div className="flex flex-col items-center text-center">
            {" "}
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
              {" "}
              <span className="text-4xl text-zinc-500">♡</span>{" "}
            </div>{" "}
            <h2 className="text-2xl font-semibold text-white">
              {" "}
              Your wishlist is empty{" "}
            </h2>{" "}
            <p className="mt-2 max-w-sm text-zinc-500">
              {" "}
              Save your favorite JDM modification parts and they’ll appear here.{" "}
            </p>{" "}
            <button
              className="mt-6 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              {" "}
              <Link to="/mods" >Browse Mods</Link> {" "}
            </button>{" "}
          </div>{" "}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-x-0  gap-y-10 justify-items-center">
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
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Wishlist;
