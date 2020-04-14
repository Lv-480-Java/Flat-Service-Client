import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(private http: HttpClient) {
  }
  url = BASE_URL + 'chat';

  getChatId(username: string, id: number): Observable<number> {
    return this.http.get<number>(this.url + '?recieverName=' + username + '&senderId=' + id);
  }

  countOfMessages(id: number): Observable<number> {
    return this.http.get<number>(this.url + 's/' + id + '/count');
  }

}

