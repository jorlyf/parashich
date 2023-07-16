import React from "react";
import useNavigator from "@hooks/useNavigator";

const useChatPage = () => {

  const navigate = useNavigator();

  const openDialogList = () => {
    navigate("/chat");
  }

  return {
    openDialogList
  }
}

export default useChatPage;
