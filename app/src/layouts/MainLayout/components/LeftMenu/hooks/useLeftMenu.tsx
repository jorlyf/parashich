import React from "react";
import { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import useNavigator from "@hooks/useNavigator";
import { AuthStore, UserStore } from "@stores/index";
import ChatIcon from "@public/images/Chat.svg";
import SettingsIcon from "@public/images/Settings.svg";
import styles from "../styles.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

interface LeftMenuHookProps {
  authStore: AuthStore;
  userStore: UserStore;
  isOpen: boolean;
  close: () => void;
}

const useLeftMenu = ({ authStore, userStore, isOpen, close }: LeftMenuHookProps) => {

  const { t } = useTranslation();

  const navigate = useNavigator();

  const items = React.useMemo<MenuItem[]>(() => {
    return [
      {
        key: "profile",
        label: t("Profile"),
        // icon: <img className={styles.icon} src={HomeIcon} />
        onClick: () => applyAndClose(() => navigate(`/profile/${userStore.login}`))
      },
      {
        key: "chat",
        label: t("Chat"),
        icon: <img className={styles.icon} src={ChatIcon} />,
        onClick: () => applyAndClose(() => navigate("/chat"))
      },
      {
        key: "settings",
        label: t("Settings"),
        icon: <img className={styles.icon} src={SettingsIcon} />,
        onClick: () => applyAndClose(() => navigate("/settings"))
      },
      {
        key: "logout",
        label: t("logout"),
        // icon: <img className={styles.icon} src={} />,
        onClick: () => applyAndClose(() => authStore.logout())
      }
    ];
  }, [isOpen]);

  const selectItem = (itemKey: string) => {
    const item = items.find(x => x.key === itemKey) ?? null;

    if (!item) return;

    // @ts-expect-error
    item.onClick();
  }

  const applyAndClose = (callback: () => void) => {
    callback();
    close();
  }

  return {
    items,
    selectItem
  }
}

export default useLeftMenu;
