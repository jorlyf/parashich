import { RequestType } from "@http/interfaces";
import request from "@http/request";
import { LoginData } from "@pages/AuthPage/interfaces";
import { IAsyncMethodParams } from "..";

class AuthService {
  static async login(
    loginData: LoginData, {
      onSuccess, onFailed
    }: IAsyncMethodParams<string>) {
    const response = await request<string>({
      url: "Auth/Login",
      type: RequestType.post,
      body: loginData
    });

    if (response.status !== 200) {
      onFailed();
      return;
    }

    const token = response.data;

    onSuccess(token);
  }

  static async register(
    loginData: LoginData, {
      onSuccess, onFailed
    }: IAsyncMethodParams<string>) {
    const response = await request<string>({
      url: "Auth/Register",
      type: RequestType.post,
      body: loginData
    });

    if (response.status !== 200) {
      onFailed();
      return;
    }

    const token = response.data;

    onSuccess(token);
  }

  static async tokenLogin({
    onSuccess, onFailed
  }: IAsyncMethodParams) {
    const response = await request({
      url: "Auth/TokenLogin",
      type: RequestType.post
    });

    if (response.status !== 200) {
      onFailed();
      return;
    }

    onSuccess();
  }
}

export default AuthService;
