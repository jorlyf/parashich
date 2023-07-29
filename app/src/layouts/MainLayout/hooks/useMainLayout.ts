import React from "react";

const useMainLayout = () => {

  const [isOpenLeftMenu, setIsOpenLeftMenu] = React.useState<boolean>(false);

  const toggleLeftMenu = () => {
    setIsOpenLeftMenu(prev => !prev);
  }

  const closeLeftMenu = () => {
    setIsOpenLeftMenu(false);
  }

  return {
    isOpenLeftMenu,
    toggleLeftMenu,
    closeLeftMenu
  }
}

export default useMainLayout;
