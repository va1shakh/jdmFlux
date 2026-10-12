import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../redux/auth/authSlice";

export function useLogout() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
  };
  return handleLogout;
}
