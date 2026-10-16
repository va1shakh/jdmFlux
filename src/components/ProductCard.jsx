import { Heart, ShoppingCart } from "lucide-react";
import Button from "@mui/material/Button";
import { memo } from "react";

export const ProductCard = memo(function ProductCard({
  img,
  name,
  category,
  price,
  brand,
  stock,
  isWishlisted,
  onWishlistClick,
  handleCartClick,
  handleCardClick,
}) {
  return (
    <div
      onClick={handleCardClick}
      className="group relative flex max-w-[360px] min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl bg-[#f8f7f4] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Wishlist Button */}
      <button
        type="button"
        className="absolute right-4 top-4 z-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 cursor-pointer text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/70"
        onClick={(e) => {
          e.stopPropagation();
          onWishlistClick();
        }}
      >
        <Heart
          size={21}
          color="#cf2519"
          strokeWidth={2}
          fill={isWishlisted ? "#cf2519" : "none"}
        />
      </button>

      {/* Image (1:1 ratio) */}
      <div className="relative w-full overflow-hidden bg-neutral-100">
        <div className="aspect-square w-full">
          <img
            src={img}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Stock Badge */}
        <span
          className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm ${
            stock > 0
              ? "text-white/85 bg-emerald-700"
              : "text-white/85 bg-rose-600"
          }`}
        >
          {stock > 0 ? `In Stock · ${stock}` : "Out of Stock"}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Brand + Category */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            {brand}
          </span>
          <span className="rounded-full bg-black/10 px-2.5 py-0.5 text-sm font-medium text-black">
            {category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-neutral-900 transition-colors duration-200 group-hover:text-neutral-700">
          {name}
        </h3>

        {/* Price */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-black">
              Price
            </span>
            <span className="text-lg font-bold tracking-tight text-black">
              ₹{Number(price).toFixed(2)}
            </span>
          </div>

          <Button
            startIcon={<ShoppingCart size={18} />}
            className=" bg-[#0057ff]! text-[#f8f7f4]! rounded-full! px-5! py-2! normal-case! shadow-none! hover:bg-[#216cfc]!"
            onClick={(e) => {
              e.stopPropagation();
              handleCartClick();
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
})
