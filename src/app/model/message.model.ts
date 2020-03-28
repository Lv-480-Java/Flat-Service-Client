
export class Message {
  id: number;
  content: string;
  sendTime: string;
  senderId: number;
  private senderUsername: string;
  chatId: number;
  public dateSeen?: Date;

  constructor(id: number, content: string, sendTime: string, senderId: number, senderUsername: string,  chatId: number, dataSeen: Date) {
    this.id = id;
    this.content = content;
    this.sendTime = sendTime;
    this.senderId = senderId;
    this.senderUsername = senderUsername;
    this.chatId = chatId;
    this.dateSeen = dataSeen;
  }
}
