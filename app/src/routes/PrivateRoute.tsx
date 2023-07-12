import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "@hooks/index";

interface PrivateRouteProps {
  component: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {

  const { authStore } = useStore();

  const isAuthorized = authStore.isAuthorized;

  return (
    isAuthorized ? component : <Navigate replace to="/login" />
  );
}

export default PrivateRoute;
