import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';

export interface Like {
  flatCommentId?: number;
  userCommentId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) {
  }

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  addFlat(like: Like): Observable<Like> {
    return this.http.put<Like>(BASE_URL + 'likes/flatcommentlikecreate/', JSON.stringify(like), this.options);
  }

  addUser(like: Like): Observable<Like> {
    return this.http.put<Like>(BASE_URL + 'likes/usercommentlikecreate/', JSON.stringify(like), this.options);
  }


}
