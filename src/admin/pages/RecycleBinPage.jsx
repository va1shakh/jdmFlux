import { useState } from "react";
import {
  Search,
  Trash2,
  RotateCcw,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { useRestoreProduct } from "../hooks/useRestoreProduct";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useDltProduct } from "../hooks/useDltProduct";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function RecycleBinPage() {
  const { data: allProducts = [] } = useGetProducts();
  const trashedProducts = allProducts.filter(
    (product) => product.isDeleted === true,
  );

  //restore product
  const handleRestoreProduct = useRestoreProduct();

  //delete product
  const handleDltProduct = useDltProduct();

  //pagination
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(trashedProducts?.length / pageSize);
  const paginated = trashedProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  return (
    <div className="min-h-screen bg-[#f8f7f4] p-4 text-black sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Recycle Bin
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              Manage deleted products and restore them whenever needed.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-neutral-100"
            >
              <RotateCcw size={16} />
              Restore all
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <Trash2 size={16} />
              Delete all
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  Trashed products
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  {trashedProducts.length}
                </h2>
                <p className="mt-1 text-xs text-neutral-400">
                  Products currently in the recycle bin
                </p>
              </div>

              <div className="rounded-xl bg-neutral-100 p-3">
                <Trash2 size={21} className="text-neutral-700" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-red-100 bg-red-50/60 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">
                  Permanent deletion
                </p>
                <h2 className="mt-2 text-lg font-bold text-red-900">
                  Irreversible action
                </h2>
                <p className="mt-1 text-xs leading-5 text-red-700/80">
                  Permanently deleted products cannot be recovered.
                </p>
              </div>

              <div className="rounded-xl bg-red-100 p-3">
                <AlertTriangle size={21} className="text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Products table container */}
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
          {/* Table toolbar */}
          <div className="flex flex-col gap-4 border-b border-black/5 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-semibold">Deleted products</h2>
            </div>

            <div className="relative w-full md:max-w-sm">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="search"
                placeholder="Search name, ID, category..."
                className="w-full rounded-xl border border-black/10 bg-[#fafafa] py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black/40 focus:bg-white focus:ring-2 focus:ring-black/5"
              />
            </div>
          </div>

          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="border-b border-black/5 bg-[#fafafa] text-xs text-neutral-500">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">ID</th>
                  <th className="px-3 py-3.5 font-semibold">Image</th>
                  <th className="px-4 py-3.5 font-semibold">Product name</th>
                  <th className="px-4 py-3.5 font-semibold">Category</th>
                  <th className="px-4 py-3.5 font-semibold">Price</th>
                  <th className="px-4 py-3.5 font-semibold">Brand</th>
                  <th className="px-3 py-3.5 text-center font-semibold">
                    Restore
                  </th>
                  <th className="px-3 py-3.5 text-center font-semibold">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-black/5">
                {paginated.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-neutral-50/80"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-neutral-500">
                        {product.id}
                      </span>
                    </td>

                    <td className="px-3 py-3">
                      <div className="h-12 w-14 overflow-hidden rounded-lg border border-black/5 bg-neutral-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-semibold text-neutral-900">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-neutral-400">
                        Deleted product
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs font-medium text-neutral-700">
                        {product.category}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 font-semibold">
                      {formatPrice(product.price)}
                    </td>

                    <td className="px-4 py-4 text-neutral-600">
                      {product.brand}
                    </td>

                    <td className="px-3 py-4 text-center">
                      <ConfirmDialog
                        trigger={
                          <button
                            type="button"
                            title="Restore product"
                            aria-label={`Restore ${product.name}`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
                          >
                            <RotateCcw size={14} />
                            Restore
                          </button>
                        }
                        title="Restore product ?"
                        description="This product will be restored in products page"
                        onConfirm={() => handleRestoreProduct(product.id)}
                      />
                    </td>

                    <td className="px-3 py-4 text-center">
                      <ConfirmDialog trigger={<button
                        type="button"
                        title="Permanently delete product"
                        aria-label={`Permanently delete ${product.name}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>} title="Delete Product" description="Are you sure to delete the product permanently ?" onConfirm={() => handleDltProduct(product.id)} />
                    </td>
                  </tr>
                ))}

                {/* Empty state */}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-20 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
                        {true ? (
                          <Search size={24} className="text-neutral-400" />
                        ) : (
                          <Trash2 size={24} className="text-neutral-400" />
                        )}
                      </div>

                      <h3 className="mt-4 font-semibold text-neutral-900">
                        {true
                          ? "No products found"
                          : "Your recycle bin is empty"}
                      </h3>

                      <p className="mx-auto mt-1 max-w-sm text-sm text-neutral-500">
                        {true
                          ? "Try another product name, ID, category, or brand."
                          : "Deleted products will appear here when you move them to the recycle bin."}
                      </p>

                      {true && (
                        <button
                          type="button"
                          //   onClick={() => setSearch("")}
                          className="mt-4 text-sm font-semibold underline underline-offset-4"
                        >
                          Clear search
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-black/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-neutral-500">
              Showing {page} / {totalPages} pages
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-black/10 px-3 py-2 text-xs font-medium transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={15} />
                Previous
              </button>

              {/* <span className="px-2 text-xs text-neutral-500">
                Page{" "}
                <span className="font-semibold text-black">
                  {currentPage}
                </span>{" "}
                of {totalPages}
              </span> */}

              <button
                type="button"
                disabled={page == totalPages}
                onClick={() => setPage(page + 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-black/10 px-3 py-2 text-xs font-medium transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="flex items-start gap-2 rounded-xl border border-black/5 bg-white px-4 py-3.5 text-xs leading-5 text-neutral-500">
          <AlertTriangle
            size={16}
            className="mt-0.5 shrink-0 text-neutral-500"
          />
          <p>
            <span className="font-semibold text-neutral-700">Please note:</span>{" "}
            Restoring a product returns it to your products list. Permanent
            deletion cannot be undone.
          </p>
        </div>
      </div>
    </div>
  );
}
