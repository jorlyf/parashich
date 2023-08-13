import React from "react";
import { observer } from "mobx-react-lite";
import DefaultAvatar from "@public/DefaultAvatar.jpg";
import styles from "./styles.module.scss";

interface AvatarProps {
  url?: string;
}

const Avatar: React.FC<AvatarProps> = observer(({ url }) => {
  return (
    <img
      className={styles.avatar}
      src={url ?? DefaultAvatar}
    />
  );
});

export default Avatar;
