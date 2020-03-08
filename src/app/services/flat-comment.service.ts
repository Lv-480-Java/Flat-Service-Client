import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/interfaces';
import {map} from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

  add(flatComment: FlatComment): Observable<FlatComment> {
    return this.http.post<FlatComment>('http://localhost:8080/flatcomments/create/', {flatComment});
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>('http://localhost:8080/flatcomments//delete/' + id);
  }

  loadComments(id: number): Observable<FlatComment[]>{
    return this.http.get<FlatComment[]>('http://localhost:8080/flatcomments/getall/' + id);
  }


}
