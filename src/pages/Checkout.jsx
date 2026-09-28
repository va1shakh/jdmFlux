import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCart } from "../api/cart/getCart";
import { useSelector } from "react-redux";
import { makeOrder } from "../api/order/makeOrder";

export default function Checkout() {
  const user = useSelector((state) => state.auth.user);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { data: carts = [] } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCart(user.id),
    enabled: !!user,
  });

  const totalPrice = carts.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const makeOrderMutation = useMutation({
    mutationFn: makeOrder,
    onSuccess: () => {
      console.log("ordered");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleOrder = () => {
    const orderItem = {
      userId: user.id,
      items: carts.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price * item.quantity,
      })),
      shippingAddress: formData,
      subtotal: totalPrice,
      shipping: 0,
      total: totalPrice,
      paymentMethod: paymentMethod,
    };
    makeOrderMutation.mutate(orderItem);
  };

  return (
    <div className="min-h-screen bg-[] px-5 py-10 text-[#f8f7f4] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex mb-14 border-b border-neutral-800 p-7 rounded-4xl bg-[#0057ff]">
          <div className="flex gap-6">
            <div>
              <h1 className="text-4xl font-semibold uppercase tracking-[-0.04em] sm:text-5xl">
                Checkout
              </h1>

              <p className="mt-3 text-sm text-neutral-200">
                Complete your order
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] bg-[#15191D] p-8 rounded-3xl">
          {/* ================= LEFT ================= */}
          <main className="space-y-12">
            {/* Shipping Information */}
            <section>
              <div className="mb-7 flex items-start gap-5">
                <div>
                  <h2 className="text-xl font-medium uppercase tracking-[-0.02em]">
                    Shipping information
                  </h2>

                  <p className="mt-2 text-sm text-neutral-400">
                    Enter your delivery details.
                  </p>
                </div>
              </div>

              <div className="border-y border-neutral-700 py-7">
                <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                  {/* Full name */}
                  <label className="group block">
                    <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-white">
                      Full name
                    </span>

                    <input
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                      required
                      type="text"
                      placeholder="Your name"
                      className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-neutral-400 transition focus:border-white"
                    />
                  </label>

                  {/* Phone */}
                  <label className="group block">
                    <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-white">
                      Phone number
                    </span>

                    <input
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      required
                      type="tel"
                      placeholder="Your phone number"
                      className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-neutral-400 transition focus:border-white"
                    />
                  </label>

                  {/* Address */}
                  <label className="group block sm:col-span-2">
                    <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-white">
                      Address
                    </span>

                    <input
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      required
                      type="text"
                      placeholder="Street address"
                      className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-neutral-400 transition focus:border-white"
                    />
                  </label>

                  {/* City */}
                  <label className="group block">
                    <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-white">
                      City
                    </span>

                    <input
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      required
                      type="text"
                      placeholder="City"
                      className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-neutral-400 transition focus:border-white"
                    />
                  </label>

                  {/* State */}
                  <label className="group block">
                    <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-white">
                      State
                    </span>

                    <input
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                      required
                      type="text"
                      placeholder="State"
                      className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-neutral-400 transition focus:border-white"
                    />
                  </label>

                  {/* PIN */}
                  <label className="group block">
                    <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-white">
                      PIN code
                    </span>

                    <input
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pinCode: e.target.value,
                        }))
                      }
                      required
                      type="text"
                      inputMode="numeric"
                      placeholder="PIN code"
                      className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-neutral-400 transition focus:border-white"
                    />
                  </label>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <div className="mb-7 flex items-start gap-5">
                <div>
                  <h2 className="text-xl font-medium uppercase tracking-[-0.02em]">
                    Payment method
                  </h2>

                  <p className="mt-2 text-sm text-neutral-400">
                    Choose your preferred payment method.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* COD */}
                <label
                  className={` group relative cursor-pointer p-9 transition ${
                    paymentMethod === "cod"
                      ? "bg-[#0057ff] rounded-2xl text-[#f8f7f4]"
                      : "rounded-2xl bg-[#20202a]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">Cash on Delivery</p>

                      <p
                        className={`mt-2 text-xs ${
                          paymentMethod === "cod"
                            ? "text-neutral-100"
                            : "text-neutral-100"
                        }`}
                      >
                        Pay when your order arrives
                      </p>
                    </div>

                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 h-4 w-4 accent-black"
                    />
                  </div>
                </label>

                {/* Online */}
                <label
                  className={`group relative cursor-pointer p-9 transition ${
                    paymentMethod === "online"
                      ? "bg-[#0057ff] rounded-2xl text-[#f8f7f4]"
                      : "rounded-2xl bg-[#20202a]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>

                      <p className="text-sm font-medium">Online payment</p>

                      <p
                        className={`mt-2 text-xs ${
                          paymentMethod === "online"
                            ? "text-neutral-100"
                            : "text-neutral-100"
                        }`}
                      >
                        Pay securely online
                      </p>
                    </div>

                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="mt-1 h-4 w-4 accent-black"
                    />
                  </div>
                </label>
              </div>
            </section>
          </main>

          {/* ================= RIGHT ================= */}
          <aside className="h-fit  rounded-3xl border-2 lg:sticky lg:top-24">
            {/* Summary Header */}
            <div className="border-b border-neutral-500 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-medium uppercase tracking-[-0.02em]">
                    Order summary
                  </h2>
                </div>

                <span className="font-mono text-md text-neutral-100">
                  {carts?.length ?? 0} ITEMS
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="p-6">
              <div className="space-y-0">
                {carts?.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className={`flex items-start justify-between gap-4 py-5 ${
                        index !== 0 ? "border-t border-neutral-400" : ""
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-md font-medium">
                          {item.name}
                        </p>

                        <p className="mt-2 font-mono text-sm uppercase tracking-[0.15em] text-neutral-300">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="my-3 border-t border-neutral-400" />

              {/* Prices */}
              <div className="space-y-4 pt-4 text-md">
                <div className="flex justify-between text-neutral-100">
                  <span>Subtotal</span>
                  <span className="text-neutral-100">₹{totalPrice}</span>
                </div>

                <div className="flex justify-between text-neutral-100">
                  <span>Shipping</span>
                  <span className="uppercase tracking-wide text-white">
                    Free
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-neutral-800 pt-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-100">
                      Total
                    </p>

                    <p className="mt-2 text-xl font-medium">₹{totalPrice}</p>
                  </div>

                  <span className="font-mono text-[10px] text-neutral-700">
                    INR
                  </span>
                </div>
              </div>

              {/* Place Order */}
              <button
                type="button"
                onClick={handleOrder}
                className=" cursor-pointer mt-8 flex w-full items-center rounded-2xl justify-between bg-[#0057ff] px-5 py-4 text-sm font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#1463ff]"
              >
                <span>Place order</span>

                <span className="text-lg leading-none">→</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
