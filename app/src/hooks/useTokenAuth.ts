import React from "react";
import { LSService } from "@services/index";
import AuthStore from "@stores/AuthStore";

interface TokenAuthHookProps {
  authStore: AuthStore;
}

const useTokenAuth = ({ authStore }: TokenAuthHookProps) => {

  const auth = () => {
    const token = LSService.getToken();
    if (token === null) return;

    authStore.tokenAuthorize(token);
  }

  React.useEffect(() => {
    if (!authStore.wasTokenAuthAttempt) {
      auth();
    }
  }, []);
}

export default useTokenAuth;
