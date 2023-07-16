import React from "react";
import { IUserSearchResultListItem } from "../..";
import DefaultAvatar from "@public/DefaultAvatar.jpg";
import styles from "./styles.module.scss";

const UserSearchResultItem: React.FC<IUserSearchResultListItem> = ({ id, login, avatarUrl, onClick }) => {
  return (
    <div
      className={styles.user_search_result_item}
      onClick={() => onClick(id)}
    >
      <img src={avatarUrl ?? DefaultAvatar} />
      {login}
    </div>
  );
}

export default UserSearchResultItem;
