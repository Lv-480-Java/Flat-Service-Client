
export class UpdateMessageDTO {
  messageId: number;
  chatId: number;
  userId: number;

  constructor(messageId: number, chatId: number, userId: number) {
    this.messageId = messageId;
    this.chatId = chatId;
    this.userId = userId;
  }
}
