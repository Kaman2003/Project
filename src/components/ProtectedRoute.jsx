import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/" replace />;

  
}
