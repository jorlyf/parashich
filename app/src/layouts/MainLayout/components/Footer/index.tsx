import React from "react";
import BurgerMenu from "@public/images/BurgerMenu.svg";
import styles from "./styles.module.scss";

interface FooterProps {
  isOpenLeftMenu: boolean;
  toggleLeftMenu: () => void;
}

const Footer: React.FC<FooterProps> = ({ isOpenLeftMenu, toggleLeftMenu }) => {
  return (
    <div className={styles.footer}>
      <img
        className={styles.burger_menu}
        src={BurgerMenu}
        onClick={toggleLeftMenu}
      />
    </div>
  );
}

export default Footer;
