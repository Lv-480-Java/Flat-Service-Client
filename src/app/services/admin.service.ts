import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../admin-panel/component/interfaces';
import {Observable} from 'rxjs';
import {RequestsForUserVerification} from '../admin-panel/requests/entity/requests-for-user-verification';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getFlatRequests(): Observable<RequestsForUserVerification[]> {
    return this.http.get<RequestsForUserVerification[]>('http://localhost:8080/admin/requests/flats');
  }

  getLandlordRequests(): Observable<RequestsForUserVerification[]> {
    return this.http.get<RequestsForUserVerification[]>('http://localhost:8080/admin/requests/flats');
  }

  getModeratorRequests(): Observable<RequestsForUserVerification[]> {
    return this.http.get<RequestsForUserVerification[]>('http://localhost:8080/admin/requests/flats');
  }

  approveFlatRequests(id: number): Observable<RequestsForUserVerification> {
    const url = `http://localhost:8080/admin/requests/flats/${id}/approve`;
    return this.http.put<RequestsForUserVerification>(url, null);
  }

  declineFlatRequests(id: number): Observable<RequestsForUserVerification> {
    const url = `http://localhost:8080/admin/requests/flats/${id}/decline`;
    return this.http.put<RequestsForUserVerification>(url, null);
  }

  approveUserRequests(id: number): Observable<RequestsForUserVerification> {
    const url = `http://localhost:8080/admin/requests/user/${id}/approve`;
    return this.http.put<RequestsForUserVerification>(url, null);
  }

  declineUserRequests(id: number): Observable<RequestsForUserVerification> {
    const url = `http://localhost:8080/admin/requests/user/${id}/decline`;
    return this.http.put<RequestsForUserVerification>(url, null);
  }

}
