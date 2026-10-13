import {
  ShoppingBag,
  Clock3,
  Truck,
  CheckCircle2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useGetUsersOrders } from "../hooks/useGetUsersOrders";
import { OrdersTable } from "../components/OrderTable";
import { useDebouncing } from "../hooks/useDebouncing";
import { filterOrders } from "../api/filterOrders";

const statusItems = [
  "ALL",
  "PENDING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export function OrdersPage() {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const debSearch = useDebouncing({ search, delay: 500 });
  const { data: fullOrders = [] } = useGetUsersOrders();
  const filteredOrders = filterOrders({fullOrders, debSearch, filter});
  console.log("deb: ", debSearch)

  //pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(fullOrders.length / pageSize);
  const paginated = filteredOrders?.slice((page - 1) * pageSize, page * pageSize);

  const stats = [
    {
      label: "Total orders",
      value: fullOrders?.length,
      icon: ShoppingBag,
      color: "bg-gray-100 text-gray-800",
    },
    {
      label: "Pending",
      value: fullOrders?.filter((order) => order.status === "PENDING").length,
      icon: Clock3,
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Shipped",
      value: fullOrders?.filter((order) => order.status === "SHIPPED").length,
      icon: Truck,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Delivered",
      value: fullOrders?.filter((order) => order.status === "DELIVERED").length,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-black/10 bg-white p-5 transition hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <div className={`rounded-lg p-2 ${color}`}>
                <Icon size={19} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight text-gray-950">
              {value.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      {/* Search and filters */}
      <div className="rounded-xl border border-black/10 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order ID or customer..."
              className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {statusItems.map((statusItem) => (
              <button
                key={statusItem}
                type="button"
                aria-pressed={filter === statusItem}
                onClick={() => {
                  setFilter(statusItem);
                  setPage(1);
                }}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition cursor-pointer ${
                  statusItem === filter
                    ? "bg-[#0057ff] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {statusItem.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-950">All orders</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track customer orders
            </p>
          </div>
          <p className="whitespace-nowrap text-sm text-gray-500">
            {filteredOrders.length} orders
          </p>
        </div>

        {filteredOrders.length > 0 ? (
          <OrdersTable
            orders={paginated}
            // onViewOrder={(order) => {
            //   console.log("Selected order:", order);
            // }}
          />
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-16 text-center">
            <ShoppingBag size={32} className="mx-auto mb-3 text-gray-400" />
            <h3 className="font-semibold text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Orders will appear here when customers place them.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-end">
          {filteredOrders.length > 0 && (
            <div className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="px-2 text-sm font-medium text-gray-700">
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
