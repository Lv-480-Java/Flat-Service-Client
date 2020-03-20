import {AfterViewChecked, Component, ElementRef, Input, HostListener, OnInit, ViewChild, ViewChildren} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Message} from '../model/message.model';
import {ChatMessageInfoDTO} from '../model/chat-message.model';
import {ChatService} from './chat.service';
/*import {Comment} from '../../model/comment.model';*/
import {DeleteMessageInfoDTO} from '../model/chat-message-delete.model';
import {Window} from '../model/window';
import {IChatOption} from '../model/chat-option';
import {IChatGroupAdapter} from '../model/chat-group-adapter';
import {ChatParticipantType} from '../model/chat-participant-type.enum';
import {Observable} from 'rxjs';


(window as any).global = window;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) {
  }

  @Input() username: string;

  public ChatParticipantType = ChatParticipantType;
  /* public ChatParticipantStatus = ChatParticipantStatus;
   public MessageType = MessageType;*/

  public currentActiveOption: IChatOption | null;

  /*@Input() chatId: Observable<Object>;*/

  @Input()
  public isCollapsed = false;

  @Input()
  public groupAdapter: IChatGroupAdapter;

  @Input()
  public messageDatePipeFormat = 'short';

  @Input()
  public emojisEnabled = true;

  @Input()
  public linkfyEnabled = true;

  @ViewChild('content') content: ElementRef;

/*
  serverUrl = 'http://localhost:8080/ws/';
*/
  serverUrl = 'http://localhost:8080/api/ws/';

  private stompClient;
  currentUserId: number;
  // tslint:disable-next-line:ban-types
  msg: String;
  messages: Message[] = [];
  chatId: number;
  data: any;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chatMessageInfo: ChatMessageInfoDTO = new ChatMessageInfoDTO(null, null, null);
  showEmojiPicker = false;
  windows: Window[] = [];

  ngOnInit() {
    // this.authService.getCurrentUser().subscribe(data => this.currentAccountId = data.id);
    console.log(this.username);
    this.currentUserId = JSON.parse(localStorage.getItem('user')).userId;
    this.chatService.getChatId(this.username, this.currentUserId)
      .subscribe((data: number) => {
        this.chatId = data;
        this.chatService.getMessagesByChatId(this.chatId).subscribe(data1 => this.messages = data1);
        this.initializeWebSocketConnection();
        this.scrollToBottom();
      });
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }


  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.openSocket();
    });
  }

  openSocket() {
    this.stompClient.subscribe('/topic/messages/' + this.chatId, (message) => {
      this.handleResult(message);
    });
  }


  handleResult(message) {

    if (message.body) {
      if ('deleted' === message.body.toString().substr(11, 7)) {
        const deletedMessage: DeleteMessageInfoDTO = JSON.parse(message.body);
        this.messages.splice(this.messages.findIndex(mes => mes.id === deletedMessage.messageId), 1);
      } else {
        const messageResult: Message = JSON.parse(message.body);
        this.messages.push(messageResult);
      }
    }
  }

  sendMessage(message: string) {
    message = message.trim();
    if (message !== '') {
      this.chatMessageInfo.chatId = this.chatId;
      this.chatMessageInfo.userId = this.currentUserId;
      this.chatMessageInfo.content = message;
      console.log(message);
      this.stompClient.send('/chat/send/message', {}, JSON.stringify(this.chatMessageInfo));
    }
  }

  deleteMessage(mes) {
    const isSubmit = confirm('Do you really want to delete a message?');
    console.log(this.messages);
    if (isSubmit) {
      this.stompClient.send('/chat/delete/message', {}, JSON.stringify(new DeleteMessageInfoDTO(mes.chatId, mes.id, mes.senderId)));
    }
    console.log('delete message');
  }

  /*  getImageString(id: number) {
      return 'http://localhost:8080/accounts/' + id + '/image';
    }*/

  onChatTitleClicked(event: any): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /* onChatWindowClicked(window: Window): void {
     window.isCollapsed = !window.isCollapsed;
     this.scrollToBottom();
   }*/

  /*
    onCloseChatWindow(window: Window): void {
      const index = this.windows.indexOf(window);

      this.windows.splice(index, 1);

      this.updateWindowsState(this.windows);

      this.onParticipantChatClosed.emit(window.participant);
    }
  */

  private formatUnreadMessagesTotal(totalUnreadMessages: number): string {
    if (totalUnreadMessages > 0) {

      if (totalUnreadMessages > 99) {
        return '99+';
      } else {
        return String(totalUnreadMessages);
      }
    }
  }

  // Returns the total unread messages from a chat window. TODO: Could use some Angular pipes in the future
  unreadMessagesTotal(window: Window): string {
    let totalUnreadMessages = 0;

    if (window) {
      // tslint:disable-next-line:triple-equals
      totalUnreadMessages = window.messages.filter(x => x.fromId != this.currentUserId && !x.dateSeen).length;
    }
    return this.formatUnreadMessagesTotal(totalUnreadMessages);
  }


  /*  public defaultWindowOptions(currentWindow: Window): IChatOption[] {
      // tslint:disable-next-line:triple-equals
      if (this.groupAdapter && currentWindow.participant.participantType == ChatParticipantType.User) {
        return [{
          isActive: false,
          action: (chattingWindow: Window) => {

            this.selectedUsersFromFriendsList = this.selectedUsersFromFriendsList.concat(chattingWindow.participant as unknown as User);
          },
          validateContext: (participant: IChatParticipant) => {
            // tslint:disable-next-line:triple-equals
            return participant.participantType == ChatParticipantType.User;
          },
          displayLabel: 'Add People' // TODO: Localize this
        }];
      }*/


  /*triggerToggleChatWindowVisibility(userId: any): void {
    const openedWindow = this.windows.find(x => x.participant.id == userId);

  if (openedWindow) {
    this.onChatWindowClicked(openedWindow);
  }
  }*/
}



