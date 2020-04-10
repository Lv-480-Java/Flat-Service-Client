import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from '../utils/constants';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlatBookingService {

  constructor(private http: HttpClient) {
  }

  bookApartment(id: number): Observable<any> {
    console.log(id);
    return this.http.post(BASE_URL + `requests/book-flat`, id);
  }
}
