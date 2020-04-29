import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  payForApartment(id: number) {
    return this.http.put(BASE_URL + `payment/request/${id}/pay`, null);
  }

}
