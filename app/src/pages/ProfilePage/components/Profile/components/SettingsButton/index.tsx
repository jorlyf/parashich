import React from "react";
import SettingsIcon from "@public/images/Settings.svg";
import styles from "./styles.module.scss";

const SettingsButton: React.FC = () => {
  return (
    <div className={styles.settings_button}>
      <img src={SettingsIcon} />
    </div>
  );
}

export default SettingsButton;
