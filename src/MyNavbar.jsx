import {
  Navbar,
  NavBody,
  NavbarLogo,
  NavItems,
  NavbarButton,
} from "./components/Navbar";
import logo from "./assets/logo.png";
import { logout } from "./redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Package } from "lucide-react";
import { NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "./api/wishlist/getWishlist";

function MyNavbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };
  const { data } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: () => getWishlist(user.id),
    enabled: !!user
  }) 
  const wishlistCount = data?.length;
  console.log(wishlistCount);
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Cars",
      link: "/cars",
    },
    {
      name: "Mods",
      link: "/mods",
    },
    {
      name: "Builds",
      link: "/builds",
    },
  ];

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo title="JDMflux" logo={logo} />

        <NavItems items={navItems} />

        <div className="relative z-20 ml-auto flex items-center gap-3">
          {/* wishlist-cart-orders */}
          <div className="flex items-center gap-7">
            <NavLink to="/wishlist" title="Wishlist">
              <Heart color="#ffffff" size={20} />
            </NavLink>

            <NavLink to="/cart" title="Cart">
              <ShoppingCart color="#ffffff" size={20} />
            </NavLink>

            <NavLink to="/orders" title="Orders">
              <Package color="#ffffff" size={20} />
            </NavLink>
          </div>
          {user ? (
            <div className="flex items-center gap-4 ml-5">
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-semibold text-black">
                {user.username[0].toUpperCase()}
              </div>

              {/* Username */}
              <span className="text-lg text-white">{user.username}</span>
              {/* logout button */}
              <button
                className="px-4 py-2 rounded-xl bg-white button text-black text-xl font-medium relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center"
                onClick={handleLogout}
              >
                Logout
              </button>
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
    </Navbar>
  );
}

export default MyNavbar;
