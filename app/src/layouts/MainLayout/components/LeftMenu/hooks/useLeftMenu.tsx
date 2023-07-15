import React from "react";
import { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import useNavigator from "@hooks/useNavigator";
import ChatIcon from "@public/images/Chat.svg";
import SettingsIcon from "@public/images/Settings.svg";
import styles from "../styles.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

interface LeftMenuHookProps {
  isOpen: boolean;
}

const useLeftMenu = ({ isOpen }: LeftMenuHookProps) => {

  const { t } = useTranslation();

  const navigate = useNavigator();

  const items = React.useMemo<MenuItem[]>(() => {
    return [
      {
        key: "profile",
        label: t("Profile"),
        // icon: <img className={styles.icon} src={HomeIcon} />
      },
      {
        key: "chat",
        label: t("Chat"),
        icon: <img className={styles.icon} src={ChatIcon} />
      },
      {
        key: "settings",
        label: t("Settings"),
        icon: <img className={styles.icon} src={SettingsIcon} />
      }
    ];
  }, [isOpen]);

  const [activeItem, setActiveItem] = React.useState<MenuItem | null>(null);

  React.useEffect(() => {
    if (!activeItem) return;
    
    navigate(activeItem.key.toString());
  }, [activeItem]);

  const selectItem = (itemKey: string) => {
    const item = items.find(x => x.key === itemKey);
    setActiveItem(item);
  }

  return {
    items,
    activeItem,
    selectItem
  }
}

export default useLeftMenu;
