import React from "react";
import { Menu } from "antd";
import useLeftMenu from "./hooks/useLeftMenu";
import styles from "./styles.module.scss";

interface ILeftMenuProps {
  isOpen: boolean;
}

const LeftMenu: React.FC<ILeftMenuProps> = ({ isOpen }) => {

  const {
    items,
    activeItem,
    selectItem
  } = useLeftMenu({ isOpen });

  const handleClick = (key: string) => {
    selectItem(key);
  }

  return (
    <div className={`${styles.left_menu} ${isOpen && styles.active}`}>
      <Menu
        className={styles.menu}
        activeKey={activeItem?.key?.toString() ?? null}
        items={items}
        onClick={(x) => handleClick(x.key)}
      />
    </div>
  );
}

export default LeftMenu;
