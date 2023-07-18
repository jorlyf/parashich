import { makeAutoObservable, runInAction } from "mobx";
import jwt_decode from "jwt-decode";
import { LoginData } from "@pages/AuthPage/interfaces";
import LSService from "@services/LSService";
import AuthService from "@services/AuthService";

class AuthStore {

  id: string | null = null;
  login: string | null = null;
  isAuthorized: boolean = false;
  wasTokenAuthAttempt: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  authorize(loginData: LoginData, mode: "login" | "register") {
    if (mode === "login") {
      runInAction(() => {
        AuthService.login(
          loginData, {
          onSuccess: (token: string) => this.successAuthorize(token),
          onFailed: () => this.logout()
        });
      });
    } else {
      runInAction(() => {
        AuthService.register(
          loginData, {
          onSuccess: (token: string) => this.successAuthorize(token),
          onFailed: () => this.logout()
        });
      });
    }
  }

  tokenAuthorize(token: string) {
    this.setWasTokenAuthAttempt(true);

    runInAction(() => {
      AuthService.tokenLogin({
        onSuccess: () => this.successAuthorize(token),
        onFailed: () => this.logout()
      });
    });
  }

  successAuthorize(token: string) {
    LSService.setToken(token);

    const decoded = jwt_decode<{ id: string, login: string }>(token);

    this.id = decoded.id;
    this.login = decoded.login;
    this.isAuthorized = true;
  }

  logout() {
    this.id = null;
    this.login = null;
    this.isAuthorized = false;

    LSService.removeToken();
  }

  setWasTokenAuthAttempt(wasTokenAuthAttempt: boolean) {
    this.wasTokenAuthAttempt = wasTokenAuthAttempt;
  }
}

export default AuthStore;
