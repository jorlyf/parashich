import React from "react";
import Avatar from "./components/Avatar";
import Friends from "./components/Friends";
import Photos from "./components/Photos";
import Status from "./components/Status";
import SendMessageButton from "./components/SendMessageButton";
import FriendshipButton from "./components/FriendshipButton";
import styles from "./styles.module.scss";
import Posts from "./components/Posts";

interface ProfileProps {
  user: any;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.info}>

        <div className={styles.up}>

          <div className={styles.login_avatar_wrapper}>
            <span>Login</span>
            <Avatar url={null} />
          </div>

          <div className={styles.friends_photos_wrapper}>
            <Friends friends={null} />
            <Photos photos={null} />
          </div>

        </div>

        <div className={styles.down}>
          <Status text="пацанский статус" />

          <div className={styles.buttons}>
            <SendMessageButton />
            <FriendshipButton />
          </div>
        </div>

      </div>

      <Posts />
    </div>
  );
}

export default Profile;
