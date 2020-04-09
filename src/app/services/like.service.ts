import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';

export interface Like {
  id?: number;
  userId?: number;
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

  add(like: Like): Observable<Like> {
    return this.http.put<Like>(BASE_URL + 'likes/flatcommentlikecreate/', JSON.stringify(like), this.options);
  }

  loadCommentsLike(id: number): Observable<number> {
    return this.http.get<number>(BASE_URL + 'likes/getfcommentlike/' + id);
  }

}
