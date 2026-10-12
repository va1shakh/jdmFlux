import {
  IndianRupee,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹2,45,800",
    change: "+12.5%",
    icon: IndianRupee,
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    icon: ShoppingCart,
  },
  {
    title: "Total Customers",
    value: "856",
    change: "+5.4%",
    icon: Users,
  },
  {
    title: "Total Products",
    value: "342",
    change: "+3.1%",
    icon: Package,
  },
];


export function Dashboard() {
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
                <span className="mb-1 flex items-center text-xs font-medium text-gray-600">
                  <TrendingUp size={14} className="mr-1" />
                  {stat.change}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Compared to previous period
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 drop-shadow-lg">

        {/* Revenue Overview */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 xl:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Revenue Overview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Monitor your store's performance
              </p>
            </div>

            <button
              aria-label="Revenue options"
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="mt-8 flex h-56 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50/50">
            <div className="text-center">
              <TrendingUp
                size={28}
                className="mx-auto text-gray-400"
              />
              <p className="mt-3 text-sm font-medium text-gray-600">
                Revenue chart
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Connect your sales data to display analytics
              </p>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between drop-shadow-lg">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Order Summary
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Current order status
              </p>
            </div>
            <ShoppingCart size={20} className="text-gray-400" />
          </div>

          <div className="mt-6 space-y-5">
            {[
              { label: "Pending", count: 18, width: "25%" },
              { label: "Processing", count: 24, width: "45%" },
              { label: "Shipped", count: 36, width: "70%" },
              { label: "Delivered", count: 82, width: "90%" },
            ].map((order) => (
              <div key={order.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">{order.label}</span>
                  <span className="font-semibold text-gray-900">
                    {order.count}
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gray-800"
                    style={{ width: order.width }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
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

          <button className="shrink-0 text-sm font-medium text-gray-700 hover:text-black">
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
              {[
                {
                  id: "#JF-1042",
                  customer: "Rahul Kumar",
                  date: "Oct 09, 2026",
                  amount: "₹4,999",
                  status: "Delivered",
                },
                {
                  id: "#JF-1041",
                  customer: "Ananya S.",
                  date: "Oct 09, 2026",
                  amount: "₹2,499",
                  status: "Processing",
                },
                {
                  id: "#JF-1040",
                  customer: "Arjun M.",
                  date: "Oct 08, 2026",
                  amount: "₹1,899",
                  status: "Pending",
                },
                {
                  id: "#JF-1039",
                  customer: "Sneha R.",
                  date: "Oct 08, 2026",
                  amount: "₹3,299",
                  status: "Delivered",
                },
              ].map((order) => (
                <tr
                  key={order.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-gray-100 text-gray-700"
                          : order.status === "Processing"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
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