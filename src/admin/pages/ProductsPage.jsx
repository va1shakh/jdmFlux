import { useState } from "react";
import {
  ArrowDownUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Image as ImageIcon,
  Package,
  PencilLine,
  Search,
  SlidersHorizontal,
  Tag,
  Boxes,
  AlertTriangle,
  Delete,
  Trash,
} from "lucide-react";
import { AddProductModal } from "../components/AddProductModal";
import { EditProductModal } from "../components/EditProductModal";
import { useGetProducts } from "../../hooks/useGetProducts";
import { filterProducts } from "../../api/filterProducts";
import { useDebouncing } from "../hooks/useDebouncing";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useMoveToTrash } from "../hooks/useMoveTrash";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function ProductThumbnail({ src, name }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!src || imageFailed) {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-[#f3f2ef] text-neutral-400">
        <ImageIcon size={20} strokeWidth={1.7} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setImageFailed(true)}
      className="h-12 w-12 shrink-0 rounded-xl border border-black/[0.06] bg-[#f3f2ef] object-cover"
    />
  );
}

function StockBadge({ stock }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/10">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
        Out of stock
      </span>
    );
  }

  if (stock <= 3) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/10">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        {stock} left
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {stock} in stock
    </span>
  );
}

export function ProductsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const Dsearch = useDebouncing({ search, delay: 500 });

  //fetching products
  const { data: allProducts = [] } = useGetProducts();
  const products = allProducts.filter((product) => product.isDeleted === false);
  const filteredProducts = filterProducts({
    products,
    Dsearch,
    category,
    sort,
  });

  //pagination
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(filteredProducts?.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  //handleMoveToTrash product
  const handleMoveToTrash = useMoveToTrash();

  const totalCount = products?.length;
  const lowStockCount = products?.filter(
    (product) => product.stock <= 3 && product.stock > 0,
  ).length;
  const outofStockCount = products?.filter(
    (product) => product.stock === 0,
  ).length;

  return (
    <div className="min-h-full bg-[#f8f7f4] px-4 py-5 text-[#171717] sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Page heading */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              Products
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-neutral-500">
              Manage your catalog, update inventory, and keep your JDM parts in
              stock.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl bg-[#0057ff] px-4 text-sm font-semibold text-white shadow-sm shadow-blue-950/10 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 sm:self-auto"
          >
            <CirclePlus size={17} strokeWidth={2.2} />
            Add product
          </button>
        </div>

        {/* Summary cards */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/[0.07] bg-white p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  Total products
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">
                  {totalCount}
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  Across your catalog
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Package size={19} />
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-black/[0.07] bg-white p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  Low stock
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">
                  {lowStockCount}
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  3 units or fewer
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <AlertTriangle size={19} />
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-black/[0.07] bg-white p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  Out of stock
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">
                  {outofStockCount}
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
                <Boxes size={19} />
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 rounded-2xl border border-black/[0.07] bg-white p-3 sm:p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-sm">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, brands, IDs..."
                aria-label="Search products"
                className="h-11 w-full rounded-xl border border-black/[0.08] bg-[#fbfaf8] pl-10 pr-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <span className="hidden items-center gap-1.5 px-1 text-sm font-medium text-neutral-500 sm:inline-flex">
                <SlidersHorizontal size={15} /> Filters
              </span>
              <label className="relative block min-w-0 sm:min-w-[165px]">
                <span className="sr-only">Filter by category</span>
                <Tag
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue="all"
                  className="h-11 w-full appearance-none rounded-xl border border-black/[0.08] bg-white pl-9 pr-9 text-sm font-medium text-neutral-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="all">All categories</option>
                  <option value="Wheels">Wheels</option>
                  <option value="Exhaust">Exhaust</option>
                  <option value="Spoiler">Spoilers</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
              </label>
              <label className="relative block min-w-0 sm:min-w-[190px]">
                <span className="sr-only">Sort by price</span>
                <ArrowDownUp
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <select
                  onChange={(e) => setSort(e.target.value)}
                  defaultValue="default"
                  className="h-11 w-full appearance-none rounded-xl border border-black/[0.08] bg-white pl-9 pr-9 text-sm font-medium text-neutral-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="">Sort by price</option>
                  <option value="low">Price: low to high</option>
                  <option value="high">Price: high to low</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Products table */}
        <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
          <div className="flex flex-col gap-1 border-b border-black/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-sm font-semibold">All products</h2>
              <p className="mt-0.5 text-xs text-neutral-500">
                A quick overview of your listed inventory.
              </p>
            </div>
            <span className="mt-1 inline-flex w-fit items-center rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 sm:mt-0">
              {products?.length} items
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#fbfaf8] text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                  <th className="px-5 py-3.5 font-semibold">ID</th>
                  <th className="px-3 py-3.5 font-semibold">Image</th>
                  <th className="px-4 py-3.5 font-semibold">Product name</th>
                  <th className="px-4 py-3.5 font-semibold">Category</th>
                  <th className="px-4 py-3.5 font-semibold">Price</th>
                  <th className="px-4 py-3.5 font-semibold">Brand</th>
                  <th className="px-4 py-3.5  font-semibold">Stock status</th>
                  <th className=" py-3.5 text-center font-semibold">delete</th>
                  <th className="px-5 py-3.5 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.055]">
                {paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="group transition-colors hover:bg-[#fcfbf9]"
                  >
                    <td className="whitespace-nowrap px-5 py-3.5 text-xs font-medium tabular-nums text-neutral-500">
                      {product.id}
                    </td>
                    <td className="px-3 py-3.5">
                      <ProductThumbnail
                        src={product.image}
                        name={product.name}
                      />
                    </td>
                    <td className="max-w-[280px] px-4 py-3.5">
                      <p className="truncate text-sm font-semibold text-neutral-900">
                        {product.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-neutral-400">
                        {product.desc}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs font-medium text-neutral-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-semibold tabular-nums text-neutral-900">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-medium text-neutral-600">
                      {product.brand}
                    </td>
                    <td className="px-4 py-3.5">
                      <StockBadge stock={product.stock} />
                    </td>
                    <td className=" px-5 py-3.5">
                      <ConfirmDialog
                        trigger={
                          <button className="cursor-pointer">
                            <Trash color="#b50e02" size={23} />
                          </button>
                        }
                        title="Move to trash"
                        description="This product will be moved to Trash. you can restore it whenever you needed"
                        onConfirm={() => handleMoveToTrash(product.id)}
                      />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setProductToEdit(product)}
                        aria-label={`Edit ${product.name}`}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-black/[0.09] bg-white px-3 text-xs font-semibold text-neutral-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                      >
                        <PencilLine size={14} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination UI only */}
          <div className="flex flex-col gap-3 border-t border-black/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-neutral-500">
              Showing{" "}
              <span className="font-semibold text-neutral-800">{page}</span> of{" "}
              <span className="font-semibold text-neutral-800">
                {totalPages}
              </span>{" "}
            </p>
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                onClick={() => setPage(page - 1)}
                type="button"
                disabled={page === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.07] bg-[#0057ff] text-white disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              {/* <button type="button" aria-current="page" className="h-9 min-w-9 rounded-lg bg-[#171717] px-3 text-xs font-semibold text-white">1</button>
              <button type="button" className="h-9 min-w-9 rounded-lg border border-black/[0.07] bg-white px-3 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50">2</button>
              <button type="button" className="h-9 min-w-9 rounded-lg border border-black/[0.07] bg-white px-3 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50">3</button>
              <span className="px-1 text-sm text-neutral-400">…</span>
              <button type="button" className="h-9 min-w-9 rounded-lg border border-black/[0.07] bg-white px-3 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50">31</button> */}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                type="button"
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.07] bg-[#0057ff] text-white transition hover:bg-neutral-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditProductModal
        product={productToEdit}
        onClose={() => setProductToEdit(null)}
      />
    </div>
  );
}
