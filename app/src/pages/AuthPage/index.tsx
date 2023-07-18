import React from "react";
import { MainLayout } from "@layouts/index";
import LoginForm from "./components/LoginForm";
import CustomHeader from "@layouts/MainLayout/components/CustomHeader";
import useStore from "@hooks/useStore";
import useNavigator from "@hooks/useNavigator";
import styles from "../styles.module.scss";

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
      <div className={styles.page_content}>
        <LoginForm />
      </div>
    </MainLayout>
  );
}

export default AuthPage;
