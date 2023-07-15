import React from "react";
import { MainLayout } from "@layouts/index";
import useChatPage from "./hooks/useChatPage";
import Header from "./components/Header";
import DialogList, { IDialogListItem } from "./components/DialogList";
import Dialog from "./components/Dialog";
import { DialogMessageStatus } from "@entities/index";

const ChatPage: React.FC = () => {

  const {
    isOpenDialogList,
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
        isOpenDialogList={isOpenDialogList}
        openDialogList={openDialogList}
      />
      {isOpenDialogList ?
        <DialogList
          dialogs={dialogs}
        />
        :
        <Dialog />
      }
    </MainLayout>
  );
}

export default ChatPage;
