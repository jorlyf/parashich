import React from "react";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

interface LeftMenuHookProps {
  isOpen: boolean;
}

const useLeftMenu = ({ isOpen }: LeftMenuHookProps) => {

  const items = React.useMemo<MenuItem[]>(() => {
    // if (!isOpen) return [];

    return [
      {
        key: "profile",
        label: "profile"
      },
      {
        key: "chat",
        label: "chat" 
      }
    ];
  }, [isOpen]);

  return {
    items
  }
}

export default useLeftMenu;
