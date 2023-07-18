import React from "react";
import DefaultAvatar from "@public/DefaultAvatar.jpg";
import styles from "./styles.module.scss";

interface AvatarProps {
  url: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ url }) => {
  return (
    <img
      className={styles.avatar}
      src={url ?? DefaultAvatar}
    />
  );
}

export default Avatar;
