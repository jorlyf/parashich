import React from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "@hooks/index";
import MainLayout from "@layouts/MainLayout";
import CustomHeader from "@layouts/MainLayout/components/CustomHeader";
import useProfilePage from "./hooks/useProfilePage";
import Profile from "./components/Profile";
import styles from "../styles.module.scss";

interface ProfilePageProps {

}

const ProfilePage: React.FC<ProfilePageProps> = observer(() => {

  const { userStore } = useStore();

  const { userLogin } = useParams();

  const {

  } = useProfilePage();
  
  return (
    <MainLayout>
      <CustomHeader />
      <div className={styles.page_content}>
        <Profile
          isMe={userStore.login === userLogin}
          user={null}
        />
      </div>
    </MainLayout>
  );
});

export default ProfilePage;
