import { createContext, useContext } from "react";
import { AuthStore } from "@stores/index";

const store = {
  authStore: new AuthStore()
}

const storeContext = createContext(store);
const useStore = () => useContext(storeContext);

export default useStore;
