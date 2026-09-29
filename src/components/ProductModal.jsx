import { X, ShoppingCart, Star } from "lucide-react";

function ProductModal({ product, onClose, handleCartClick }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      {/* Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl bg-[black] text-white shadow-2xl">
        <div className="grid md:grid-cols-2">
          {/* ================= IMAGE ================= */}
          <div className="relative flex items-center justify-center bg-[#111315]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-10"
            />
          </div>

          {/* ================= INFO ================= */}
          <div className=" bg-[#f8f7f4] relative flex flex-col justify-between p-8 md:p-10">
            {/* close button */}
            <button
              onClick={onClose}
              className="absolute cursor-pointer right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0057ff] text-white transition hover:bg-[#1e69ff]"
            >
              <X size={18} />
            </button>
            {/* Top */}
            <div>
              <div className="mb-5 flex items-center gap-3 text-md uppercase tracking-[0.25em] text-black">
                <span>{product.category}</span>
                <span className="h-1 w-1 rounded-full bg-black/80" />
                <span>{product.brand}</span>
              </div>

              <h2 className="max-w-md text-3xl text-[#0057ff] font-bold tracking-tight md:text-4xl">
                {product.name}
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-black">
                {product.desc}
              </p>

              {/* Details */}
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden bg-[#0057ff]">
                <Info label="Vehicle" value={product.car} />
                <Info label="Category" value={product.category} />
                <Info label="Brand" value={product.brand} />
                <Info
                  label="Stock"
                  value={
                    product.stock > 0
                      ? `${product.stock} available`
                      : "Out of stock"
                  }
                />
              </div>

              {/* Rating */}
              <div className="mt-7 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={15}
                      fill={
                        star <= Math.round(product.rating)
                          ? "currentColor"
                          : "none"
                      }
                      className="text-black"
                    />
                  ))}
                </div>

                <span className="text-sm text-black/80">{product.rating}</span>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-10">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-black">
                    Price
                  </p>

                  <p className="mt-1 text-[#0057ff] text-3xl font-semibold">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>

                <span
                  className={`text-xs uppercase tracking-widest ${
                    product.stock > 0 ? "text-white" : "text-white"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Sold Out"}
                </span>
              </div>

              <button
                onClick={handleCartClick}
                disabled={product.stock <= 0}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0057ff] px-5 py-4 text-sm font-semibold text-[#f8f7f4] transition cursor-pointer hover:bg-[#206bff] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/20"
              >
                <ShoppingCart size={18} />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-[#f8f7f4] p-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#0057ff]">
        {label}
      </p>

      <p className="mt-2 truncate text-md text-black">{value}</p>
    </div>
  );
}
export default ProductModal;
