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
        queryKey: ["carts", user?.id],
      });
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
        <EmptyState icon={<ShoppingCart />} name="Cart" />
      ) : (
        <div className="min-h-screen bg-black p-4 text-white sm:p-6 lg:p-10">
          {/* Header */}
          <div className="mb-6 w-full rounded-3xl bg-[#f8f7f4] p-5 sm:mb-8 sm:w-fit sm:min-w-60 sm:p-6">
            <h1 className="text-2xl font-semibold text-[#0057ff] sm:text-3xl">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-black/90">
              Your selected JDM parts
            </p>
          </div>

          {/* Main */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
            {/* Cart Items */}
            <div className="min-w-0 rounded-3xl bg-[#f8f7f4] px-4 sm:px-6">
              {carts.map((cart) => (
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
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit min-w-0 rounded-3xl  bg-[#f8f7f4] p-5 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-xl text-[#0057ff] font-semibold">Order Summary</h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4 text-black/90">
                  <span>Subtotal</span>
                  <span className="font-semibold tracking-wider text-black">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between gap-4 text-black/90">
                  <span>Shipping</span>
                  <span className="font-semibold tracking-wider text-black">Free</span>
                </div>

                <div className="border-t border-[#0057ff] pt-4">
                  <div className="flex justify-between gap-4 text-lg text-black/90 font-semibold">
                    <span>Total</span>
                    <span className="font-semibold tracking-wider text-black">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <button
                className="mt-7 w-full cursor-pointer rounded-xl bg-[#003fbd] px-4 py-3 font-medium text-[#f8f7f4] transition hover:bg-[#0057ff]"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>

              <Link
                to="/mods"
                className="mt-3 flex w-full items-center justify-center rounded-xl bg-[#222a3b] px-4 py-3 text-center text-sm font-medium text-[#f8f7f4] transition hover:bg-[#374562]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
