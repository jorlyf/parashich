import { DialogMessageStatus } from "..";

export default interface DialogMessage {
  id: string;
  dialogId: string;
  senderUserId: string;
  text: string | null;
  status: DialogMessageStatus;
}