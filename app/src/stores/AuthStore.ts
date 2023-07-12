import { makeAutoObservable } from "mobx";
import { LoginData } from "@pages/AuthPage/interfaces";

class AuthStore {

  login: string | null = null;
  isAuthorized: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  authorize(loginData: LoginData, mode: "login" | "register") {
    if (mode === "login") {
      this.login = loginData.login;
      this.isAuthorized = true;
    } else {

    }
  }

  tokenAuthorize(token: string) {

  }

  logout() {

  }
}

export default AuthStore;
