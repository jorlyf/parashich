import React from "react";
import styles from "./styles.module.scss";
import DialogListItem from "./components/DialogListItem";

export interface IDialogListItem {
  id: string;
  name: string;
  avatarUrl: string | null;
  lastMessage: string | null;
  lastMessageTimestamp: number | null;
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
