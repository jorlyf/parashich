import React from "react";
import { observer } from "mobx-react-lite";
import Avatar from "./components/Avatar";
import Friends from "./components/Friends";
import Photos from "./components/Photos";
import Status from "./components/Status";
import SendMessageButton from "./components/SendMessageButton";
import FriendshipButton from "./components/FriendshipButton";
import Posts from "./components/Posts";
import SettingsButton from "./components/SettingsButton";
import styles from "./styles.module.scss";

interface ProfileProps {
  isMe: boolean;
  user: any;
}

const Profile: React.FC<ProfileProps> = observer(({ isMe, user }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <div className={styles.avatar_container}>
          {isMe && <div></div>}
          <Avatar url={null} />
        </div>

        <Status text="пацанский статус" />

        {isMe ?
          <div className={styles.my_profile_buttons}>
            <SettingsButton />
          </div>
          :
          <div className={styles.other_profile_buttons}>
            <SendMessageButton />
            <FriendshipButton />
          </div>
        }

        <Friends friends={null} />

        <Photos photos={null} />
      </div>

      <div className={styles.posts_container}>
        <Posts posts={null} />
      </div>
    </div >
  );
});

export default Profile;
