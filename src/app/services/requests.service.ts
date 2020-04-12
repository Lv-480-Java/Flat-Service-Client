import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RequestsForFlatVerification} from '../admin-panel/requests/entity/requests-for-flat-verification';
import {RequestsForUserVerification} from '../admin-panel/requests/entity/request-for-user-verification';
import {BASE_URL} from '../utils/constants';



@Injectable({
  providedIn: 'root'
})
export class RequestsService {


  constructor(private http: HttpClient) {
  }

  getRequests(pageNumber: number, pageSize: number, type: string, status: string) {
    switch (type) {
      case 'FLATS':
        return this.http.get<RequestsForFlatVerification[]>(
          BASE_URL + `requests/flats?page=${pageNumber}&size=${pageSize}&status=${status}`);
      case 'RENTERS':
        return this.http.get<RequestsForFlatVerification[]>(
          BASE_URL + `requests/renters?page=${pageNumber}&size=${pageSize}&status=${status}`);
      case 'LANDLORDS':
        return this.http.get<RequestsForFlatVerification[]>(
          BASE_URL + `requests/landlords?page=${pageNumber}&size=${pageSize}&status=${status}`);
      case 'MODERATORS':
        return this.http.get<RequestsForFlatVerification[]>(
          BASE_URL + `requests/moderators?page=${pageNumber}&size=${pageSize}&status=${status}`);
    }
  }

  reviewRequest(id: number, type: string) {
    if (type === 'FLATS') {
      console.log(BASE_URL + `requests/review/flat/${id}`);
      return this.http.put<RequestsForFlatVerification>(BASE_URL + `requests/review/flat/${id}`, null);
    } else {
      console.log(BASE_URL + `requests/review/user/${id}`);
      return this.http.put<RequestsForUserVerification>(BASE_URL + `requests/review/user/${id}`, null);
    }
  }

  approveFlatRequests(id: number): Observable<RequestsForFlatVerification> {
    const url = BASE_URL + `requests/flats/${id}/approve`;
    console.log(url);
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  declineFlatRequests(id: number): Observable<RequestsForFlatVerification> {
    const url = BASE_URL + `requests/flats/${id}/decline`;
    console.log(url);
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  approveUserRequests(id: number): Observable<RequestsForUserVerification> {
    const url = BASE_URL + `requests/users/${id}/approve`;
    console.log(url);
    return this.http.put<RequestsForUserVerification>(url, null);
  }

  declineUserRequests(id: number): Observable<RequestsForUserVerification> {
    const url = BASE_URL + `requests/users/${id}/decline`;
    console.log(url);
    return this.http.put<RequestsForUserVerification>(url, null);
  }

  getNewRequests(): Observable<number> {
    console.log('get requests');
    return this.http.get<number>(BASE_URL + `requests/new`);
  }
}
