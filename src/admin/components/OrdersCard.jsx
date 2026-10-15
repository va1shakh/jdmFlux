import {
  Eye,
  Package,
  CalendarDays,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/15",
  Processing: "bg-blue-50 text-blue-700 ring-blue-600/15",
  Shipped: "bg-violet-50 text-violet-700 ring-violet-600/15",
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
};

const paymentStyles = {
  Paid: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-700",
  Refunded: "bg-slate-100 text-slate-600",
};

export function OrdersCard({ order, onViewOrder }) {
  const customerName = order?.shippingAddress?.fullName;
  const phone = order?.shippingAddress?.phone;
  const orderId = order?.id;
  const orderDate = order?.createdAt;
  const formattedDate = new Date(orderDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const total = order?.total;
  const itemCount = order?.items.length;
  const status = order?.status;
  const paymentStatus = "Unknown";

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
            <Package size={21} strokeWidth={1.8} />
          </div>

          <div className="min-w-0 pt-0.5">
            <p className="truncate text-sm font-bold tracking-tight text-gray-950 sm:text-base">
              Order #{orderId}
            </p>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset sm:text-xs ${
            statusStyles[status] || "bg-gray-100 text-gray-600 ring-gray-500/15"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mx-4 border-t border-dashed border-gray-200 sm:mx-5" />

      {/* Customer */}
      <div className="flex min-w-0 items-center gap-3 px-4 py-4 sm:px-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-sm font-bold text-blue-700">
          {customerName[0].toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900">
            {customerName}
          </p>

          <p className="mt-0.5 truncate text-xs text-gray-500 sm:text-sm">
            {phone}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="mx-4 grid grid-cols-2 gap-3 rounded-xl bg-gray-50/80 p-3 sm:mx-5 sm:gap-4 sm:p-4">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-gray-500">
            <CalendarDays size={14} className="shrink-0" />
            <span className="text-xs">Order date</span>
          </div>

          <p className="mt-2 truncate text-sm font-semibold text-gray-800">
            {formattedDate}
          </p>
        </div>

        <div className="min-w-0 border-l border-gray-200 pl-3 sm:pl-4">
          <div className="flex items-center gap-1.5 text-gray-500">
            <CreditCard size={14} className="shrink-0" />
            <span className="text-xs">Payment</span>
          </div>

          <div className="mt-1.5">
            <span
              className={`inline-flex max-w-full truncate rounded-md px-2 py-1 text-xs font-semibold ${
                paymentStyles[paymentStatus] || "bg-gray-200 text-gray-600"
              }`}
            >
              {paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 p-4 pt-5 sm:p-5">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500">Total amount</p>

          <p className="mt-1 text-lg font-bold tracking-tight text-gray-950 sm:text-xl">
            {total.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <button
          type="button"
          //   onClick={() => onViewOrder?.(order)}
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-gray-950 px-3.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98] sm:text-sm cursor-pointer"
        >
          <Eye size={16} />
          View order
          <ArrowUpRight
            size={14}
            className="text-gray-400 transition-colors group-hover:text-white"
          />
        </button>
      </div>
    </article>
  );
}
