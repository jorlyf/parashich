import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import CustomHeader from "@layouts/MainLayout/components/CustomHeader";
import useProfilePage from "./hooks/useProfilePage";

interface ProfilePageProps {

}

const ProfilePage: React.FC<ProfilePageProps> = () => {

  const { userLogin } = useParams();

  const {

  } = useProfilePage();

  return (
    <MainLayout>
      <CustomHeader>
      </CustomHeader>
    </MainLayout>
  );
}

export default ProfilePage;
