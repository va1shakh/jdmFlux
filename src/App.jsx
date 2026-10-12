import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Mods from "./pages/Mods";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuestRoute from "./routes/GuestRoute";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Builds from "./pages/Builds";
import About from "./pages/About";
import UserLayout from "./layouts/UserLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Dashboard } from "./admin/pages/Dashboard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Products } from "./admin/pages/Products";
import {Orders} from "./admin/pages/Orders"
import { UsersPage } from "./admin/pages/UsersPage";

function App() {
  return (
    <>
      <Routes>
        {/* User side */}
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mods" element={<Mods />} />
          <Route path="/builds" element={<Builds />} />

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="customer" />}>
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>

        {/* Adming side */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
