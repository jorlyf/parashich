import React from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "@hooks/index";
import MainLayout from "@layouts/MainLayout";
import CustomHeader from "@layouts/MainLayout/components/CustomHeader";
import Profile from "./components/Profile";
import styles from "../styles.module.scss";
import ProfileStore from "./stores/ProfileStore";
import request from "@http/request";
import { RequestType } from "@http/interfaces";

const ProfilePage: React.FC = observer(() => {

  const { userStore } = useStore();

  const { userLogin } = useParams();

  const [profileId, setProfileId] = React.useState<string>();

  const [profileStore, setProfileStore] = React.useState<ProfileStore>();

  React.useEffect(() => {
    if (!profileId) return;

    setProfileStore(new ProfileStore(profileId, userStore.id));
  }, [profileId]);

  const fetchProfileIdByLogin = async (login: string) => {
    try {
      setProfileId(null);

      const { data: id } = await request<string>({
        url: `/Profiles/IdByLogin?login=${login}`,
        type: RequestType.get
      });

      setProfileId(id);

    } catch (error) {
      setProfileId(null);
    }
  }

  React.useEffect(() => {
    if (!userLogin) return;

    fetchProfileIdByLogin(userLogin);
  }, [userLogin]);

  if (!profileStore) {
    return (
      <MainLayout>
        <CustomHeader />
        <div className={styles.page_content}>
          <>fetching profile id</>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <CustomHeader />
      <div className={styles.page_content}>
        {profileStore.fetched &&
          <Profile
            store={profileStore}
          />
        }
        {profileStore.loading && <>loading</>}
        {profileStore.error && <>{profileStore.error}</>}
      </div>
    </MainLayout>
  );
});

export default ProfilePage;
