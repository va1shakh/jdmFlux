import { Heart } from "lucide-react";

export function ProductCard({
  img,
  name,
  category,
  brand,
  price,
  onWishlistClick,
}) {
  return (
    <div className="group relative aspect-square w-70 h-70 overflow-hidden rounded-2xl border border-amber-50 bg-amber-50">
      <img
        src={img}
        alt="image"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* whishlist */}
      <button
        type="button"
        className="absolute right-4 top-4 z-20 cursor-pointer text-white"
        onClick={onWishlistClick}
      >
        <Heart size={24} />
      </button>

      {/* Hover details */}
      <div
        className="absolute inset-x-5 bottom-16 z-10 text-white
                   translate-y-3 opacity-0
                   transition-all duration-300
                   group-hover:translate-y-0
                   group-hover:opacity-100"
      >
        <p className="text-sm">{category}</p>
        <h2 className="text-xl font-semibold">{brand}</h2>
        <p className="mt-1 text-sm text-white/80">{price}</p>
      </div>

      {/* Bottom section */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white">
        <h1>{name}</h1>

        <button
          type="button"
          className="h-9 w-30 cursor-pointer rounded-lg bg-[#C6F000] font-medium text-black hover:bg-[#D7FF33]"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
