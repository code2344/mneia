import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/auth/use-auth";
import AppLoading from "./app-loading";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <AppLoading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;