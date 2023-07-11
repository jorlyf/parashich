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
        label: "моя параша"
      },
      {
        key: "chat",
        label: "шептунка"
      }
    ];
  }, [isOpen]);

  return {
    items
  }
}

export default useLeftMenu;
