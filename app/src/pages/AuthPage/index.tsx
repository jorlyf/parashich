import React from "react";
import { MainLayout } from "@layouts/index";
import LoginForm from "./components/LoginForm";

const AuthPage: React.FC = () => {
  return (
    <MainLayout>
      <LoginForm />
    </MainLayout>
  );
}

export default AuthPage;
