import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

const SendMessageButton: React.FC = () => {

  const { t } = useTranslation();

  return (
    <Button>{t("SendMessage")}</Button>
  );
}

export default SendMessageButton;
