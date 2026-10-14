import {
  ArrowUpFromLine,
  CarFront,
  Image as ImageIcon,
  PackagePlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAddProduct } from "../hooks/useAddProduct";

const inputClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-black/[0.09] bg-[#fcfbf9] px-3.5 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";
const labelClassName = "text-xs font-semibold text-neutral-700";

export function AddProductModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    category: "",
    car: "",
    brand: "",
    image: "",
    stock: "",
    isDeleted: false
  });

  const handleAddProduct = useAddProduct(onClose);

  if (!isOpen) return null;

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
        aria-labelledby="add-product-title"
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#fff] shadow-2xl shadow-black/20 sm:rounded-3xl"
      >
        <header className="flex items-start justify-between border-b border-black/[0.07] px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <PackagePlus size={21} strokeWidth={1.8} />
            </span>
            <div>
              <h2
                id="add-product-title"
                className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl"
              >
                Add a product
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Add a new part or upgrade to your JDMFLUX catalog.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close add product modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X size={19} />
          </button>
        </header>

        <form
          onSubmit={(e) => handleAddProduct(e, formData)}
          className="min-h-0 overflow-y-auto"
        >
          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-8">
            <div className="space-y-6">
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-5 w-1 rounded-full bg-[#0057ff]" />
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Product information
                  </h3>
                </div>
                <div className="space-y-4">
                  <label className="block">
                    <span className={labelClassName}>
                      Product name <span className="text-rose-500">*</span>
                    </span>
                    <input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                      minLength={5}
                      maxLength={20}
                      placeholder="e.g. R34 TE37 Wheels"
                      className={inputClassName}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClassName}>Description</span>
                    <textarea
                      value={formData.desc}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          desc: e.target.value,
                        }))
                      }
                      required
                      minLength={5}
                      maxLength={35}
                      rows={3}
                      placeholder="Describe the product, finish, fitment, or key details..."
                      className="mt-1.5 w-full resize-y rounded-xl border border-black/[0.09] bg-[#fcfbf9] px-3.5 py-3 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className={labelClassName}>
                        Category <span className="text-rose-500">*</span>
                      </span>
                      <select
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        required
                        defaultValue=""
                        className={inputClassName}
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        <option value="Wheels">Wheels</option>
                        <option value="Exhaust">Exhaust</option>
                        <option value="Spoiler">Spoiler</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className={labelClassName}>
                        Brand <span className="text-rose-500">*</span>
                      </span>
                      <input
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            brand: e.target.value,
                          }))
                        }
                        required
                        minLength={2}
                        maxLength={10}
                        name="brand"
                        placeholder="e.g. RAYS"
                        className={inputClassName}
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className={labelClassName}>
                      Compatible car / fitment
                    </span>
                    <span className="relative mt-1.5 block">
                      <CarFront
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                      />
                      <input
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            car: e.target.value,
                          }))
                        }
                        value={formData.car}
                        required
                        minLength={2}
                        maxLength={15}
                        placeholder="e.g. Nissan Skyline GT-R R34"
                        className={`${inputClassName} mt-0 pl-10`}
                      />
                    </span>
                  </label>
                </div>
              </section>

              <section>
                <div className="mb-4 flex items-center gap-2"></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClassName}>
                      Price (INR) <span className="text-rose-500">*</span>
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
                        required
                        min="0"
                        type="number"
                        name="price"
                        placeholder="185000"
                        className={`${inputClassName} mt-0 pl-8 tabular-nums`}
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className={labelClassName}>
                      Stock quantity <span className="text-rose-500">*</span>
                    </span>
                    <input
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          stock: e.target.value,
                        }))
                      }
                      required
                      min="0"
                      type="number"
                      name="stock"
                      placeholder="4"
                      className={`${inputClassName} tabular-nums`}
                    />
                  </label>
                </div>
              </section>
            </div>

            <aside className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">
                  Product image
                </h3>
              </div>
              <div className="flex min-h-[175px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-[#fbfaf8] px-4 py-6 text-center">
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/[0.06] bg-white text-neutral-500 shadow-sm">
                  <ImageIcon size={22} strokeWidth={1.6} />
                </span>
                <p className="text-sm font-semibold text-neutral-800">
                  Image preview
                </p>
                <p className="mt-1 max-w-[190px] text-xs leading-5 text-neutral-500">
                  Your product image will appear here once connected.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-xs font-medium text-neutral-600">
                  <ArrowUpFromLine size={13} /> Image URL / path
                </span>
              </div>
              <label className="block">
                <span className={labelClassName}>Image path or URL</span>
                <input
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  required
                  name="image"
                  placeholder="/products/r34-wheels.png"
                  className={inputClassName}
                />
              </label>
              <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3.5">
                <p className="text-xs font-semibold text-blue-900">
                  Tip: Use 1024 x 1024 resolution image
                </p>
              </div>
            </aside>
          </div>

          <footer className="flex flex-col-reverse gap-2.5 border-t border-black/[0.07] bg-[#fdfcfb] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-xs text-neutral-400">
              <span className="text-rose-500">*</span> Required fields
            </p>
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
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
                <PackagePlus size={16} /> Add product
              </button>
            </div>
          </footer>
        </form>
      </section>
    </div>
  );
}
