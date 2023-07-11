import React from "react";

const useMainLayout = () => {

  const [isOpenLeftMenu, setIsOpenLeftMenu] = React.useState<boolean>(false);

  const toggleLeftMenu = () => {
    setIsOpenLeftMenu(prev => !prev);
  }

  return {
    isOpenLeftMenu,
    toggleLeftMenu
  }
}

export default useMainLayout;
