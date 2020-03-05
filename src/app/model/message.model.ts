
export class Message {
  id: number;
  content: string;
  sendTime: string;
  senderId: number;
  private senderUsername: string;
  chatId: number;

  constructor(id: number, content: string, sendTime: string, senderId: number, senderUsername: string,  chatId: number) {
    this.id = id;
    this.content = content;
    this.sendTime = sendTime;
    this.senderId = senderId;
    this.senderUsername = senderUsername;
    this.chatId = chatId;
  }
}
