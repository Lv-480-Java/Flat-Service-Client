import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';


export interface UserComment {
  id?: number;
  userId?: number;
  userAuthor?: User;
  text?: string;
  commentLikes?: number;
  publicationDate?: any;
  commentAboutComment?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserCommentService {

  constructor(private http: HttpClient) {
  }

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  add(userComment: UserComment): Observable<UserComment> {
    return this.http.post<UserComment>(BASE_URL + 'usercomments/create/', JSON.stringify(userComment), this.options);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(BASE_URL + 'usercomments/delete/' + id);
  }

  loadComments(id: number): Observable<UserComment[]> {
    return this.http.get<UserComment[]>(BASE_URL + 'usercomments/getall/' + id);
  }

  loadCommentsByLikes(id: number): Observable<UserComment[]> {
    return this.http.get<UserComment[]>(BASE_URL + 'usercomments/getallbylikes/' + id);
  }

  addC(userComment: UserComment): Observable<UserComment> {
    return this.http.post<UserComment>(BASE_URL + 'usercomments/createcommentaboutcomment/', JSON.stringify(userComment), this.options);
  }

  loadCommentsC(id: number): Observable<UserComment[]> {
    return this.http.get<UserComment[]>(BASE_URL + 'usercomments/getallaboutcomment/' + id);
  }


}
