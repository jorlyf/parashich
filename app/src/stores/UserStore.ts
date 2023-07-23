import { makeAutoObservable } from "mobx";

class UserStore {

  id: string | null = null;
  login: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setId(id: string | null) {
    this.id = id;
  }

  setLogin(login: string | null) {
    this.login = login;
  }
}

export default UserStore;
