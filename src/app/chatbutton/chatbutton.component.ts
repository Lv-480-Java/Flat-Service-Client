import {Component, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChatButtonService} from './chatbutton.service';
import {Chat} from '../model/chat.model';
import {Theme} from './theme.enum';
import {ProfileService} from '../services/profile.service';



@Component({
  selector: 'app-chatbutton',
  templateUrl: './chatbutton.component.html',
  styleUrls: ['./chatbutton.component.scss'
  ]
})

export class ChatButtonComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  chats: Chat[] = [];
  countOfUnreadMessages: number;
  currentUserId: number;
  chatIsActive = false;
  chatListIsActive = false;
  public username: string;

  @Input()
  public customTheme: string;

  @Input()
  public theme: Theme = Theme.Light;

  unreadMessages: [];

  constructor(public profileService: ProfileService, private chatButtonService: ChatButtonService) {
  }

  ngOnInit() {
    this.profileService.getUserId().subscribe(data1 => {
      this.currentUserId = data1;
      this.chatButtonService.getCurrentChatsByUserId(this.currentUserId).subscribe(data => {
        this.chats = data;
        console.log(this.chats);
      });
      this.initializeTheme();
    });
  }

  isUserSelectedFromFriendsList(username: string) {
    if (this.chatIsActive === false) {
      this.chatIsActive = true;
      this.username = username;
      console.log(username);
    } else {
      this.chatIsActive = false;
    }
  }

  public messageSeen(event: any) {
    console.log(event);
  }

  isChatListSelected(event: any) {
    if (this.chatListIsActive === false) {
      this.chatListIsActive = true;
    } else {
    this.chatListIsActive = false;
    }
  }

  // TODO
  private initializeTheme(): void {
    if (this.customTheme) {
      this.theme = Theme.Custom;
    } else if (this.theme !== Theme.Light && this.theme !== Theme.Dark) {
      throw new Error(`Invalid theme configuration for ng-chat. "${this.theme}" is not a valid theme value.`);
    }
  }

  modalClosed(isClosed) {
    this.chatIsActive = false;
  }
}
