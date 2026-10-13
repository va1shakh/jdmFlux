import { Eye, Package } from "lucide-react";
import { useChangeStatus } from "../hooks/useChangeStatus";

const statusStyles = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/15",
  SHIPPED: "bg-violet-50 text-violet-700 ring-violet-600/15",
  DELIVERED: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  CANCELLED: "bg-red-50 text-red-700 ring-red-600/15",
};

const statuses = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

export function OrdersTable({ orders, onViewOrder }) {
const handleStatusChange = useChangeStatus();
  return (
    <div className="overflow-x-auto rounded-xl border border-black/10 bg-white shadow-sm">
      <table className="w-full min-w-[950px] text-left">
        <thead className="border-b border-gray-200 bg-gray-50/80">
          <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            <th className="px-5 py-4">Order</th>
            <th className="px-5 py-4">Customer</th>
            <th className="px-5 py-4">Items</th>
            <th className="px-5 py-4">Order date</th>
            <th className="px-5 py-4">Total</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => {
            const customerName = order?.shippingAddress?.fullName;
            const itemCount = order?.items?.length;

            const formattedDate = order?.createdAt
              ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "—";

            const total = order?.total;

            return (
              <tr
                key={order.id}
                className="transition-colors hover:bg-gray-50/80"
              >
                {/* Order ID */}
                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                      <Package size={17} />
                    </div>
                    <span className="text-sm font-semibold text-gray-950">
                      #{order.id}
                    </span>
                  </div>
                </td>

                {/* Customer */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                      {customerName[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="max-w-48 truncate text-sm font-medium text-gray-900">
                        {customerName}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {order?.shippingAddress?.phone}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Items */}
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </td>

                {/* Order date */}
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                  {formattedDate}
                </td>

                {/* Total */}
                <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-950">
                  {total.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 2,
                  })}
                </td>

                {/* Status */}
                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                      statusStyles[order.status] ||
                      "bg-gray-100 text-gray-600 ring-gray-500/15"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <select
                      value={order.status}
                    onChange={(e) => handleStatusChange({id:order.id, value:e.target.value})}
                      aria-label={`Change status for order ${order.id}`}
                      className="w-full max-w-36 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => onViewOrder?.(order)}
                      className="inline-flex h-9 items-center gap-2 rounded-lg bg-gray-950 px-3 text-sm font-medium text-white transition hover:bg-[#0057ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
