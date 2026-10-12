import { Outlet } from "react-router";
import MyNavbar from "../MyNavbar";

function UserLayout(){
    return (
        <div className=" bg-black min-h-screen">
          <MyNavbar/>  
          <Outlet/>
        </div>
    )
}
export default UserLayout