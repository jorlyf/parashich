import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import CustomHeader from "@layouts/MainLayout/components/CustomHeader";

interface ProfilePageProps {

}

const ProfilePage: React.FC<ProfilePageProps> = () => {

  const { userId } = useParams();

  return (
    <MainLayout>
      <CustomHeader>
      </CustomHeader>
    </MainLayout>
  );
}

export default ProfilePage;
