import React from "react";
import { IDialogListItem } from "../..";
import DefaultAvatar from "@public/DefaultAvatar.jpg";
import styles from "./styles.module.scss";
import { DialogMessageStatus } from "src/entities";

interface DialogListItemProps {
  dialog: IDialogListItem;
}

const DialogListItem: React.FC<DialogListItemProps> = ({ dialog }) => {

  const getMessageStatusIcon = (status: DialogMessageStatus): null => {
    return null;
  }

  const getMessageSentTime = (timestamp: number): string => {
    return "09:24";
  }

  return (
    <div className={styles.dialog_list_item}>
      <img
        className={styles.dialog_avatar}
        src={dialog.avatarUrl ?? DefaultAvatar}
      />
      <div className={styles.dialog_info}>
        <div className={styles.up}>
          <span className={styles.name}>{dialog.name}</span>
          <div className={styles.last_message_info}>
            <span className={styles.last_message_status}>{getMessageStatusIcon(dialog.lastMessage.status)}</span>
            <span className={styles.last_message_time}>{getMessageSentTime(dialog.lastMessage.sentAt)}</span>
          </div>
        </div>

        <div className={styles.last_message_text}>
          {dialog.lastMessage.text}
        </div>
      </div>
    </div>
  );
}

export default DialogListItem;
