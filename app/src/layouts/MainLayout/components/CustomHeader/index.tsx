import React from "react";
import UserSearch from "./components/UserSearch";
import LogoIcon from "@public/Logo.jpg";
import styles from "./styles.module.scss";

interface CustomHeaderProps {
  children?: React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ children }) => {
  return (
    <div className={styles.custom_header}>
      <div className={styles.content}>
        {children}
      </div>

      <UserSearch
        disabled={false}
      />

      <img
        className={styles.logo_icon}
        src={LogoIcon}
      />
    </div>
  );
}

export default CustomHeader;
