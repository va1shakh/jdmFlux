import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function GuestRoute(){
    const user = useSelector((state) => state.auth.user);
    if(user?.role == 'customer'){
        return <Navigate to="/" replace />
    }
    else if(user?.role == 'admin'){
        return <Navigate to="/admin" replace />
    }
    return <Outlet />
}
export default GuestRoute