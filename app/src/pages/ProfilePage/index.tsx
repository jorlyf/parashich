import React from "react";
import MainLayout from "@layouts/MainLayout";
import CustomHeader from "@layouts/MainLayout/components/CustomHeader";

interface ProfilePageProps {

}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  return (
    <MainLayout>
      <CustomHeader>
      </CustomHeader>
    </MainLayout>
  );
}

export default ProfilePage;
