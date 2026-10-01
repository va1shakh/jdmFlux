function OrderProductItem({ item }) {
  return (
    <div className="group grid grid-cols-[92px_1fr_auto_auto] items-center gap-6 py-5">
      {/* Product Image */}
      <div className="h-[92px] w-[92px] overflow-hidden rounded-lg bg-[#181818]">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div>
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
          {item.brand}
        </p>

        <h3 className="text-[15px] font-medium tracking-tight text-white/90">
          {item.name}
        </h3>

        <p className="mt-2 text-xs text-white/70">
          {item.category}
        </p>
      </div>

      {/* Quantity */}
      <div className="rounded-md px-3 py-2">
        <p className="text-xl font-medium text-white/90">
          × {item.quantity}
        </p>
      </div>

      {/* Price */}
      <div className="min-w-[120px] text-right">
        <p className="text-base font-semibold tracking-tight text-[#F5F5F5]">
          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
        </p>

        {/* {item.quantity > 1 && (
          <p className="mt-1 text-[10px] text-[#666]">
            ₹{item.price.toLocaleString("en-IN")} each
          </p>
        )} */}
      </div>
    </div>
  );
}

export default OrderProductItem;