import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';
import {FlatComment} from './flat-comment.service';
import {UserComment} from './user-comment.service';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Complaint {
  id?: number;
  userAuthor?: User;
  flatComment?: FlatComment;
  userComment?: UserComment;
  text: string;
}

export interface ComplaintId {
  flatCommentId?: number;
  userCommentId?: number;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  addComplaintFlatComment(complaintId: ComplaintId): Observable<Complaint> {
    return this.http.post<Complaint>(BASE_URL + 'complaints/createflatcommentcomplaint/', JSON.stringify(complaintId), this.options)
  }

  addComplaintUserComment(complaintId: ComplaintId): Observable<Complaint> {
    return this.http.post<Complaint>(BASE_URL + 'complaints/createusercommentcomplaint/', JSON.stringify(complaintId), this.options);
  }

  loadComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(BASE_URL + 'complaints/getall/');
  }


}

