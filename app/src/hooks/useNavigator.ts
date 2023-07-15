import { useNavigate } from "react-router-dom";

const useNavigator = () => {

  const nav = useNavigate();

  const navigate = (path: string) => {
    nav(path);
  }

  return navigate;
}

export default useNavigator;
