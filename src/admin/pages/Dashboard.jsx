import {
  IndianRupee,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { useGetUsersOrders } from "../hooks/useGetUsersOrders";
import { useGetUsers } from "../hooks/useGetUsers";
import { useNavigate } from "react-router";
import { clsx } from "clsx";
import RevenueChart from "../components/RevenueChart";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export function Dashboard() {
  const navigate = useNavigate();
  const { data: products = [] } = useGetProducts();
  const { data: orders = [] } = useGetUsersOrders();
  const { data: users = [] } = useGetUsers();

  const revenue = orders
    ?.filter((order) => order.status === "DELIVERED")
    ?.reduce((sum, current) => sum + current.total, 0);

  const revenueObj = orders
    ?.filter((order) => order.status === "DELIVERED")
    .reduce((acc, order) => {
      const key = order.createdAt.split("T")[0];
      if (acc[key] === undefined) {
        acc[key] = order.total;
      } else {
        acc[key] += order.total;
      }
      return acc;
    }, {});
  const revenueData = Object.entries(revenueObj).map(([date, revenue]) => ({
    date,
    revenue,
  }));

  const totalUsers = users?.filter((user) => user?.status === "active")?.length;
  const totalProducts = products?.filter(
    (product) => product?.isDeleted === false,
  )?.length;

  const stats = [
    {
      title: "Total Revenue",
      value: formatPrice(revenue),
      change: "+12.5%",
      icon: IndianRupee,
    },
    {
      title: "Total Orders",
      value: orders?.length,
      change: "+8.2%",
      icon: ShoppingCart,
    },
    {
      title: "Total Customers",
      value: totalUsers,
      change: "+5.4%",
      icon: Users,
    },
    {
      title: "Total Products",
      value: totalProducts,
      change: "+3.1%",
      icon: Package,
    },
  ];

  const pendingCount = orders?.filter(
    (order) => order?.status === "PENDING",
  ).length;
  const shippedCount = orders?.filter(
    (order) => order?.status === "SHIPPED",
  ).length;
  const deliveredCount = orders?.filter(
    (order) => order?.status === "DELIVERED",
  ).length;
  const cancelledCount = orders?.filter(
    (order) => order?.status === "CANCELLED",
  ).length;

  const recentOrders = orders
    ?.toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="mx-auto mt-9 w-full max-w-screen-2xl space-y-6">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border drop-shadow-lg border-gray-200 bg-white p-5 transition hover:border-gray-300"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <div className="rounded-lg bg-gray-100 p-2">
                  <Icon size={18} className="text-gray-700" />
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between gap-2">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-3">
        {/* Revenue Overview — takes 2/3 of the available width */}
        <div className="min-w-0 xl:col-span-2">
          <RevenueChart revenueData={revenueData} />
        </div>

        {/* Order Summary */}
        <section className="flex h-full min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-lg sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Order Summary
              </h2>
              <p className="mt-1 text-sm text-gray-500">Current order status</p>
            </div>

            <ShoppingCart size={20} className="shrink-0 text-gray-400" />
          </div>

          <div className="mt-6 flex-1 space-y-5">
            {[
              {
                label: "Pending",
                count: pendingCount,
              },
              {
                label: "Shipped",
                count: shippedCount,
              },
              {
                label: "Delivered",
                count: deliveredCount,
              },
              {
                label: "Cancelled",
                count: cancelledCount,
              },
            ].map((order) => {
              const totalOrders = orders?.length ?? 0;
              const width =
                totalOrders > 0 ? (order.count / totalOrders) * 100 : 0;

              return (
                <div key={order.label}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-600">{order.label}</span>
                    <span className="font-semibold tabular-nums text-gray-900">
                      {order.count}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-gray-800 transition-all duration-300"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="mt-7 flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            onClick={() => navigate("/admin/orders")}
          >
            View all orders
            <ArrowUpRight size={16} />
          </button>
        </section>
      </div>

      {/* Recent Orders */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-3 p-5 sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Recent Orders
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              A quick look at your latest sales
            </p>
          </div>

          <button
            className="shrink-0 text-sm font-medium text-black-90 hover:text-black cursor-pointer"
            onClick={() => navigate("/admin/orders")}
          >
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-y border-gray-100 bg-gray-50">
              <tr className="text-xs font-medium uppercase tracking-wide text-gray-500">
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {recentOrders?.map((order) => (
                <tr key={order.id} className="transition hover:bg-gray-50/70">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.shippingAddress.fullName}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={clsx(
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                        order.status === "PENDING"
                          ? "bg-gray-100 text-black/80"
                          : order.status === "SHIPPED"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "DELIVERED"
                              ? "bg-green-100 text-green-700"
                              : order.status === "CANCELLED"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-50",
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
