import React from "react";
import styles from "./styles.module.scss";

interface StatusProps {
  text: string | null;
}

const Status: React.FC<StatusProps> = ({ text }) => {
  return (
    <div className={styles.status}>
      <span>{text}</span>
    </div>
  );
}

export default Status;
