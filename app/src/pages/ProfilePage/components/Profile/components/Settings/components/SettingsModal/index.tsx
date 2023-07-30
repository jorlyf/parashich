import React from "react";
import { Button, Input, Modal, Upload } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

interface SettingsModalProps {
  open: boolean;
  close: () => void;
  isAvatarUploading: boolean;
  uploadAvatar: (file: UploadFile) => void;
  status?: string;
  changeStatus: (text: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = observer(({
  open,
  close,
  isAvatarUploading,
  uploadAvatar,
  status,
  changeStatus
}) => {

  const { t } = useTranslation();

  const [localStatus, setLocalStatus] = React.useState<string>(status ?? "");

  const addAvatarFile = (event: UploadChangeParam) => {
    const file = event.file;
    uploadAvatar(file);
  }

  const saveLocalStatus = () => {
    changeStatus(localStatus);
  }

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={close}
    >
      <Upload
        fileList={[]}
        onChange={addAvatarFile}
        multiple={false}
        beforeUpload={() => false}
      >
        <Button type="primary" loading={isAvatarUploading} disabled={isAvatarUploading}>
          {t("uploadAvatar")}
        </Button>
      </Upload>

      <div>
        <span>{t("writeAboutYourself")}</span>
        <Input
          value={localStatus}
          onChange={(event) => setLocalStatus(event.target.value)}
          allowClear
          addonAfter={<a onClick={saveLocalStatus}>{t("save")}</a>}
        />
      </div>
    </Modal >
  );
});

export default SettingsModal;
