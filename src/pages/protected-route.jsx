import { message } from "antd";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = Cookies.get("web-token");
  const user = JSON.parse(Cookies.get("web-user"));
  const history = useNavigate();

  useEffect(() => {
    if (user.role !== "user") {
      Cookies.remove("web-token");
      history("/login");
      message.error("Unauthorized to access this route");
    }
  }, []);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
