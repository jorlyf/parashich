import React from "react";
import { UploadFile } from "antd";
import SettingsIcon from "@public/images/Settings.svg";
import SettingsModal from "./components/SettingsModal";
import styles from "./styles.module.scss";
import request from "@http/request";
import { RequestType } from "@http/interfaces";
import { RcFile } from "antd/es/upload";

interface SettingsProps {
  setAvatarUrl: (url: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ setAvatarUrl }) => {

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const [isAvatarUploading, setIsAvatarUploading] = React.useState<boolean>(false);

  const uploadAvatar = async (file: UploadFile) => {
    try {
      setIsAvatarUploading(true);

      const formData = new FormData();
      formData.set("file", file as RcFile);

      const { data: avatarUrl } = await request<string>({
        url: "/ProfileSettings/Avatar",
        type: RequestType.post,
        body: formData
      });

      setAvatarUrl(avatarUrl);
    } catch (error) {

    } finally {
      setIsAvatarUploading(false);
    }
  }

  return (
    <>
      <SettingsModal
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
        isAvatarUploading={isAvatarUploading}
        uploadAvatar={uploadAvatar}
      />
      <div className={styles.settings_button}
        onClick={() => setIsModalOpen(true)}
      >
        <img src={SettingsIcon} />
      </div>
    </>
  );
}

export default Settings;
