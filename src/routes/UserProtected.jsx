import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function UserProtected(){
    const user = useSelector((state) => state.auth.user);
    if(!user){
        return <Navigate to="/mods" replace />
    }
    else
        return <Outlet />
}
export default UserProtected