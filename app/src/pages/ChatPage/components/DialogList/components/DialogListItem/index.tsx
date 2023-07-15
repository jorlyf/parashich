import React from "react";
import { IDialogListItem } from "../..";
import DefaultAvatar from "@public/DefaultAvatar.jpg";
import styles from "./styles.module.scss";

interface DialogListItemProps {
  dialog: IDialogListItem;
}

const DialogListItem: React.FC<DialogListItemProps> = ({ dialog }) => {
  return (
    <div className={styles.dialog_list_item}>
      <img
        className={styles.dialog_avatar}
        src={dialog.avatarUrl ?? DefaultAvatar}
      />
      <div className={styles.dialog_info}>
        <div className={styles.up}>
          <span className={styles.name}>{dialog.name}</span>
          <span className={styles.reading_status}>✓</span>
          <span className={styles.last_message_time}>09:24</span>
        </div>

        <div className={styles.last_message}>
          {dialog.lastMessage}
        </div>
      </div>
    </div>
  );
}

export default DialogListItem;
