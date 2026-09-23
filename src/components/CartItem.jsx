import { Minus, Plus, Trash2 } from "lucide-react";

function CartItem({ name, brand, category, price, image }) {
  return (
    <div className="flex items-center gap-6 border-b border-zinc-800 py-6">
      {/* Image */}
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-900">
        <img src={image} alt="image" className="h-full w-full object-cover" />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-1">
        <h2 className="text-lg font-medium">{name}</h2>

        <p className="text-sm text-zinc-500">{brand}</p>

        <p className="text-sm text-zinc-600">{category}</p>

        <p className="mt-2 font-medium">${price}</p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4 rounded-lg border border-zinc-800 px-3 py-2">
        <button className="text-zinc-400 transition hover:text-white">
          <Minus size={20} />
        </button>

        <span className="w-20 text-center text-sm">quantity</span>

        <button className="text-zinc-400 transition hover:text-white">
          <Plus size={20} />
        </button>
      </div>

      {/* Total */}
      <div className="w-28 text-right">
        <p className="font-medium">total</p>
      </div>

      {/* Remove */}
      <button className="text-zinc-600 transition hover:text-white">
        <Trash2 size={20} />
      </button>
    </div>
  );
}

export default CartItem;
