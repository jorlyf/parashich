enum LSKeys {
  token = "ACCESS_TOKEN"
}

class LSService {
  static getToken = () => get(LSKeys.token);

  static setToken = (token: string) => set(LSKeys.token, token);

  static removeToken = () => remove(LSKeys.token);
}

export default LSService;

const get = (key: string): string | null => {
  return localStorage.getItem(key);
}

const set = (key: string, value: string) => {
  localStorage.setItem(key, value);
}

const remove = (key: string) => {
  localStorage.removeItem(key);
}