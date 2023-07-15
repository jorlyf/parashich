import React from "react";
import { MainLayout } from "@layouts/index";
import LoginForm from "./components/LoginForm";
import CustomHeader from "@components/CustomHeader";

const AuthPage: React.FC = () => {
  return (
    <MainLayout>
      <CustomHeader />
      <LoginForm />
    </MainLayout>
  );
}

export default AuthPage;
