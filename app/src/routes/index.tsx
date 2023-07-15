import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import PrivateRoute from "./PrivateRoute";
import { useStore } from "@hooks/index";
import { AuthPage, ChatPage, HomePage } from "@pages/index";

const NavRoutes: React.FC = observer(() => {

  const { authStore } = useStore();

  const isAuthorized = authStore.isAuthorized;

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthorized ? <Navigate replace to="/" /> : <AuthPage />}
      />

      <Route
        index
        element={<PrivateRoute component={<HomePage />} />}
      />

      <Route
        path="/chat"
        element={<PrivateRoute component={<ChatPage />} />}
      />

      <Route
        path="/*"
        element={<Navigate replace to="/" />}
      />
    </Routes>
  );
});

export default NavRoutes;
