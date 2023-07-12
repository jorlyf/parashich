import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import useAuth from "@hooks/useAuth";
import LoginPage from "@pages/LoginPage";
import HomePage from "@pages/HomePage";

const NavRoutes: React.FC = () => {

  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user === null ? <LoginPage /> : <Navigate replace to="/" />}
      />

      <Route
        index
        element={<PrivateRoute component={<HomePage />} />}
      />
    </Routes>
  );
}

export default NavRoutes;
