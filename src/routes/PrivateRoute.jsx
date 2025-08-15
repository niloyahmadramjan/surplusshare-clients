import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const location = useLocation();

  if (loader) {
    return <span className="loading loading-spinner"></span>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to='/login'></Navigate>;
  }

  return children;
};

export default PrivateRoute;
