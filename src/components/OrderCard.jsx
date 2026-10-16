import ConfirmDialog from "./ConfirmDialog";
import OrderProductItem from "./OrderProductItem";

function OrderCard({ order, handleCancel }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/20 bg-[#111315] shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:rounded-2xl sm:border-2">
      {/* Header */}
      <header className="border-b border-white/20 px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          {/* Order Date */}
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">
              Ordered
            </p>

            <h2 className="text-lg font-medium tracking-tight text-[#f8f7f4] sm:text-xl">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </h2>
          </div>

          {/* Status */}
          <div className="rounded-full border border-white/80 bg-black px-3 py-1.5">
            <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              ● {order.status}
            </p>
          </div>

          {/* Cancel */}
          <div className="shrink-0">
            <ConfirmDialog
              trigger={
                <button className="cursor-pointer rounded-xl bg-[#0057ff] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#1b67ff] sm:text-sm sm:tracking-[0.16em]">
                  Cancel
                </button>
              }
              title="Cancel"
              description="Are you sure to cancel the order ?"
              notConfirmText="No"
              confirmText="Cancel"
              onConfirm={() => handleCancel(order.id)}
            />
          </div>
        </div>
      </header>

      {/* Items */}
      <div className="my-3 sm:my-4">
        {order.items.map((item) => (
          <div
            key={item.productId}
            className="group rounded-xl px-3 transition-colors duration-200 hover:bg-[#25292e] sm:mx-2 sm:rounded-2xl sm:px-4"
          >
            <OrderProductItem item={item} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="flex flex-wrap items-end justify-between gap-5 border-t border-white/10 bg-[#111315] px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
        {/* Item Count */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
            Items
          </p>

          <p className="mt-1 text-sm font-medium text-white/90">
            {order.items.length}{" "}
            {order.items.length === 1 ? "Product" : "Products"}
          </p>
        </div>

        {/* Total */}
        <div className="ml-auto text-right">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
            Total
          </p>

          <p className="mt-1 text-xl font-semibold tracking-tight text-white/90 sm:text-2xl">
            ₹{order.total.toLocaleString("en-IN")}
          </p>
        </div>
      </footer>
    </article>
  );
}

export default OrderCard;
