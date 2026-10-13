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
import { NavLink, useNavigate } from "react-router";
import Badge from "@mui/material/Badge";
import ConfirmDialog from "./components/ConfirmDialog";
import { useGetWishlist } from "./hooks/useGetWishlist";
import { useGetCart } from "./hooks/useGetCarts";
import { useGetUserInfo } from "./hooks/useGetUserInfo";
import { useEffect } from "react";

function MyNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };

  const { data: userInfo = {} } = useGetUserInfo();

  const { data: wishlists = [] } = useGetWishlist();

  //check if the user is blocked
  useEffect(() => {
    if(userInfo.status === "blocked"){
      dispatch(logout());
    localStorage.removeItem("user");
    navigate("login");
    }
    
  },[userInfo.status, dispatch, navigate])

  const wishlistCount = wishlists?.length;

  const { data: carts = [] } = useGetCart();
  console.log(userInfo);

  const cartCount = carts?.length;

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Mods",
      link: "/mods",
    },
    {
      name: "Builds",
      link: "/builds",
    },
    {
      name: "About",
      link: "/about",
    },
  ];

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo title="JDMflux" logo={logo} />

        <NavItems items={navItems} />

        <div className="relative z-20 ml-auto flex items-center gap-3">
          {/* wishlist-cart-orders */}
          {user?.role === 'customer' && (
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
          {user?.role === 'customer' ? (
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
    </Navbar>
  );
}

export default MyNavbar;
