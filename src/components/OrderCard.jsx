import OrderProductItem from "./OrderProductItem";

function OrderCard({ order, handleCancel }) {
  return (
    <article className="overflow-hidden rounded-2xl border-2 border-white/20 bg-[#111315] shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <header className="border-b-2 border-white/20 px-7 py-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">
              Ordered
            </p>

            <h2 className="text-xl font-medium tracking-tight text-[#f8f7f4]">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </h2>
          </div>

          <div className="rounded-full border border-white/80 bg-black px-3 py-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              ● {order.status}
            </p>
          </div>

          <button
            className="rounded-xl bg-[#6d0707] hover:bg-[#960707] px-3 py-2 cursor-pointer text-sm font-semibold uppercase tracking-[0.16em] text-white"
            onClick={() => handleCancel(order.id)}
          >
            Cancel
          </button>
        </div>
      </header>

      {/* Items */}
      <div className="m-4">
        {order.items.map((item) => (
          <div
            key={item.productId}
            className="group transition-colors duration-200 px-4 rounded-2xl hover:bg-[#25292e]"
          >
            <OrderProductItem item={item} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="flex items-end justify-between gap-6 bg-[#111315] px-7 py-7">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
            Items
          </p>

          <p className="mt-1 text-sm font-medium text-white/90">
            {order.items.length}{" "}
            {order.items.length === 1 ? "Product" : "Products"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
            Total
          </p>

          <p className="mt-1 text-2xl font-semibold tracking-tight text-white/90">
            ₹{order.total.toLocaleString("en-IN")}
          </p>
        </div>
      </footer>
    </article>
  );
}

export default OrderCard;
