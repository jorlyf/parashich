import { makeAutoObservable, runInAction } from "mobx";
import jwt_decode from "jwt-decode";
import { store } from "@hooks/useStore";
import { LoginData } from "@pages/AuthPage/interfaces";
import LSService from "@services/LSService";
import AuthService from "@services/AuthService";

class AuthStore {

  isAuthorized: boolean = false;
  wasTokenAuthAttempt: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  authorize(loginData: LoginData, mode: "login" | "register") {
    if (mode === "login") {
      AuthService.login(
        loginData, {
        onSuccess: (token: string) => this.successAuthorize(token),
        onFailed: () => this.logout()
      });
    } else {
      AuthService.register(
        loginData, {
        onSuccess: (token: string) => this.successAuthorize(token),
        onFailed: () => this.logout()
      });
    }
  }

  tokenAuthorize(token: string) {
    this.setWasTokenAuthAttempt(true);

    AuthService.tokenLogin({
      onSuccess: () => this.successAuthorize(token),
      onFailed: () => this.logout()
    });
  }

  successAuthorize(token: string) {
    LSService.setToken(token);

    const decoded = jwt_decode<{ id: string, login: string }>(token);

    runInAction(() => {
      store.userStore.setId(decoded.id);
      store.userStore.setLogin(decoded.login);
      this.isAuthorized = true;
    });
  }

  logout() {
    runInAction(() => {
      store.userStore.setId(null);
      store.userStore.setLogin(null);
      this.isAuthorized = false;
    });

    LSService.removeToken();
  }

  setWasTokenAuthAttempt(wasTokenAuthAttempt: boolean) {
    this.wasTokenAuthAttempt = wasTokenAuthAttempt;
  }
}

export default AuthStore;
