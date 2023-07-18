import React from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@layouts/index";
import useChatPage from "./hooks/useChatPage";
import Header from "./components/Header";
import DialogList, { IDialogListItem } from "./components/DialogList";
import Dialog from "./components/Dialog";
import { DialogMessageStatus } from "@entities/index";
import styles from "../styles.module.scss";

const ChatPage: React.FC = () => {

  const params = useParams();
  const chatId = params.chatId ?? null;

  const {
    openDialogList
  } = useChatPage();

  const dialogs: IDialogListItem[] = [
    {
      id: "1",
      name: "admin2",
      avatarUrl: null,
      lastMessage: {
        senderUserId: "1",
        text: "abc",
        status: DialogMessageStatus.readed,
        sentAt: 0
      },
      notificationCount: 0
    },
    {
      id: "2",
      name: "nastya",
      avatarUrl: null,
      lastMessage: {
        senderUserId: "1",
        text: "privet!",
        status: DialogMessageStatus.readed,
        sentAt: 0
      },
      notificationCount: 0
    }
  ];

  return (
    <MainLayout>
      <Header
        isOpenDialogList={chatId === null}
        openDialogList={openDialogList}
      />
      <div className={styles.page_content}>
        {chatId !== null ?
          <Dialog />
          :
          <DialogList
            dialogs={dialogs}
          />
        }
      </div>
    </MainLayout>
  );
}

export default ChatPage;
