import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "@hooks/index";
import { HomePage, AuthPage } from "@pages/index";

const NavRoutes: React.FC = () => {

  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user === null ? <AuthPage /> : <Navigate replace to="/" />}
      />

      <Route
        index
        element={<PrivateRoute component={<HomePage />} />}
      />
    </Routes>
  );
}

export default NavRoutes;
