import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
  X,
} from "lucide-react";

function Header({
  title = "Dashboard",
  subtitle = "Welcome back! Here's your store overview.",
  adminName = "Admin",
  adminEmail = "admin@jdmflux.com",
  onLogout,
  onProfileClick,
  onSettingsClick,
  onSearch,
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(searchValue.trim());
  };

  return (
    <header className="sticky top-0 z-30 w-full drop-shadow-lg rounded-2xl bg-white">
      <div className="flex min-h-[72px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

        {/* Left section */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
              {title}
            </h1>

            <p className="hidden truncate text-xs text-neutral-500 sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">

          {/* Desktop search */}
          <form
            onSubmit={handleSearch}
            className="relative hidden md:block"
          >
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search anything..."
              aria-label="Search anything"
              className="h-10 w-52 rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white lg:w-64"
            />
          </form>

          {/* Mobile search */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label={searchOpen ? "Close search" : "Open search"}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition hover:bg-neutral-100 hover:text-black md:hidden"
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition hover:bg-neutral-100 hover:text-black"
            >
              <Bell size={19} />

              {/* Unread indicator */}
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-neutral-900 ring-2 ring-white" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl sm:w-80">
                <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Notifications
                  </h3>

                  <span className="text-xs text-neutral-500">
                    Recent updates
                  </span>
                </div>

                <div className="px-4 py-8 text-center">
                  <Bell
                    size={22}
                    className="mx-auto mb-2 text-neutral-400"
                  />
                  <p className="text-sm font-medium text-neutral-700">
                    You're all caught up
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    New store updates will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="mx-1 hidden h-8 w-px bg-neutral-200 sm:block" />

          {/* Admin profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              aria-expanded={profileOpen}
              aria-label="Open admin menu"
              className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-neutral-100 sm:gap-3 sm:px-2"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0057ff] text-sm font-semibold text-white">
                {adminName.charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left sm:block">
                <p className="max-w-28 truncate text-sm font-medium text-neutral-900">
                  {adminName}
                </p>
                <p className="max-w-28 truncate text-xs text-neutral-500">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`hidden text-neutral-500 transition-transform sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-black/20 bg-white shadow-neutral-950/10">
                <div className="border-b border-neutral-100 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {adminName}
                  </p>
                  <p className="truncate text-xs text-neutral-500">
                    {adminEmail}
                  </p>
                </div>

                <div className="p-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      onProfileClick?.();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-700 transition hover:bg-neutral-100"
                  >
                    <UserRound size={17} />
                    My Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      onSettingsClick?.();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-700 transition hover:bg-neutral-100"
                  >
                    <Settings size={17} />
                    Settings
                  </button>

                  <div className="my-1 border-t border-neutral-100" />

                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 cursor-pointer"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expandable mobile search */}
      {searchOpen && (
        <form
          onSubmit={handleSearch}
          className="border-t border-neutral-100 px-4 py-3 md:hidden"
        >
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="search"
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products, orders, users..."
              aria-label="Search products, orders, and users"
              className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm outline-none focus:border-neutral-400 focus:bg-white"
            />
          </div>
        </form>
      )}
    </header>
  );
}
export default Header
