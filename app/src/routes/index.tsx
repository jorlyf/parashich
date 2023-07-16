import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import PrivateRoute from "./PrivateRoute";
import { useStore } from "@hooks/index";
import useRedirectAfterLogin from "./hooks/useRedirectAfterLogin";
import { AuthPage, ChatPage, HomePage, ProfilePage } from "@pages/index";

const NavRoutes: React.FC = observer(() => {

  const { authStore } = useStore();

  const isAuthorized = authStore.isAuthorized;

  useRedirectAfterLogin({ isAuthorized });

  return (
    <Routes>
      <Route
        path="/login"
        element={<AuthPage />}
      />

      <Route
        index
        element={<PrivateRoute component={<HomePage />} />}
      />

      <Route
        path="/chat/:chatId?"
        element={<PrivateRoute component={<ChatPage />} />}
      />

      <Route
        path="/profile/:userId"
        element={<PrivateRoute component={<ProfilePage />} />}
      />

      <Route
        path="/*"
        element={<Navigate replace to="/" />}
      />
    </Routes>
  );
});

export default NavRoutes;
