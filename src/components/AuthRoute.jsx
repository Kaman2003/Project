import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AuthRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/app" replace /> : <Outlet />;
}
export default AuthRoute;
