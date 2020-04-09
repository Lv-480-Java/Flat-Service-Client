import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';
import {FlatComment} from './flat-comment.service';
import {UserComment} from './user-comment.service';

export interface Complaint {
  id?: number;
  userAuthor?: User;
  flatComment?: FlatComment;
  userComment?: UserComment;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) {
  }

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  addComplaint(complaint: Complaint): Observable<void> {
    return this.http.put<void>(BASE_URL + 'complaints/', JSON.stringify(complaint), this.options);
  }

  loadComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(BASE_URL + 'complaints/');
  }

}

