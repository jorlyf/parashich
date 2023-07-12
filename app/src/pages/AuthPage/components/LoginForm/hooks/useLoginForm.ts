import React from "react";
import AuthStore from "@stores/AuthStore";
import { LoginData } from "@pages/AuthPage/interfaces";

interface LoginFormHookProps {
  authStore: AuthStore;
}

const useLoginForm = ({ authStore }: LoginFormHookProps) => {

  const [mode, setMode] = React.useState<"login" | "register">("login");

  const login = (loginData: LoginData) => {
    authStore.authorize(loginData, "login");
  }

  const register = (loginData: LoginData) => {
    authStore.authorize(loginData, "register");
  }

  const onSubmit = (loginData: LoginData) => {
    if (mode === "login") login(loginData);
    else register(loginData);
  }

  const toggleMode = () =>
    setMode(prev => prev === "login" ? "register" : "login");

  return {
    onSubmit,
    authMode: mode,
    toggleAuthMode: toggleMode
  }
}

export default useLoginForm;
