import { X, ShoppingCart, Star } from "lucide-react";

function ProductModal({ product, onClose, handleCartClick }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-md sm:p-4">
      {/* Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 my-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-black text-white shadow-2xl sm:rounded-3xl">
        <div className="grid md:grid-cols-2">
          {/* IMAGE */}
          <div className="relative flex h-56 items-center justify-center bg-black sm:h-72 md:h-auto md:min-h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-4 sm:p-8 md:p-10"
            />
          </div>

          {/* INFO */}
          <div className="relative flex flex-col justify-between bg-[#f8f7f4] p-5 sm:p-8 md:p-10">
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close product details"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#0057ff] text-[#f8f7f4] transition hover:bg-[#3275fb] sm:right-4 sm:top-4 sm:h-10 sm:w-10"
            >
              <X size={18} />
            </button>

            {/* Top */}
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2 pr-10 text-sm uppercase tracking-[0.2em] text-black sm:gap-3 sm:text-base sm:tracking-[0.25em]">
                <span>{product.category}</span>
                <span className="h-1 w-1 rounded-full bg-black/80" />
                <span>{product.brand}</span>
              </div>

              <h2 className="max-w-md break-words text-2xl font-bold tracking-tight text-[#0057ff] sm:text-3xl md:text-4xl">
                {product.name}
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-black sm:mt-5">
                {product.desc}
              </p>

              {/* Details */}
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden bg-black/10 sm:mt-8">
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
              <div className="mt-6 flex items-center gap-2 sm:mt-7">
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
                      className="text-black/90"
                    />
                  ))}
                </div>

                <span className="text-sm text-black/80">
                  {product.rating}
                </span>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-7 sm:mt-10">
              <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-black">
                    Price
                  </p>

                  <p className="mt-1 text-2xl font-semibold text-[#0057ff] sm:text-3xl">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <span
                  className={`pb-1 text-xs uppercase tracking-widest ${
                    product.stock > 0
                      ? "text-emerald-700"
                      : "text-red-600"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Sold Out"}
                </span>
              </div>

              <button
                onClick={handleCartClick}
                disabled={product.stock <= 0}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#0057ff] px-4 py-3.5 text-sm font-semibold text-[#f8f7f4] transition hover:bg-[#0049da] disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/30 sm:px-5 sm:py-4"
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
    <div className="min-w-0 bg-[#eaf1ff] p-3 sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0057ff]">
        {label}
      </p>

      <p className="mt-2 truncate text-sm text-black">
        {value}
      </p>
    </div>
  );
}

export default ProductModal;