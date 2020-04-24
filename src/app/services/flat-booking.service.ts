import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from '../utils/constants';
import {Observable} from "rxjs";
import {RequestsForFlatVerification} from "../admin-panel/requests/entity/requests-for-flat-verification";

@Injectable({
  providedIn: 'root'
})
export class FlatBookingService {

  constructor(private http: HttpClient) {
  }

  bookApartment(id: number): Observable<any> {
    console.log(id);
    return this.http.post(BASE_URL + `booking/flat`, id);
  }

  getLandlordRequests(pageNumber: number, pageSize: number, status: string): Observable<any> {
    return this.http.get(BASE_URL + `booking/get-requests/landlord?page=${pageNumber}&size=${pageSize}&status=${status}`);
  }

  getRenterRequests(): Observable<any> {
    return this.http.get<RequestsForFlatVerification[]>(BASE_URL + `booking/get-requests/renter`)
  }

  getActiveRenterRequests(): Observable<any> {
    return this.http.get<RequestsForFlatVerification[]>(BASE_URL + `booking/get-active-requests/renter`)
  }

  getDeclinedRenterRequests(): Observable<any> {
    return this.http.get<RequestsForFlatVerification[]>(BASE_URL + `booking/get-declined-requests/renter`)
  }

  approveRequestForFlatBooking(id: number): Observable<RequestsForFlatVerification> {
    return this.http.put<RequestsForFlatVerification>(BASE_URL + `booking/flat/${id}/approve`, null);
  }

  declineRequestForFlatBooking(id: number): Observable<RequestsForFlatVerification> {
    return this.http.put<RequestsForFlatVerification>(BASE_URL + `booking/flat/${id}/decline`, null);
  }

  reviewRequest(id: number): Observable<RequestsForFlatVerification> {
    return this.http.put<RequestsForFlatVerification>(BASE_URL + `booking/flat/${id}/review`, null);
  }

  getNewLandlordRequests(): Observable<number> {
    return this.http.get<number>(BASE_URL + `booking/new-requests`);
  }
}
