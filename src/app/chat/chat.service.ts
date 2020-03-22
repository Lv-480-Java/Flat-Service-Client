import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(private http: HttpClient) {
  }
  url = 'http://localhost:8080/api/chat';

  getChatId(username: string, id: number): Observable<number> {
    return this.http.get<number>(this.url + '?recieverName=' + username + '&senderId=' + id);
  }
}

