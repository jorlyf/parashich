import React from "react";
import { Menu } from "antd";
import useLeftMenu from "./hooks/useLeftMenu";
import styles from "./styles.module.scss";

interface LeftMenuProps {
  isOpen: boolean;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ isOpen }) => {

  const {
    items
  } = useLeftMenu({ isOpen });

  return (
    <div className={`${styles.left_menu} ${isOpen && styles.active}`}>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        inlineCollapsed={!isOpen}
        items={items}
      />
    </div>
  );
}

export default LeftMenu;
