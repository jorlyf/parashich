import React from "react";
import { Menu } from "antd";
import { observer } from "mobx-react-lite";
import useStore from "@hooks/useStore";
import useLeftMenu from "./hooks/useLeftMenu";
import styles from "./styles.module.scss";

interface ILeftMenuProps {
  isOpen: boolean;
}

const LeftMenu: React.FC<ILeftMenuProps> = observer(({ isOpen }) => {

  const { authStore } = useStore();

  const {
    items,
    selectItem
  } = useLeftMenu({ authStore, isOpen });

  return (
    <div className={`${styles.left_menu} ${isOpen && styles.active}`}>
      <Menu
        className={styles.menu}
        items={items}
        selectedKeys={[]}
        onClick={(item) => selectItem(item.key)}
      />
    </div>
  );
});

export default LeftMenu;
