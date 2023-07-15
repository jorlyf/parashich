import React from "react";
import BurgerMenuIcon from "@public/images/BurgerMenu.svg";
import ChatIcon from "@public/images/Chat.svg";
import HomeIcon from "@public/images/Home.svg";
import styles from "./styles.module.scss";
import useFooter from "./hooks/useFooter";

interface FooterProps {
  isOpenLeftMenu: boolean;
  toggleLeftMenu: () => void;
}

const Footer: React.FC<FooterProps> = ({ isOpenLeftMenu, toggleLeftMenu }) => {

  const { navigate } = useFooter();

  const handleClickIcon = (path: string) => {
    navigate(path);
  }

  return (
    <div className={styles.footer}>
      <img
        className={styles.icon}
        src={HomeIcon}
        onClick={() => handleClickIcon("/")}
      />

      <img
        className={styles.icon}
        src={ChatIcon}
        onClick={() => handleClickIcon("/chat")}
      />

      <img
        className={styles.icon}
        src={BurgerMenuIcon}
        onClick={toggleLeftMenu}
      />
    </div>
  );
}

export default Footer;
