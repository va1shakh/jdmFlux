import { useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Search,
  CalendarDays,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { UserCard } from "../components/UserCard";
import { useGetUsers } from "../hooks/useGetUsers";
import { useDebouncing } from "../hooks/useDebouncing";
import { filter_sort_users } from "../api/filter_sort_users";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  // debouncing
  const debSearch = useDebouncing({ search, delay: 500 });

  const { data: users = [], isLoading, error } = useGetUsers();

  //filterd Sorted Users
  const filteredUsers = filter_sort_users({ users, debSearch, filter, sort });

  const stats = [
    {
      label: "Total users",
      value: users?.length,
      Icon: Users,
    },
    {
      label: "Active users",
      value: users?.filter((user) => user.status === "active")?.length,
      Icon: UserCheck,
    },
    {
      label: "Blocked users",
      value: users?.filter((user) => user.status === "blocked")?.length,
      Icon: UserX,
    },
  ];

  //   pagination
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(users?.length / pageSize);
  const paginatedUsers = filteredUsers?.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <section className="w-full min-w-0 space-y-6 text-slate-900 py-6">
      {/* Summary */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map(({ label, value, Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-3xl border border-gray-300 bg-white p-4 drop-shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Icon size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-0.5 text-2xl font-semibold tabular-nums">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Users panel */}
      <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white drop-shadow-lg">
        <div className="space-y-4 border-b border-slate-200 p-4 sm:p-5">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All users", value: "all" },
              { label: "Blocked", value: "blocked" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setFilter(tab.value)}
                aria-pressed={filter === tab.value}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  filter === tab.value
                    ? "bg-[#0057ff] text-[#f8f7f4]"
                    : "text-black/80 hover:bg-blue-100"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-90">
                  {tab.value === "all" ? stats[0].value : stats[2].value}
                </span>
              </button>
            ))}
          </div>

          {/* Search and sorting */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative min-w-0 flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email or ID..."
                aria-label="Search users"
                className="w-full border border-black/30 rounded-xl py-2.5 pl-9 pr-3 text-sm outline-none"
              />
            </label>

            <label className="flex shrink-0 items-center gap-2 rounded-xl border border-black/30 px-3 text-sm text-slate-600">
              <CalendarDays size={16} />
              <span>Joined:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort by join date"
                className="min-w-0 bg-transparent py-2.5 font-medium text-slate-800 outline-none"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
              <ArrowUpDown size={14} />
            </label>
          </div>
        </div>

        {/* User cards */}
        <div className="grid grid-cols-1 gap-3 p-3 lg:grid-cols-2 lg:p-5">
          {paginatedUsers?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}

          {paginatedUsers.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-slate-500">
              No users found. Try changing your search or filter.
            </p>
          )}
        </div>

        {/* Pagination */}
        <footer className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-800">{page}</span>{" "}
            of{" "}
            <span className="font-medium text-slate-800">
              {filteredUsers.length}
            </span>{" "}
            users
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-[#0057ff] px-3 py-2 text-sm text-[#f8f7f4]"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span className="px-2 text-sm tabular-nums text-black">{page}</span>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-[#0057ff] px-3 py-2 text-sm text-[#f8f7f4]"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
