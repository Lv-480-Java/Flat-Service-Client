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
  Output, AfterViewInit, OnDestroy
} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Message} from '../model/message.model';
import {ChatMessageInfoDTO} from '../model/chat-message.model';
import {ChatService} from './chat.service';
import {DeleteMessageInfoDTO} from '../model/chat-message-delete.model';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ISubscription} from 'rxjs/Subscription';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {ProfileService} from '../services/profile.service';
import {UpdateMessageDTO} from '../model/chat-message-dateSeen.model';
import {CounterOfUnreadMessagesDTO} from '../model/chat-message-count';


(window as any).global = window;

@AutoUnsubscribe()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {

  constructor(public profileService: ProfileService, private chatService: ChatService, private http: HttpClient) {
  }

  private countOfMessages: Observable<number>;
  private myScrollVariable: number | any;

  serverUrl = 'http://localhost:8080/api/ws/';
  baseUrl = 'http://localhost:8080/api/messages/';
  url = 'http://localhost:8080/api/chat';

  @Output()
  public onMessagesSeen: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();

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
  number: number;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chatMessageInfo: ChatMessageInfoDTO = new ChatMessageInfoDTO(null, null, null);
  windows: Window[] = [];
  private hasFocus: boolean;
  private notThisUser: boolean;
  subscriptions: Subscription = new Subscription();


  ngOnInit() {
    console.log(this.username);
    this.subscriptions.add(this.profileService.getUserId().subscribe(data1 => {
      this.currentUserId = data1;
      this.subscription();
    }));
  }

  subscription() {
    this.subscriptions.add(this.chatService.getChatId(this.username, this.currentUserId)
      .subscribe((data: number) => {
        this.chatId = data;
        this.loadMessages();
        this.initializeWebSocketConnection();
        this.scrollToBottom();
        this.initializeBrowserNotifications();
      }));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
    /*
            this.onScroll();
    */
  }

  ngAfterViewInit() {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy() {
  }

  loadMessages() {
    this.pageNumber = 0;
    this.subscriptions.add((this.getMessagesByChatId(this.chatId).subscribe(data => {
      this.data = data;
      this.messages = this.data;
    })));
  }

  onScroll() {
    const currentPosition = this.myScrollContainer.nativeElement.scrollTop;
    this.pageNumber = this.pageNumber + 1;
    this.loadNextPost();
    console.log(this.pageNumber);
    this.myScrollContainer.nativeElement.scrollTop = currentPosition;
  }

  getMessagesByChatId(id: number): Observable<Message[]> {
    console.log(this.pageNumber);
    return this.http.get<Message[]>(this.baseUrl + id + '/' + this.pageNumber);
  }

  loadNextPost() {
    this.subscriptions.add(this.getMessagesByChatId(this.chatId).subscribe(data => {
      this.data = data;
      this.messages = this.data.concat(this.messages);
      console.log(this.data);
    }));
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
    this.subscriptions.add(this.stompClient.subscribe('/topic/messages/' + this.chatId, (message) => {
      this.handleResult(message);
      this.emitBrowserNotification(message);
    }));
  }


  handleResult(message) {

    if (message.body) {
      if ('deleted' === message.body.toString().substr(11, 7)) {
        const deletedMessage: DeleteMessageInfoDTO = JSON.parse(message.body);
        this.messages.splice(this.messages.findIndex(mes => mes.id === deletedMessage.messageId), 1);
      } else if ('updated' === message.body.toString().substr(11, 7)) {
        const updatedMessage: UpdateMessageDTO = JSON.parse(message.body);
        this.messages.findIndex(mes => mes.id === updatedMessage.messageId);
      } else if ('unread' === message.body.toString().substr(11, 6)) {
        const updatedMessage: UpdateMessageDTO = JSON.parse(message.body);
        /*
                this.messages.findIndex(mes => mes.id === updatedMessage.chatId);
        */
      } else {
        const messageResult: Message = JSON.parse(message.body);
        this.messages.push(messageResult);
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
      this.countOfUnreadMessages(this.chatId);
      console.log(this.countOfUnreadMessages(this.chatId));
      console.log(this.unreadMessagesTotal());
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

  updateDataSeen(messages: Message[]) {
    /*JSON.stringify(messages);*/
    const currentDate = new Date();
    messages.forEach((msg) => {
      this.stompClient.send('/chat/updateDate/message', {}, JSON.stringify(new UpdateMessageDTO(msg.id, msg.chatId, msg.senderId)));
      msg.dateSeen = currentDate;
    });
    console.log('UPDATEUPDATEUPDATE');
  }

  countOfUnreadMessages(id: number) {
    this.stompClient.send('/chat/countUnread/message', {}, JSON.stringify(new CounterOfUnreadMessagesDTO(id)));
    console.log('CountOfUnreadMessage');
  }

  private formatUnreadMessagesTotal(totalUnreadMessages: number): string {
    if (totalUnreadMessages >= 0) {
      if (totalUnreadMessages > 24) {
        return '24+';
      } else {
        return String(totalUnreadMessages);
      }
    }
  }

  unreadMessagesTotal(): string {
    let totalUnreadMessages = 0;
    if (this.messages) {
      totalUnreadMessages = this.messages.filter(x => x.senderId !== this.currentUserId && !x.dateSeen).length;
      console.log(totalUnreadMessages);
    }
    return this.formatUnreadMessagesTotal(totalUnreadMessages);
  }

  public currentUser() {
    this.notThisUser = true;
    if (this.messages.filter(message => message.senderId !== this.currentUserId)) {
      return this.notThisUser;
    } else {
      return !this.notThisUser;
    }
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
        /*this.markMessagesAsRead(unreadMessages);*/
        this.updateDataSeen(unreadMessages);
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
    if (this.audioEnabled && this.audioFile && !this.hasFocus && this.currentUser()) {
      this.audioFile.play();
    }
  }

  private emitBrowserNotification(message: string): void {
    if (this.browserNotificationsBootstrapped && message && !this.hasFocus && this.currentUser()) {
      const notification = new Notification(`${this.username}`, {
        body: 'You have unread messages',
        icon: this.browserNotificationIconSource
      });
      /*   setTimeout(() => {
           notification.close();
         }, this.chatMessageInfo.content.length <= 50 ? 13000 : 17000); // More time to read longer messages
         console.log(this.chatMessageInfo.content);*/
    }
  }

  closeModal() {
    this.onClose.emit(true);
    this.ngOnDestroy();
  }
}



