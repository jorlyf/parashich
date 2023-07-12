import { makeAutoObservable, runInAction } from "mobx";
import { LoginData } from "@pages/AuthPage/interfaces";

class AuthStore {

  login: string | null = null;
  isAuthorized: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  authorize(loginData: LoginData, mode: "login" | "register") {
    if (mode === "login") {
      this.login = loginData.login;
      this.isAuthorized = true;

      // runInAction(() =>
      //   setTimeout(() => {
      //     this.isAuthorized = false;
      //   }, 2000));
    } else {

    }
  }

  tokenAuthorize(token: string) {

  }

  logout() {

  }
}

export default AuthStore;
