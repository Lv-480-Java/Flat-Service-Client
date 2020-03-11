import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../admin-panel/component/Users';
import {Observable} from 'rxjs';
import {RequestsForFlatVerification} from '../admin-panel/requests/entity/requests-for-flat-verification';
import {RequestsForUserVerification} from '../admin-panel/requests/entity/request-for-user-verification';
import {BASE_URL} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  path = 'api';

  constructor(private http: HttpClient) {
  }

  getFlatRequests(): Observable<RequestsForFlatVerification[]> {
    return this.http.get<RequestsForFlatVerification[]>(BASE_URL + 'admin/requests/flats');
  }

  getLandlordRequests(): Observable<RequestsForUserVerification[]> {
    return this.http.get<RequestsForUserVerification[]>(BASE_URL + 'admin/requests/users/landlords');
  }

  getModeratorRequests(): Observable<RequestsForUserVerification[]> {
    return this.http.get<RequestsForUserVerification[]>(BASE_URL + 'admin/requests/users/moderators');
  }

  approveFlatRequests(id: number): Observable<RequestsForFlatVerification> {
    const url = BASE_URL + 'admin/requests/flats/${id}/approve';
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  declineFlatRequests(id: number): Observable<RequestsForFlatVerification> {
    const url = BASE_URL + 'admin/requests/flats/${id}/decline';
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  approveUserRequests(id: number): Observable<RequestsForFlatVerification> {
    const url = BASE_URL + 'admin/requests/users/${id}/approve';
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  declineUserRequests(id: number): Observable<RequestsForFlatVerification> {
    const url = BASE_URL + 'admin/requests/users/${id}/decline';
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  countActiveFlats(): Observable<number> {
    return this.http.get<number>(BASE_URL + 'admin/statistics/active-flats');
  }

  countActiveUsers(): Observable<number> {
    return this.http.get<number>(BASE_URL + 'admin/statistics/active-users');
  }

  countActiveLandlords(): Observable<number> {
    return this.http.get<number>(BASE_URL + 'admin/statistics/active-landlords');
  }

  getAllUsersCount(start, end): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/users-dynamics/${end}/${start}');
  }

  getAllLandlordsCount(start, end): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/landlords-dynamics/${end}/${start}');
  }

  getMonthNames(start, end): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/month-names/${end}/${start}');
  }

  getUsersData(): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/users-landlords');
  }

  getFlatsData(): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/active-unactive-flats');
  }

  getCommentsData(): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/count-comments');
  }

  getRegisteredUsersForWeek(): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/user-registration-dynamics/7');
  }

  getCreatedFlatsForWeek(): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/flat-creation-dynamics/7');
  }

}
