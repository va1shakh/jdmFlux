import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/cart/getCart";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

function Cart() {
  const user = useSelector((state) => state.auth.user);

  const { data: carts = [] } = useQuery({
    queryKey: ["carts", user?.id],
    queryFn: () => getCart(user.id),
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-black px-10 py-8 text-white">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">Your Cart</h1>

        <p className="mt-2 text-sm text-zinc-500">Your selected JDM parts</p>
      </div>

      {/* Main */}
      <div className="grid grid-cols-[1fr_360px] gap-10">
        {/* Cart Items */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-6">
          {carts?.map((cart) => {
            return (
              <CartItem
                key={cart.id}
                name={cart.name}
                brand={cart.brand}
                category={cart.category}
                price={cart.price}
                image={cart.image}
              />
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>₹00,000</span>
            </div>

            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="border-t border-zinc-800 pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹00,000</span>
              </div>
            </div>
          </div>

          <button className="mt-7 w-full rounded-xl bg-white py-3 font-medium text-black transition hover:bg-zinc-200">
            Proceed to Checkout
          </button>

          <button className="mt-3 w-full rounded-xl border border-zinc-800 py-3 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
