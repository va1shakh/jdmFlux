import { Route, Routes } from "react-router";
import MyNavbar from "./MyNavbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Mods from "./pages/Mods";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuestRoute from "./routes/GuestRoute";
import Wishlist from "./pages/Wishlist";
import UserProtected from "./routes/UserProtected";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Builds from "./pages/Builds";

function App() {
  return (
    <div className=" bg-[#000000] min-h-screen">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/mods" element={<Mods />} />
        <Route path="/builds" element={<Builds/>}/>

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<UserProtected />}>
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders/>} />
        </Route>

      </Routes>
    </div>
  );
}
export default App;
