import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Chat} from '../model/chat.model';
import {BASE_URL} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ChatButtonService {

  constructor(private http: HttpClient) {
  }

  baseUrl = BASE_URL + 'chats/';

  getCurrentChatsByUserId(id: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseUrl + id);
  }


  countOfUnreadMessages(id: number): Observable<number> {
    return this.http.get<number>(this.baseUrl +  + id + '/countUnread');
  }
}
