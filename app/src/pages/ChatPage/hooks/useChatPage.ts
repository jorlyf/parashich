import React from "react";

const useChatPage = () => {

  const [isOpenDialogList, setIsOpenDialogList] = React.useState(false);

  const openDialogList = () => {
    setIsOpenDialogList(true);
  }

  const closeDialogList = () => {
    setIsOpenDialogList(false);
  }

  return {
    isOpenDialogList,
    openDialogList
  }
}

export default useChatPage;
