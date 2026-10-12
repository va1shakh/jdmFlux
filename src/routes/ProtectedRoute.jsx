import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute({allowedRole}){
    const user = useSelector((state) => state.auth.user);
    if(!user){
        return <Navigate to="/login" replace />
    }
    if(allowedRole !== user.role){
        return <Navigate to="/" replace />
    }
    return <Outlet />
}