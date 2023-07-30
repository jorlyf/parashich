import React from "react";
import { observer } from "mobx-react-lite";
import ProfileStore from "@pages/ProfilePage/stores/ProfileStore";
import Avatar from "./components/Avatar";
import Friends from "./components/Friends";
import Photos from "./components/Photos";
import Status from "./components/Status";
import SendMessageButton from "./components/SendMessageButton";
import FriendshipButton from "./components/FriendshipButton";
import Posts from "./components/Posts";
import Settings from "./components/Settings";
import styles from "./styles.module.scss";

interface ProfileProps {
  store: ProfileStore;
}

const Profile: React.FC<ProfileProps> = observer(({ store }) => {

  const isMe = store.isMe;

  const profile = store.profile;

  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <div className={styles.avatar_container}>
          <Avatar url={profile.avatarUrl} />
        </div>

        <Status text={profile.status} />

        {isMe ?
          <div className={styles.my_profile_buttons}>
            <Settings
              setAvatarUrl={(url) => profile.setAvatarUrl(url)}
              status={profile.status}
              setStatus={(text) => profile.setStatus(text)}
            />
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
