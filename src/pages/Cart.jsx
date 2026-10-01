import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart } from "../api/cart/getCart";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { cartQuanityUpdater } from "../api/cart/cartQuanityUpdater";
import { dltCart } from "../api/cart/dltCart";
import { Link, useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import EmptyState from "../components/EmptyState";

function Cart() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: carts = [] } = useQuery({
    queryKey: ["carts", user?.id],
    queryFn: () => getCart(user.id),
    enabled: !!user,
  });

  const quantityUpdater = useMutation({
    mutationFn: cartQuanityUpdater,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts", user?.id],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const dltCartMutation = useMutation({
    mutationFn: dltCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts", user?.id]
      })
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const totalPrice = carts.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      {carts.length === 0 ? (
        <EmptyState icon={<ShoppingCart/>} name="Cart" />
      ) : (
        <div className=" bg-black text-white p-10">
          {/* Header */}
          <div className="mb-10 bg-[#111315] w-60 border-2 border-white/20 rounded-2xl p-5">
            <h1 className="text-3xl text-[#f8f7f4] font-semibold">Your Cart</h1>

            <p className="mt-2 text-sm text-white/80">
              Your selected JDM parts
            </p>
          </div>

          {/* Main */}
          <div className="grid grid-cols-[1fr_360px] gap-10">
            {/* Cart Items */}
            <div className="rounded-2xl border-2 border-white/20 bg-[#111315] px-6">
              {carts?.map((cart) => {
                return (
                  <CartItem
                    key={cart.id}
                    name={cart.name}
                    brand={cart.brand}
                    category={cart.category}
                    price={cart.price}
                    image={cart.image}
                    quantity={cart.quantity}
                    onClickPlus={() => {
                      if (cart.quantity < cart.stock) {
                        quantityUpdater.mutate({
                          cartId: cart.id,
                          quantity: cart.quantity + 1,
                        });
                      }
                    }}
                    onClickMinus={() => {
                      quantityUpdater.mutate({
                        cartId: cart.id,
                        quantity: cart.quantity - 1,
                      });
                    }}
                    onDltCart={() => {
                      dltCartMutation.mutate(cart.id);
                    }}
                  />
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-2xl border-2 border-white/20 bg-[#111315] p-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                className="mt-7 w-full rounded-xl bg-[#740505] py-3 font-medium text-[#f8f7f4] transition hover:bg-[#910b0b] cursor-pointer"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>

              <button className=" cursor-pointer mt-3 w-full rounded-xl py-3 text-sm font-medium bg-[#e2e1de] hover:bg-white text-black transition">
                <Link to="/mods">Continue Shopping</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
