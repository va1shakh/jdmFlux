import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getOrder } from "../api/order/getOrder";
import OrderCard from "../components/OrderCard";
import { cancelOrder } from "../api/order/cancelOrder";
import { toast } from "sonner";
import { Package } from "lucide-react";
import { Link } from 'react-router'

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
    <div>
      {orders?.length === 0 ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          {" "}
          <div className="flex flex-col items-center text-center">
            {" "}
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
              {" "}
              <span className="text-4xl text-zinc-500"><Package/></span>{" "}
            </div>{" "}
            <h2 className="text-2xl font-semibold text-white">
              {" "}
              No orders yet{" "}
            </h2>{" "}
            <p className="mt-2 max-w-sm text-zinc-500">
              {" "}
              You haven't placed any orders yet.{" "}
            </p>{" "}
            <button className="mt-6 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200">
              {" "}
              <Link to="/mods">Browse Mods</Link>{" "}
            </button>{" "}
          </div>{" "}
        </div>
      ) : (
        <div className="min-h-screen px-20 py-10 flex flex-col gap-5">
          {/* header */}
          <header className="flex mb-14 border-2 border-white/20 p-7 rounded-4xl bg-[#111315]">
            <div className="flex gap-6">
              <div>
                <h1 className="text-4xl text-[#f8f7f4] font-semibold uppercase tracking-[-0.04em] sm:text-5xl">
                  Your Orders
                </h1>

                <p className="mt-3 text-md text-white/50">
                  Complete your order
                </p>
              </div>
            </div>
          </header>
          {orders?.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              handleCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Orders;
