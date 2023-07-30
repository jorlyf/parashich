import React from "react";
import { UploadFile, notification } from "antd";
import SettingsIcon from "@public/images/Settings.svg";
import SettingsModal from "./components/SettingsModal";
import styles from "./styles.module.scss";
import request from "@http/request";
import { RequestType } from "@http/interfaces";
import { RcFile } from "antd/es/upload";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

interface SettingsProps {
  setAvatarUrl: (url: string) => void;
  status: string;
  setStatus: (text: string) => void;
}

const Settings: React.FC<SettingsProps> = observer(({ setAvatarUrl, status, setStatus }) => {

  const { t } = useTranslation();

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

  const changeStatus = async (text: string) => {
    try {
      await request({
        url: "/ProfileSettings/Status",
        type: RequestType.put,
        body: text
      });

      notification.success({
        message: t("statusSaved"),

      })
    } catch (error) {
      console.error(error);
      notification.error({
        message: t("errorHasOccured"),
      })
    }
  }

  return (
    <>
      <SettingsModal
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
        isAvatarUploading={isAvatarUploading}
        uploadAvatar={uploadAvatar}
        status={status}
        changeStatus={changeStatus}
      />
      <div className={styles.settings_button}
        onClick={() => setIsModalOpen(true)}
      >
        <img src={SettingsIcon} />
      </div>
    </>
  );
});

export default Settings;
