import React from "react";
import UserSearchResultItem from "./components/UserSearchResultItem";
import styles from "./styles.module.scss";

export interface IUserSearchResultListItem {
  id: string;
  login: string;
  avatarUrl: string | null;
  onClick: (id: string) => void;
}

interface UserSearchResultListProps {
  users: IUserSearchResultListItem[];
}

const UserSearchResultList: React.FC<UserSearchResultListProps> = ({ users }) => {
  return (
    <div className={styles.user_search_result_list}>
      {users.map(user => (
        <UserSearchResultItem
          key={user.id}
          id={user.id}
          login={user.login}
          avatarUrl={user.avatarUrl}
          onClick={user.onClick}
        />
      ))}
    </div>
  );
}

export default UserSearchResultList;
