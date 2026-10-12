import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  ChevronDown,
  LogOut,
  Menu,
  X,
  PanelLeft,
  PanelLeftClose,
} from "lucide-react";
import { useNavigate } from "react-router";

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    url: "/admin/orders",
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    url: "/admin/users",
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    url: "/admin/products",
  },
];

export default function Sidebar({
  children,
  siteName = "JDMFLUX",
  adminName = "Vaishakh",
  adminEmail = "admin@jdmflux.com",
  defaultActive = "dashboard",
  onNavigate,
  onLogout,
}) {
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 767px)");

  const [desktopHovered, setDesktopHovered] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);

  const desktopExpanded = sidebarPinned || desktopHovered;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(defaultActive);

  const initials =
    adminName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AD";

  const handleNavigation = (id) => {
    setActiveItem(id);
    setProfileOpen(false);
    onNavigate?.(id);

    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    setProfileOpen(false);
    onLogout?.();
  };

  const renderDrawerContent = (expanded, mobile = false) => (
    <div
      className={`flex h-full flex-col bg-[#f8f7f4] text-neutral-900 ${
        expanded ? "w-64" : "w-[76px]"
      }`}
    >
      {/* Brand */}
      <div
        className={`flex h-20 shrink-0 items-center ${
          expanded ? "justify-between px-4" : "justify-center px-3"
        }`}
      >
        <div
          className={`flex min-w-0 items-center ${
            expanded ? "gap-3" : "justify-center"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white">
            <img src="/images/logo.png" className="w-8 h-8" />
          </div>

          {expanded && (
            <div className="min-w-0">
              <h2 className="truncate text-base font-bold tracking-tight">
                {siteName}
              </h2>
            </div>
          )}
          {expanded && !mobile && (
            <div className="flex ml-10 mt-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setSidebarPinned((current) => !current);
                  setProfileOpen(false);
                }}
                aria-label={sidebarPinned ? "Unpin sidebar" : "Pin sidebar"}
                aria-pressed={sidebarPinned}
                title={sidebarPinned ? "Unpin sidebar" : "Pin sidebar"}
                className={`flex h-9 w-9 shrink-0 items-start justify-center rounded-lg transition-colors ${
                  sidebarPinned
                    ? "text-neutral-950"
                    : "text-neutral-400 hover:text-neutral-950"
                }`}
              >
                {sidebarPinned ? (
                  <PanelLeftClose size={25} />
                ) : (
                  <PanelLeft size={25} />
                )}
              </button>
            </div>
          )}
        </div>

        {mobile && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="rounded-3xl p-2 cursor-pointer text-black/70 transition hover:text-black"
          >
            <X size={23} />
          </button>
        )}
      </div>

      <div className="mx-4 border-t border-neutral-200" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                type="button"
                title={!expanded ? item.label : undefined}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  setActiveItem(item.id);
                  navigate(item.url);
                }}
                className={`group flex h-11 w-full items-center rounded-xl text-sm font-medium transition-colors duration-150 ${
                  expanded ? "gap-3 px-3" : "justify-center px-0"
                } ${
                  isActive
                    ? "bg-[#0057ff] text-[#f8f7f4] shadow-sm"
                    : "text-neutral-500 hover:bg-[#d2e1ff] hover:text-neutral-950"
                }`}
              >
                <Icon size={19} strokeWidth={1.8} className="shrink-0" />

                {expanded && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom profile section */}
      <div className="relative shrink-0  border-t border-neutral-200 p-3">
        {profileOpen && (
          <div className="absolute bottom-full left-3 right-3 z-50 mb-2 overflow-hidden rounded-xl border border-black/20 bg-white p-2 shadow-xl shadow-neutral-950/10">
            <div className="px-3 py-3">
              <p className="truncate text-sm font-semibold text-neutral-900">
                {adminName}
              </p>
              <p className="mt-1 truncate text-xs text-neutral-500">
                {adminEmail}
              </p>
            </div>

            <div className="my-1 border-t border-neutral-100" />

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-red-700 transition hover:bg-red-50 cursor-pointer"
            >
              <LogOut size={17} strokeWidth={1.8} />
              <span>Log out</span>
            </button>
          </div>
        )}

        <button
          type="button"
          title={!expanded ? adminName : undefined}
          aria-expanded={profileOpen}
          onClick={() => setProfileOpen((current) => !current)}
          className={`flex min-h-12 w-full items-center rounded-xl transition-colors hover:bg-neutral-100 ${
            expanded ? "gap-3 px-2" : "justify-center px-0"
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0057ff] text-xs font-bold text-[#f8f7f4] ring-1 ring-neutral-300">
            {initials}
          </div>

          {expanded && (
            <>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-semibold text-neutral-900">
                  {adminName}
                </p>
                <p className="truncate text-xs text-neutral-500">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`shrink-0 text-neutral-400 transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900">
      {/* Desktop sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          onMouseEnter={() => setDesktopHovered(true)}
          onMouseLeave={() => {
            setDesktopHovered(false);
            setProfileOpen(false);
          }}
          sx={{
            width: desktopExpanded ? 256 : 76,
            flexShrink: 0,
            whiteSpace: "nowrap",

            // Animate the space occupied by the sidebar
            transition: "width 220ms cubic-bezier(0.2, 0, 0, 1)",

            "& .MuiDrawer-paper": {
              width: desktopExpanded ? 256 : 76,
              boxSizing: "border-box",
              overflowX: "hidden",
              borderRight: "1px solid #e5e5e5",
              backgroundColor: "#ffffff",

              // Animate the visible sidebar
              transition: "width 220ms cubic-bezier(0.2, 0, 0, 1)",
            },
          }}
        >
          {renderDrawerContent(desktopExpanded)}
        </Drawer>
      )}

      {/* Mobile sidebar */}
      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={() => {
            setMobileOpen(false);
            setProfileOpen(false);
          }}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: 256,
              boxSizing: "border-box",
              overflowX: "hidden",
              borderRight: "1px solid #e5e5e5",
              backgroundColor: "#ffffff",
            },
          }}
        >
          {renderDrawerContent(true, true)}
        </Drawer>
      )}

      {/* Main page */}
      <div className="min-w-0 flex-1">
        {/* Mobile topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-neutral-200 bg-white/95 px-4 backdrop-blur md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 transition hover:bg-neutral-100"
          >
            <Menu size={22} />
          </button>

          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-950 text-white">
              <img src="/images/logo.png" className="w-8 h-8" />
            </div>

            <span className="truncate text-lg font-bold tracking-widest">
              JDMflux
            </span>
          </div>
        </header>

        {/* Render your dashboard page here */}
        <main className="min-h-screen p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
