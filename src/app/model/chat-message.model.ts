
export class ChatMessageInfoDTO {
    chatId: number;
    userId: number;
    content: string;


  constructor(chatId: number, userId: number, content: string) {
    this.chatId = chatId;
    this.userId = userId;
    this.content = content;
  }
}
