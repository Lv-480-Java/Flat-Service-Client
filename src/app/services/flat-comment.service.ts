import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';

export interface FlatComment {
  id?: number;
  flatId?: number;
  userAuthor?: User;
  text: string;
  publicationDate?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FlatCommentService {

  constructor(private http: HttpClient) {
  }

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  add(flatComment: FlatComment): Observable<FlatComment> {
    return this.http.post<FlatComment>('/api/flatcomments/create/', JSON.stringify(flatComment), this.options);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>('/api/flatcomments/delete/' + id);
  }

  loadComments(id: number): Observable<FlatComment[]> {
    return this.http.get<FlatComment[]>('/api/flatcomments/getall/' + id);
  }


}
