import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context";


const PrivateRoutes = () => {
  const { isLogin } = useAuth();
  const location = useLocation();

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;