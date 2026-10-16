import {
  Navbar,
  NavBody,
  NavbarLogo,
  NavItems,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "./components/Navbar";

import logo from "./assets/logo.png";
import { logout } from "./redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Package } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import Badge from "@mui/material/Badge";
import ConfirmDialog from "./components/ConfirmDialog";
import { useGetWishlist } from "./hooks/useGetWishlist";
import { useGetCart } from "./hooks/useGetCarts";
import { useGetUserInfo } from "./hooks/useGetUserInfo";
import { useEffect, useState } from "react";

function MyNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Added only for the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };

  const { data: userInfo = {} } = useGetUserInfo();

  const { data: wishlists = [] } = useGetWishlist();

  // Original blocked-user logic
  useEffect(() => {
    if (userInfo.status === "blocked") {
      dispatch(logout());
      localStorage.removeItem("user");
      navigate("login");
    }
  }, [userInfo.status, dispatch, navigate]);

  const wishlistCount = wishlists?.length;

  const { data: carts = [] } = useGetCart();

  const cartCount = carts?.length;

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Mods", link: "/mods" },
    { name: "Builds", link: "/builds" },
    { name: "About", link: "/about" },
  ];

  return (
    <Navbar>
      {/* DESKTOP NAVBAR — your original JSX */}
      <NavBody>
        <NavbarLogo title="JDMflux" logo={logo} />

        <NavItems items={navItems} />

        <div className="relative z-20 ml-auto flex items-center gap-3">
          {/* wishlist-cart-orders */}
          {user?.role === "customer" && (
            <div className="flex items-center gap-7">
              <NavLink to="/wishlist" title="Wishlist">
                <Badge badgeContent={wishlistCount} color="primary">
                  <Heart color="#ffffff" size={20} />
                </Badge>
              </NavLink>

              <NavLink to="/cart" title="Cart">
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCart color="#ffffff" size={20} />
                </Badge>
              </NavLink>

              <NavLink to="/orders" title="Orders">
                <Package color="#ffffff" size={20} />
              </NavLink>
            </div>
          )}

          {user?.role === "customer" ? (
            <div className="flex items-center gap-4 ml-5">
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0057ff] text-xl font-semibold text-[#f8f7f4]">
                {userInfo?.username?.[0]?.toUpperCase()}
              </div>

              {/* Username */}
              <span className="text-lg text-white/90">
                {userInfo?.username}
              </span>

              {/* logout button */}
              <ConfirmDialog
                trigger={
                  <button className="px-4 py-2 rounded-xl bg-[#0057ff] button text-white/90 text-xl font-medium relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center">
                    Logout
                  </button>
                }
                title="Logout"
                description="Are you sure want to logout ?"
                confirmText="Logout"
                onConfirm={handleLogout}
              />
            </div>
          ) : (
            <>
              <NavbarButton href="/login" variant="secondary">
                Login
              </NavbarButton>

              <NavbarButton href="/register" variant="primary">
                Register
              </NavbarButton>
            </>
          )}
        </div>
      </NavBody>

      {/* MOBILE NAVBAR — newly added */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo title="JDMflux" logo={logo} />

          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          className="border border-white/10 bg-neutral-950 text-white"
        >
          {/* Main navigation */}
          {navItems.map((item) => (
            <NavLink
              key={item.link}
              to={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `w-full rounded-lg px-3 py-2 transition ${
                  isActive
                    ? "bg-white/10 text-blue-300"
                    : "text-white hover:bg-white/5"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Customer links */}
          {user?.role === "customer" && (
            <>
              <div className="my-2 w-full border-t border-white/10" />

              <NavLink
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/5"
              >
                <Badge badgeContent={wishlistCount} color="primary">
                  <Heart color="#ffffff" size={20} />
                </Badge>
                Wishlist
              </NavLink>

              <NavLink
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/5"
              >
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCart color="#ffffff" size={20} />
                </Badge>
                Cart
              </NavLink>

              <NavLink
                to="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/5"
              >
                <Package size={20} />
                Orders
              </NavLink>

              <div className="my-2 w-full border-t border-white/10" />

              <div className="flex items-center gap-3 px-3 py-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0057ff] text-xl font-semibold text-white">
                  {userInfo?.username?.[0]?.toUpperCase()}
                </div>

                <span className="min-w-0 truncate text-white/90">
                  {userInfo?.username}
                </span>
              </div>

              <ConfirmDialog
                trigger={
                  <button className="w-full rounded-xl bg-[#0057ff] px-4 py-2 text-white transition hover:bg-blue-700">
                    Logout
                  </button>
                }
                title="Logout"
                description="Are you sure want to logout ?"
                confirmText="Logout"
                onConfirm={handleLogout}
              />
            </>
          )}

          {/* Login/register — original condition preserved */}
          {user?.role !== "customer" && (
            <div className="flex w-full flex-col gap-3 border-t border-white/10 pt-3">
              <NavbarButton
                href="/login"
                variant="secondary"
                className="w-full"
              >
                Login
              </NavbarButton>

              <NavbarButton
                href="/register"
                variant="primary"
                className="w-full"
              >
                Register
              </NavbarButton>
            </div>
          )}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

export default MyNavbar;