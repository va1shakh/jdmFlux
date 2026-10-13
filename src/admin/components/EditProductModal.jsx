import { useState } from "react";
import {
  BadgeCheck,
  Boxes,
  Image as ImageIcon,
  PencilLine,
  X,
} from "lucide-react";
import { useEditProduct } from "../hooks/useEditProduct";

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-black/[0.09] bg-[#fcfbf9] px-3.5 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

function ProductImage({ src, name }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-black/[0.06] bg-[#f3f2ef] text-neutral-400">
        <ImageIcon size={25} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="h-16 w-16 shrink-0 rounded-2xl border border-black/[0.06] bg-[#f3f2ef] object-cover"
    />
  );
}

export function EditProductModal({ product, onClose }) {
  const [formData, setFormData] = useState({
    stock: product?.stock,
    price: product?.price,
  });
  const handleEditProduct = useEditProduct(onClose);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/55 p-3 backdrop-blur-[3px] sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-product-title"
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/20 sm:rounded-3xl"
      >
        <header className="flex items-start justify-between border-b border-black/[0.07] px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <PencilLine size={20} strokeWidth={1.8} />
            </span>
            <div>
              <h2
                id="edit-product-title"
                className="text-lg font-semibold tracking-tight text-neutral-900"
              >
                Edit product
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit product modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X size={19} />
          </button>
        </header>

        <form
          onSubmit={(e) =>
            handleEditProduct({
              e,
              id: product.id,
              stock: formData.stock,
              price: formData.price,
            })
          }
        >
          <div className="space-y-6 p-5 sm:p-6">
            <div className="flex items-center gap-3.5 rounded-2xl border border-black/[0.07] bg-[#fbfaf8] p-3.5">
              <ProductImage src={product.image} name={product.name} />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-white px-2 py-1 text-[10px] font-semibold tracking-wide text-neutral-500 ring-1 ring-inset ring-black/[0.07]">
                    {product.id}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                    <BadgeCheck size={12} /> Listed
                  </span>
                </div>
                <h3 className="truncate text-sm font-semibold text-neutral-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  {product.brand}{" "}
                  <span className="mx-1 text-neutral-300">/</span>{" "}
                  {product.category}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold text-neutral-700">
                  Price (INR)
                </span>
                <div className="relative mt-1.5">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-neutral-500">
                    ₹
                  </span>
                  <input
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    key={`${product.id}-price`}
                    type="number"
                    min="0"
                    name="price"
                    defaultValue={product.price}
                    className={`${fieldClassName} mt-0 pl-8 tabular-nums`}
                  />
                </div>
                <span className="mt-1.5 block text-xs text-neutral-400">
                  Set the current selling price.
                </span>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-neutral-700">
                  Stock quantity
                </span>
                <div className="relative mt-1.5">
                  <Boxes
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        stock: e.target.value,
                      }))
                    }
                    key={`${product.id}-stock`}
                    type="number"
                    min="0"
                    name="stock"
                    defaultValue={product.stock}
                    className={`${fieldClassName} mt-0 pl-9 tabular-nums`}
                  />
                </div>
                <span className="mt-1.5 block text-xs text-neutral-400">
                  Set the available units.
                </span>
              </label>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-amber-100 bg-amber-50/70 p-3.5">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <p className="text-xs leading-5 text-amber-900/80">
                Changing stock to <span className="font-semibold">0</span> will
                mark this product as out of stock in the inventory list.
              </p>
            </div>
          </div>

          <footer className="flex flex-col-reverse gap-2.5 border-t border-black/[0.07] bg-[#fdfcfb] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-black/[0.09] bg-white px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0057ff] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            >
              <PencilLine size={15} /> Save changes
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
