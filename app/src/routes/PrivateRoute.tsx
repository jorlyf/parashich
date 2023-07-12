import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/index";

interface PrivateRouteProps {
  component: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {

  const { user } = useAuth();

  return (
    user !== null ? component : <Navigate replace to="/login" />
  );
}

export default PrivateRoute;
