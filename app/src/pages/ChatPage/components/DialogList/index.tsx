import React from "react";
import styles from "./styles.module.scss";
import DialogListItem from "./components/DialogListItem";
import { DialogMessageStatus } from "src/entities";

export interface IDialogListItemLastMessage {
  senderUserId: string;
  text: string | null;
  sentAt: number;
  status: DialogMessageStatus;
}

export interface IDialogListItem {
  id: string;
  name: string;
  avatarUrl: string | null;
  lastMessage: IDialogListItemLastMessage;
  notificationCount: number;
}

interface DialogListProps {
  dialogs: IDialogListItem[];
}

const DialogList: React.FC<DialogListProps> = ({ dialogs }) => {
  return (
    <div className={styles.dialog_list}>
      {dialogs?.map(dialog => (
        <DialogListItem key={dialog.id} dialog={dialog} />
      ))}
    </div>
  );
}

export default DialogList;
