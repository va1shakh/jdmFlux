function OrderProductItem({ item }) {
  return (
    <div className="group grid grid-cols-[64px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-b border-white/10 py-4 sm:grid-cols-[80px_minmax(0,1fr)_auto] sm:gap-5 sm:py-5 lg:grid-cols-[92px_minmax(0,1fr)_auto_auto] lg:gap-6">
      {/* Product Image */}
      <div className="h-16 w-16 overflow-hidden rounded-lg bg-[#181818] sm:h-20 sm:w-20 lg:h-[92px] lg:w-[92px]">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="min-w-0">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
          {item.brand}
        </p>

        <h3 className="break-words text-sm font-medium tracking-tight text-white/90 sm:text-[15px]">
          {item.name}
        </h3>

        <p className="mt-2 text-xs text-white/70">{item.category}</p>
      </div>

      {/* Quantity */}
      <div className="col-start-2 row-start-2 justify-self-start rounded-md py-1 sm:col-start-3 sm:row-start-1 sm:justify-self-end sm:px-2 sm:py-2 lg:px-3">
        <p className="text-base font-medium text-white/90 sm:text-lg lg:text-xl">
          × {item.quantity}
        </p>
      </div>

      {/* Price */}
      <div className="col-start-1 row-start-2 self-center sm:col-start-2 sm:row-start-2 lg:col-start-4 lg:row-start-1 lg:min-w-[120px] lg:text-right">
        <p className="text-sm font-semibold tracking-tight text-[#F5F5F5] sm:text-base">
          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}

export default OrderProductItem;
