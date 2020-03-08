import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../admin-panel/component/interfaces';
import {Observable} from 'rxjs';
import {RequestsForFlatVerification} from '../admin-panel/requests/entity/requests-for-flat-verification';
import {RequestsForUserVerification} from '../admin-panel/requests/entity/request-for-user-verification';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getFlatRequests(): Observable<RequestsForFlatVerification[]> {
    return this.http.get<RequestsForFlatVerification[]>('http://localhost:8080/admin/requests/flats');
  }

  getLandlordRequests(): Observable<RequestsForUserVerification[]> {
    return this.http.get<RequestsForUserVerification[]>('http://localhost:8080/admin/requests/users/landlords');
  }

  getModeratorRequests(): Observable<RequestsForUserVerification[]> {
    return this.http.get<RequestsForUserVerification[]>('http://localhost:8080/admin/requests/users/moderators');
  }

  approveFlatRequests(id: number): Observable<RequestsForFlatVerification> {
    const url = `http://localhost:8080/admin/requests/flats/${id}/approve`;
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  declineFlatRequests(id: number): Observable<RequestsForFlatVerification> {
    const url = `http://localhost:8080/admin/requests/flats/${id}/decline`;
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  approveUserRequests(id: number): Observable<RequestsForFlatVerification> {
    const url = `http://localhost:8080/admin/requests/user/${id}/approve`;
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  declineUserRequests(id: number): Observable<RequestsForFlatVerification> {
    const url = `http://localhost:8080/admin/requests/user/${id}/decline`;
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  countActiveFlats(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/admin/statistics/active-flats');
  }

  countActiveUsers(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/admin/statistics/active-users');
  }

  countActiveLandlords(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/admin/statistics/active-landlords');
  }

  getAllUsersCount(): Observable<Array<number>> {
    return this.http.get<Array<number>>('http://localhost:8080/admin/statistics/users-dynamics');
  }

  getAllLandlordsCount(): Observable<Array<number>> {
    return this.http.get<Array<number>>('http://localhost:8080/admin/statistics/landlords-dynamics');
  }

  getUsersData(): Observable<Array<number>> {
    return this.http.get<Array<number>>('http://localhost:8080/admin/statistics/users-landlords');
  }

  getFlatsData(): Observable<Array<number>> {
    return this.http.get<Array<number>>('http://localhost:8080/admin/statistics/active-unactive-flats');
  }

  getRegisteredUsers(): Observable<Array<number>> {
    return this.http.get<Array<number>>('http://localhost:8080/admin/statistics/user-regisration-dynamics');
  }

  getCreatedFlats(): Observable<Array<number>> {
    return this.http.get<Array<number>>('http://localhost:8080/admin/statistics/flat-creation-dynamics');
  }

  getUserCommentsCount(): Observable<Array<number>> {
    return this.http.get<Array<number>>('http://localhost:8080/admin/statistics/user-comments-dynamics');
  }

  getFlatCommentsCount(): Observable<Array<number>> {
    return this.http.get<Array<number>>('http://localhost:8080/admin/statistics/flat-comments-dynamics');
  }


}
