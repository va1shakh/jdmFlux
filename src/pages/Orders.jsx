import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getOrder } from "../api/order/getOrder";
import OrderCard from "../components/OrderCard";
import { cancelOrder } from "../api/order/cancelOrder";
import { toast } from "sonner";
import { Package } from "lucide-react";
import { Link } from "react-router";

function Orders() {
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getOrder(user.id),
    enabled: !!user?.id,
  });

  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success("Your order has been cancelled");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: () => {
      toast.error("Someting went wrong");
    },
  });

  const handleCancel = (orderId) => {
    cancelOrderMutation.mutate(orderId);
  };

  return (
    <div className="w-full">
      {orders?.length === 0 ? (
        /* Empty State */
        <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
              <Package size={36} className="text-zinc-500" />
            </div>

            <h2 className="text-2xl font-semibold text-white">No orders yet</h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500 sm:text-base">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/mods"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Browse Mods
            </Link>
          </div>
        </div>
      ) : (
        /* Orders Content */
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:gap-5 sm:px-6 sm:py-8 lg:px-10 lg:py-10 xl:px-12">
          {/* Header */}
          <header className="mb-4 rounded-2xl border border-white/20 bg-[#111315] p-5 sm:mb-6 sm:rounded-3xl sm:p-7 md:p-9">
            <div>
              <h1 className="text-3xl font-semibold uppercase tracking-[-0.04em] text-[#f8f7f4] sm:text-4xl md:text-5xl">
                Your Orders
              </h1>

              <p className="mt-2 text-sm text-white/50 sm:mt-3 sm:text-base">
                Complete your order
              </p>
            </div>
          </header>

          {/* Orders List */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                handleCancel={handleCancel}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Orders;
