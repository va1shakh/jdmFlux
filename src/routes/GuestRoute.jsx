import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function GuestRoute(){
    const user = useSelector((state) => state.auth.user);
    if(user){
        return <Navigate to="/" replace />
    }
    return <Outlet />
}
export default GuestRoute