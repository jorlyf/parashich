import { createContext, useContext } from "react";
import { AuthStore, UserStore } from "@stores/index";

export const store = {
  authStore: new AuthStore(),
  userStore: new UserStore()
}

const storeContext = createContext(store);
const useStore = () => useContext(storeContext);

export default useStore;
