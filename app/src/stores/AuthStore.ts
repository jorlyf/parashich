import { makeAutoObservable, runInAction } from "mobx";
import { LoginData } from "@pages/AuthPage/interfaces";
import request from "@http/request";
import { RequestType } from "@http/interfaces";
import LSService from "@services/LSService";
import jwt_decode from "jwt-decode";

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
      runInAction(async () => {
        const response = await request<string>({
          url: "Auth/Login",
          type: RequestType.post,
          body: loginData
        });

        if (response.status !== 200) {
          this.logout();
          return;
        }

        const token = response.data;
        this.successAuthorize(token);
      });
    } else {
      runInAction(async () => {
        const response = await request<string>({
          url: "Auth/Register",
          type: RequestType.post,
          body: loginData
        });

        if (response.status !== 200) {
          this.logout();
          return;
        }

        const token = response.data;
        this.successAuthorize(token);
      });
    }
  }

  tokenAuthorize(token: string) {
    this.setWasTokenAuthAttempt(true);

    runInAction(async () => {
      const response = await request({
        url: "Auth/TokenLogin",
        type: RequestType.post
      });

      if (response.status !== 200) {
        this.logout();
        return;
      }

      this.successAuthorize(token);
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
