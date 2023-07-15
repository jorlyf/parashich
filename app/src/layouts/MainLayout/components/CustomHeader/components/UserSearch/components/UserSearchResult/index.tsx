import React from "react";
import DefaultAvatar from "@public/DefaultAvatar.jpg";
import styles from "./styles.module.scss";

export interface UserSearchResultItem {
  id: string;
  login: string;
  avatarUrl: string | null;
}

interface UserSearchResultProps {
  users: UserSearchResultItem[];
}

const UserSearchResult: React.FC<UserSearchResultProps> = ({ users }) => {
  return (
    <div className={styles.user_search_result}>
      {users.map(user => (
        <div key={user.id}>
          <img src={user.avatarUrl ?? DefaultAvatar} />
          {user.login}
        </div>
      ))}
    </div>
  );
}

export default UserSearchResult;
