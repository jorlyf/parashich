import React from "react";
import { observer } from "mobx-react-lite";
import { BASE_URL_DATA } from "@http/api";
import DefaultAvatar from "@public/DefaultAvatar.jpg";
import styles from "./styles.module.scss";

interface AvatarProps {
  url?: string;
}

const Avatar: React.FC<AvatarProps> = observer(({ url }) => {
  return (
    <img
      className={styles.avatar}
      src={url ? `${BASE_URL_DATA}/${url}` : DefaultAvatar}
    />
  );
});

export default Avatar;
