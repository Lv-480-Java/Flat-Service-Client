import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Chat} from '../model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatButtonService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://localhost:8080/api/chats/';

  getCurrentChatsByUserId(id: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseUrl + id);
  }
}
