import React from "react";
import { MainLayout } from "@layouts/index";
import LoginForm from "./components/LoginForm";
import CustomHeader from "@layouts/MainLayout/components/CustomHeader";
import useStore from "@hooks/useStore";
import useNavigator from "@hooks/useNavigator";

const AuthPage: React.FC = () => {

  const { authStore } = useStore();

  const isAuthorized = authStore.isAuthorized;

  const navigate = useNavigator();

  React.useEffect(() => {
    if (isAuthorized) navigate("/");
  });

  return (
    <MainLayout>
      <CustomHeader />
      <LoginForm />
    </MainLayout>
  );
}

export default AuthPage;
