import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Mods = lazy(() => import("./pages/Mods"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const GuestRoute = lazy(() => import("./routes/GuestRoute"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Builds = lazy(() => import("./pages/Builds"));
const About = lazy(() => import("./pages/About"));
const Orders = lazy(() => import("./pages/Orders"));
const UserLayout = lazy(() => import("./layouts/UserLayout"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));
const UsersPage = lazy(() => import("./admin/pages/UsersPage"));
const OrdersPage = lazy(() => import("./admin/pages/OrdersPage"));
const ProductsPage = lazy(() => import("./admin/pages/ProductsPage"));
const RecycleBinPage = lazy(() => import("./admin/pages/RecycleBinPage"));

function App() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
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
              <Route path="/admin/orders" element={<OrdersPage />} />
              <Route path="/admin/products" element={<ProductsPage />} />
              <Route path="/admin/trash" element={<RecycleBinPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
