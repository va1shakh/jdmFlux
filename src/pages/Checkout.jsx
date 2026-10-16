import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getCart } from "../api/cart/getCart";
import { useSelector } from "react-redux";
import { makeOrder } from "../api/order/makeOrder";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import axios from "axios";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

export default function Checkout() {
  const user = useSelector((state) => state.auth.user);
  const {data: userInfo = {}} = useGetUserInfo();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: carts = [], isPending } = useQuery({
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

  const entireDeleteCartMutation = useMutation({
    mutationFn: async () => {
      await Promise.all(
        carts.map((item) =>
          axios.delete(`http://localhost:3000/carts/${item.id}`),
        ),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts"]
      })
    }
  });

  const makeOrderMutation = useMutation({
    mutationFn: makeOrder,
    onSuccess: () => {
      Swal.fire({
        title: "Order Successfull !",
        text: `Dear ${userInfo?.username} your order has been placed`,
        icon: "success",
        confirmButtonText: "View Order",
        confirmButtonColor: "#0057ff"
      });
      navigate("/orders");
      entireDeleteCartMutation.mutate();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleOrder = (e) => {
    e.preventDefault();
    const orderItem = {
      userId: user.id,
      items: carts.map((item) => ({
        productId: item.productId,
        name: item.name,
        brand: item.brand,
        category: item.category,
        image: item.image,
        quantity: item.quantity,
        price: item.price * item.quantity,
      })),
      shippingAddress: formData,
      subtotal: totalPrice,
      shipping: 0,
      total: totalPrice,
      paymentMethod: paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    makeOrderMutation.mutate(orderItem);
  };

  if (!isPending && carts?.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="min-h-screen px-5 py-10 text-[#f8f7f4]">
      <form onSubmit={handleOrder}>
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <header className="flex mb-14 p-7 rounded-4xl bg-[#f8f7f4]">
            <div className="flex gap-6">
              <div>
                <h1 className="text-4xl text-[#0057ff] font-semibold uppercase tracking-[-0.04em] sm:text-5xl">
                  Checkout
                </h1>

                <p className="mt-3 text-md text-black/90">
                  Complete your order
                </p>
              </div>
            </div>
          </header>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] bg-[#f8f7f4] p-8 rounded-3xl">
            {/* ================= LEFT ================= */}
            <main className="space-y-12">
              {/* Shipping Information */}
              <section>
                <div className="mb-7 flex items-start gap-5">
                  <div>
                    <h2 className="text-xl text-[#0057ff] font-medium uppercase tracking-widest">
                      Shipping information
                    </h2>

                    <p className="mt-2 text-sm font-semibold tracking-wider text-black/90">
                      Enter your delivery details.
                    </p>
                  </div>
                </div>
                <div className="py-7">
                  <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                    {/* Full name */}
                    <label className="group block">
                      <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-[#0057ff]">
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
                        className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-black outline-none placeholder:text-neutral-400 transition focus:border-[#0057ff]"
                      />
                    </label>

                    {/* Phone */}
                    <label className="group block">
                      <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-[#0057ff]">
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
                        className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-black outline-none placeholder:text-neutral-400 transition focus:border-[#0057ff]"
                      />
                    </label>

                    {/* Address */}
                    <label className="group block sm:col-span-2">
                      <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-[#0057ff]">
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
                        className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-black outline-none placeholder:text-neutral-400 transition focus:border-[#0057ff]"
                      />
                    </label>

                    {/* City */}
                    <label className="group block">
                      <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-[#0057ff]">
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
                        className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-black outline-none placeholder:text-neutral-400 transition focus:border-[#0057ff]"
                      />
                    </label>

                    {/* State */}
                    <label className="group block">
                      <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-[#0057ff]">
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
                        className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-black outline-none placeholder:text-neutral-400 transition focus:border-[#0057ff]"
                      />
                    </label>

                    {/* PIN */}
                    <label className="group block">
                      <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 transition group-focus-within:text-[#0057ff]">
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
                        className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-black outline-none placeholder:text-neutral-400 transition focus:border-[#0057ff]"
                      />
                    </label>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section>
                <div className="mb-7 flex items-start gap-5">
                  <div>
                    <h2 className="text-xl font-medium text-[#0057ff] uppercase tracking-widest">
                      Payment method
                    </h2>

                    <p className="mt-2 text-sm text-black/90">
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
                        : "rounded-2xl bg-blue-200 text-black/90"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium">Cash on Delivery</p>

                        <p
                          className={`mt-2 text-xs ${
                            paymentMethod === "cod"
                              ? "text-[#f8f7f4]"
                              : "text-black/80"
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
                        : "rounded-2xl bg-blue-200 text-black/90"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium">Online payment</p>

                        <p
                          className={`mt-2 text-xs ${
                            paymentMethod === "online"
                              ? "text-[#f8f7f4]"
                              : "text-black/80"
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
            <aside className="h-fit  rounded-3xl border-2 border-gray-300 lg:sticky lg:top-24">
              {/* Summary Header */}
              <div className="border-b border-gray-300 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl text-[#0057ff] font-medium uppercase tracking-[-0.02em]">
                      Order summary
                    </h2>
                  </div>

                  <span className="font-mono text-md text-black/90">
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
                          index !== 0 ? "border-t border-gray-300" : ""
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-md text-black/90 font-medium">
                            {item.name}
                          </p>

                          <p className="mt-2 font-mono text-sm uppercase tracking-[0.15em] text-black/90">
                            <span className="text-[#0057ff]">Quantity:</span> {item.quantity}
                          </p>
                        </div>

                        <p className="text-black/90 shrink-0 text-md font-semibold tracking-wider">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="my-3 border-t border-gray-300" />

                {/* Prices */}
                <div className="space-y-4 pt-4 text-md">
                  <div className="flex justify-between text-neutral-100">
                    <span className="text-[#0057ff]">Subtotal</span>
                    <span className="text-black/90 font-semibold tracking-wider text-lg">₹{totalPrice}</span>
                  </div>

                  <div className="flex justify-between text-neutral-100">
                    <span className="text-[#0057ff]">Shipping</span>
                    <span className="uppercase tracking-wide text-black/90">
                      Free
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between border-t border-gray-300 pt-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#0057ff]">
                        Total
                      </p>

                      <p className="mt-2 text-xl font-semibold tracking-wider text-black/90">₹{totalPrice}</p>
                    </div>

                    <span className="font-mono text-[15px] text-black/50">
                      INR
                    </span>
                  </div>
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className=" cursor-pointer mt-8 flex w-full items-center rounded-2xl justify-between bg-[#0035a0] px-5 py-4 text-sm font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#0057ff]"
                >
                  <span className="text-[#f8f7f4]">Place order</span>

                  <span className="text-lg leading-none">→</span>
                </button>
              </div>
            </aside>
          </div>
        </div>
      </form>
    </div>
  );
}
