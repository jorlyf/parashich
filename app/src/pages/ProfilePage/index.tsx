import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import CustomHeader from "@layouts/MainLayout/components/CustomHeader";
import useProfilePage from "./hooks/useProfilePage";
import Profile from "./components/Profile";
import styles from "../styles.module.scss";

interface ProfilePageProps {

}

const ProfilePage: React.FC<ProfilePageProps> = () => {

  const { userLogin } = useParams();

  const {

  } = useProfilePage();

  return (
    <MainLayout>
      <CustomHeader />
      <div className={styles.page_content}>
        <Profile user={null} />
      </div>
    </MainLayout>
  );
}

export default ProfilePage;
