import { Outlet } from "react-router";
// import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import { useLogout } from "../admin/hooks/useLogout";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useSelector } from "react-redux";

export default function AdminLayout() {
  const user = useSelector((state) => state.auth.user);

  //AdminInfo
  const { data: adminInfo = {} } = useGetUserInfo(user?.id);

  // logout
  const handleLogout = useLogout();

  return (
    <Sidebar adminInfo={adminInfo} onLogout={handleLogout}>
      <div className="p-4 sm:p-6 lg:p-8 bg-[#f8f7f4] border border-black/10 rounded-2xl min-h-screen">
        {/* <Header onLogout={handleLogout} /> */}
        <Outlet />
      </div>
    </Sidebar>
  );
}
