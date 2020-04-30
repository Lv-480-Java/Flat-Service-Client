import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';
import {MatSnackBar} from "@angular/material/snack-bar";

export interface FlatComment {
  id?: number;
  flatId?: number;
  userAuthor?: User;
  text?: string;
  commentLikes?: number;
  publicationDate?: any;
  commentAboutComment?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlatCommentService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  add(flatComment: FlatComment): Observable<FlatComment> {
    return this.http.post<FlatComment>(BASE_URL + 'flatcomments/create/', JSON.stringify(flatComment), this.options);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(BASE_URL + 'flatcomments/delete/' + id);
  }

  loadComments(id: number): Observable<FlatComment[]> {
    return this.http.get<FlatComment[]>(BASE_URL + 'flatcomments/getall/' + id);
  }

  loadCommentsByLikes(id: number): Observable<FlatComment[]> {
    return this.http.get<FlatComment[]>(BASE_URL + 'flatcomments/getallbylikes/' + id);
  }

  addC(flatComment: FlatComment): Observable<FlatComment> {
    return this.http.post<FlatComment>(BASE_URL + 'flatcomments/createcommentaboutcomment/', JSON.stringify(flatComment), this.options);
  }

  loadCommentsC(id: number): Observable<FlatComment[]> {
    return this.http.get<FlatComment[]>(BASE_URL + 'flatcomments/getallaboutcomment/' + id);
  }

}

