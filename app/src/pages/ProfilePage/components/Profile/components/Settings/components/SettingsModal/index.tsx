import React from "react";
import { Button, Modal, Upload } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useTranslation } from "react-i18next";

interface SettingsModalProps {
  open: boolean;
  close: () => void;
  isAvatarUploading: boolean;
  uploadAvatar: (file: UploadFile) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, close, isAvatarUploading, uploadAvatar }) => {

  const { t } = useTranslation();

  const addFile = (event: UploadChangeParam) => {
    const file = event.file;
    uploadAvatar(file);
  }


  return (
    <Modal
      open={open}
      footer={null}
      onCancel={close}
    >
      <Upload
        fileList={[]}
        onChange={addFile}
        multiple={false}
        beforeUpload={() => false}
      >
        <Button type="primary" loading={isAvatarUploading} disabled={isAvatarUploading}>
          {t("uploadAvatar")}
        </Button>
      </Upload>
    </Modal >
  );
}

export default SettingsModal;
