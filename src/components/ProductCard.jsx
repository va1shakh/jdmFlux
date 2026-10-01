import { Heart } from "lucide-react";

export function ProductCard({
  img,
  name,
  category,
  brand,
  price,
  onWishlistClick,
  isWishlisted,
  handleCartClick,
  handleCardClick,
}) {
  return (
    <div
      className="group relative aspect-square w-70 overflow-hidden rounded-2xl border border-white/20 bg-zinc-950 shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <img
        src={img}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark hover overlay */}
      <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/50" />

      {/* Wishlist */}
      <button
        type="button"
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/70"
        onClick={(e) => {
          e.stopPropagation();
          onWishlistClick();
        }}
      >
        <Heart
          size={21}
          strokeWidth={2}
          fill={isWishlisted ? "currentColor" : "none"}
        />
      </button>

      {/* Hover Details */}
      <div
        className="
          absolute left-5 right-5 top-5 z-10
          translate-y-2 opacity-0
          transition-all duration-300
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-300">
          {category}
        </p>

        <p className="mt-1 text-sm font-medium text-white">{brand}</p>
      </div>

      {/* Bottom Content */}
      <div className="absolute inset-x-4 bottom-4 z-10">
        <div className="flex items-end justify-between gap-3">
          {/* Product information */}
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-white">
              {name}
            </h2>

            <div className="mt-2 inline-flex rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-sm">
              <span className="text-sm font-bold text-white">₹{price}</span>
            </div>
          </div>

          {/* Cart */}
          <button
            type="button"
            className="
              h-10 shrink-0 rounded-lg cursor-pointer
              bg-[#5a0303] px-4
              text-sm font-semibold text-[#f8f7f4]
              transition-all duration-200
              hover:bg-[#720303]
              hover:scale-[1.03]
              active:scale-95
            "
            onClick={(e) => {
              e.stopPropagation();
              handleCartClick();
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
