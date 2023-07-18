import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

const FriendshipButton: React.FC = () => {

  const { t } = useTranslation();

  return (
    <Button>{t("AddFriend")}</Button>
  );
}

export default FriendshipButton;
