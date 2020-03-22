import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  HostListener,
  OnInit,
  ViewChild,
  ViewChildren,
  EventEmitter,
  Output
} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Message} from '../model/message.model';
import {ChatMessageInfoDTO} from '../model/chat-message.model';
import {ChatService} from './chat.service';
import {DeleteMessageInfoDTO} from '../model/chat-message-delete.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


(window as any).global = window;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  constructor(private chatService: ChatService, private http: HttpClient) {
  }

  serverUrl = 'http://localhost:8080/api/ws/';
  baseUrl = 'http://localhost:8080/api/messages/';
  url = 'http://localhost:8080/api/chat';

  @Output()
  public onMessagesSeen: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  @Input() username: string;

  @Input()
  public browserNotificationsEnabled = true;

  @Input()
  public isCollapsed = false;

  @Input()
  public audioEnabled = true;

  @Input()
  public messageDatePipeFormat = 'short';

  @Input()
  public emojisEnabled = true;

  @Input()
  public linkfyEnabled = true;

  @Input()
  public browserNotificationIconSource = 'https://raw.githubusercontent.com/rpaschoal/ng-chat/master/src/ng-chat/assets/notification.png';

  @Input()
  public audioSource = 'https://raw.githubusercontent.com/rpaschoal/ng-chat/master/src/ng-chat/assets/notification.wav';

  private audioFile: HTMLAudioElement;

  private browserNotificationsBootstrapped = false;

  private stompClient;
  pageNumber: number;
  currentUserId: number;
  messages: Message[] = [];
  chatId: number;
  data: any;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chatMessageInfo: ChatMessageInfoDTO = new ChatMessageInfoDTO(null, null, null);
  windows: Window[] = [];
  private hasFocus: boolean;

  ngOnInit() {
    console.log(this.username);
    this.currentUserId = JSON.parse(localStorage.getItem('user')).userId;
    this.chatService.getChatId(this.username, this.currentUserId)
      .subscribe((data: number) => {
        this.chatId = data;
        this.loadMessages();
        this.initializeWebSocketConnection();
        this.scrollToBottom();
        this.initializeBrowserNotifications();
      });
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  loadMessages() {
    this.pageNumber = 0;
    this.getMessagesByChatId(this.chatId).subscribe(data => {
      this.data = data;
      this.messages = this.data;
    });
  }

  onScroll() {
    this.pageNumber = this.pageNumber + 1;
    this.loadNextPost();
    console.log(this.pageNumber);
  }

  getMessagesByChatId(id: number): Observable<Message[]> {
    console.log(this.pageNumber);
    return this.http.get<Message[]>(this.baseUrl + id + '/' + this.pageNumber);
  }

  loadNextPost() {
    this.getMessagesByChatId(this.chatId).subscribe(data => {
      this.data = data;
      this.messages = this.data.concat(this.messages);
      console.log(this.data);
    });
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  private async initializeBrowserNotifications() {
    if (this.browserNotificationsEnabled && ('Notification' in window)) {
      if (await Notification.requestPermission()) {
        this.browserNotificationsBootstrapped = true;
      }
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
      this.emitBrowserNotification(message);
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
        console.log(this.currentUser());
        console.log(this.chatMessageInfo.userId);
        this.bufferAudioFile();
        this.emitMessageSound();
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
/*
  unreadMessagesTotal(window: Window): string {
    let totalUnreadMessages = 0;

    if (window) {
      // tslint:disable-next-line:triple-equals
      totalUnreadMessages = window.messages.filter(x => x.senderId != this.currentUserId && !x.dateSeen).length;
    }
    return this.formatUnreadMessagesTotal(totalUnreadMessages);
  }
*/

  public currentUser(): boolean {
    return this.chatMessageInfo.userId !== this.currentUserId;
  }


  // Marks all messages provided as read with the current time.
  public markMessagesAsRead(messages: Message[]): void {
    const currentDate = new Date();

    messages.forEach((msg) => {
      msg.dateSeen = currentDate;
    });
  }

  toggleWindowFocus(): void {
    this.hasFocus = !this.hasFocus;
    if (this.hasFocus) {
      const unreadMessages = this.messages
        .filter(message => message.dateSeen == null
          && (message.senderId !== this.currentUserId));

      if (unreadMessages && unreadMessages.length > 0) {
        this.markMessagesAsRead(unreadMessages);
        this.onMessagesSeen.emit(unreadMessages);
      }
    }
  }

  private bufferAudioFile(): void {
    if (this.audioSource && this.audioSource.length > 0 && !this.hasFocus) {
      this.audioFile = new Audio();
      this.audioFile.src = this.audioSource;
      this.audioFile.load();
    }
  }

  private emitMessageSound(): void {
    if (this.audioEnabled && this.audioFile && !this.hasFocus) {
      this.audioFile.play();
    }
  }

  private emitBrowserNotification(message: string): void {
    console.log(this.hasFocus);
    if (this.browserNotificationsBootstrapped && message && !this.hasFocus) {
      const notification = new Notification(`${this.username}`, {
        body: this.chatMessageInfo.content,
        icon: this.browserNotificationIconSource
      });
      setTimeout(() => {
        notification.close();
      }, this.chatMessageInfo.content.length <= 50 ? 13000 : 17000); // More time to read longer messages
      console.log(this.chatMessageInfo.content);
    }
  }
}



