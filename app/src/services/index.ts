import AuthService from "./AuthService";
import LSService from "./LSService";

export { AuthService, LSService }

export interface IAsyncMethodParams<TSuccess = undefined> {
  onSuccess?: (value?: TSuccess) => void;
  onFailed?: (value?: any) => void;
}