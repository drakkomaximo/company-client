import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils";

const ProtectedRoute = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <h1>Loading...</h1>;
  if (!isLoading && !isAuthenticated)
    return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
