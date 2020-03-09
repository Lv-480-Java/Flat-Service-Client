import { Message } from '../chat/message';
/*import { User } from "./user";
import { ChatParticipantType } from "./chat-participant-type.enum";
import { ChatParticipantStatus } from "./chat-participant-status.enum";
import { Group } from "./group";*/
import { IChatParticipant } from '../chat/chat-participant';

export class Window {
  constructor(participant: IChatParticipant, isLoadingHistory: boolean, isCollapsed: boolean) {
    this.participant = participant;
    this.messages =  [];
     // this.isLoadingHistory = isLoadingHistory;
    // this.hasFocus = false; // This will be triggered when the 'newMessage' input gets the current focus
    this.isCollapsed = isCollapsed;
/*    this.hasMoreMessages = false;
    this.historyPage = 0;*/
  }

  public participant: IChatParticipant;
  public messages: Message[] = [];
  public newMessage = '';

  // UI Behavior properties
  public isCollapsed = false;
  public isLoadingHistory = false;
  public hasFocus = false;
  public hasMoreMessages = true;
  public historyPage = 0;
}
