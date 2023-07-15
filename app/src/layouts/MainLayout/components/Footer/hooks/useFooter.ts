import useNavigator from "@hooks/useNavigator";

const useFooter = () => {
  const navigate = useNavigator();

  return {
    navigate
  }
}

export default useFooter;
