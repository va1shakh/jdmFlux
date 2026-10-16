import { Minus, Plus, Trash2 } from "lucide-react";

function CartItem({
  name,
  brand,
  category,
  price,
  image,
  quantity,
  onClickPlus,
  onClickMinus,
  onDltCart,
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-[#0057ff] py-5 sm:gap-6 sm:py-6 md:flex-nowrap">
      {/* Image */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-gray-500 bg-zinc-900 sm:h-28 sm:w-28">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h2 className="break-words text-base font-medium text-[#0057ff] sm:text-lg">
          {name}
        </h2>

        <p className="text-sm text-black/90">{brand}</p>

        <p className="text-sm text-black/70">{category}</p>

        <p className="mt-1 font-semibold text-black sm:mt-2 tracking-wider ">
          ₹{Number(price).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex w-fit shrink-0 items-center gap-3 rounded-3xl border border-gray-300 drop-shadow-lg px-3 py-2 sm:gap-4">
        <button
          type="button"
          aria-label="Decrease quantity"
          className="cursor-pointer text-[#0057ff] transition hover:text-[#0038a9] "
          onClick={onClickMinus}
          disabled={quantity === 1}
        >
          <Minus size={18} />
        </button>

        <span className="min-w-6 text-black text-center text-sm sm:text-base">
          {quantity}
        </span>

        <button
          type="button"
          aria-label="Increase quantity"
          className="cursor-pointer text-[#0057ff] transition hover:text-[#0038a9]"
          onClick={onClickPlus}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Remove */}
      <button
        type="button"
        aria-label={`Remove ${name} from cart`}
        className="shrink-0 cursor-pointer text-[#0057ff] transition hover:text-[#003090]"
        onClick={onDltCart}
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}

export default CartItem;