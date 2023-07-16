import useNavigator from "@hooks/useNavigator";
import React from "react";

interface RedirectAfterLoginHookProps {
  isAuthorized: boolean;
}

const useRedirectAfterLogin = ({ isAuthorized }: RedirectAfterLoginHookProps) => {
  const initPathName = React.useRef<string>(null);

  const [wasRedirected, setWasRedirected] = React.useState<boolean>(false);

  const navigate = useNavigator();

  if (!initPathName.current) {
    initPathName.current = location.pathname;
  }

  React.useEffect(() => {
    if (!wasRedirected && isAuthorized && initPathName.current) {
      setWasRedirected(true);
      navigate(initPathName.current);   
      console.log(initPathName.current);
    }
  }, [isAuthorized]);
}

export default useRedirectAfterLogin;
