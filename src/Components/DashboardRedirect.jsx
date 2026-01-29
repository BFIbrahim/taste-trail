import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

const DashboardRedirect = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading />

  if (user?.role === "admin") {
    return <Navigate to="/dashboard/add-new-recipe" replace />;
  }

  // default for normal users
  return <Navigate to="/dashboard/overview" replace />;
};

export default DashboardRedirect;
