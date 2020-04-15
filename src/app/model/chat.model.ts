
export class Chat {
  id: number;
  messagesId: string;
  senderId: number;
  receiverId: number;
  senderUsername: string;
  receiverUsername: string;
  chatId: number;
  countOfUnreadMessages: number;

  constructor(id: number, messagesId: string, senderId: number, receiverId: number,
              senderUsername: string, receiverUsername: string,  chatId: number, countOfUnreadMessages: number) {
    this.id = id;
    this.messagesId = messagesId;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.senderUsername = senderUsername;
    this.receiverUsername = receiverUsername;
    this.chatId = chatId;
    this.countOfUnreadMessages = countOfUnreadMessages;
  }
}
