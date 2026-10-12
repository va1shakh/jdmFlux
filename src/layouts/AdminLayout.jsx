import { Outlet } from "react-router";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import { useLogout } from "../admin/hooks/useLogout";

export function AdminLayout() {
  // logout
  const handleLogout = useLogout();

  return (
    <Sidebar onLogout={handleLogout}>
      <div className="p-4 sm:p-6 lg:p-8 bg-[#f8f7f4] border border-black/10 rounded-2xl min-h-screen">
        <Header onLogout={handleLogout} />
        <Outlet />
      </div>
    </Sidebar>
  );
}
