import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Message} from '../model/message.model';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://localhost:8080/api/messages/';
  url = 'http://localhost:8080/api/chat';
/*  url = '/api/chat';
  baseUrl = '/api/messages/';*/
  getMessagesByChatId(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + id);
  }

  getChatId(username: string, id: number): Observable<number> {
      return this.http.get<number>(this.url + '?recieverName=' + username + '&senderId=' + id);
  }
}


