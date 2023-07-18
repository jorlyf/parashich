import React from "react";
import { Avatar as AntdAvatar } from "antd";
import useNavigator from "@hooks/useNavigator";
import { useTranslation } from "react-i18next";
import DefaultAvatar from "@public/DefaultAvatar.jpg";
import styles from "./styles.module.scss";

interface FriendsProps {
  friends: any[];
}

interface IFriend {
  id: string;
  login: string;
  avatarUrl: string | null;
}

const Friends: React.FC<FriendsProps> = ({ }) => {

  const { t } = useTranslation();

  const navigate = useNavigator();

  const friends: IFriend[] = [
    {
      id: "1",
      login: "admin",
      avatarUrl: null
    },
    {
      id: "2",
      login: "jorlyf",
      avatarUrl: null
    },
    {
      id: "3",
      login: "nastya",
      avatarUrl: null
    },
    {
      id: "4",
      login: "admin",
      avatarUrl: null
    },
    {
      id: "5",
      login: "jorlyf",
      avatarUrl: null
    },
    {
      id: "6",
      login: "nastya",
      avatarUrl: null
    }
  ];

  const navigateToProfile = (login: string) => {
    navigate(`/profile/${login}`);
  }

  return (
    <div className={styles.friends}>
      <span className={styles.header}>{t("Friends")}</span>
      <ul className={styles.list}>
        {friends.map(friend => (
          <li
            key={friend.id}
            onClick={() => navigateToProfile(friend.login)}
          >
            <AntdAvatar src={friend.avatarUrl ?? DefaultAvatar} />
            <span>{friend.login}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Friends;
