import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  template: string;

  constructor(private http: HttpClient) {
  }

  displayAgreement(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(BASE_URL + `agreement/display/${id}`, {headers, responseType: 'text'});
  }

  sendAgreementToLandlord(id: number) {
    return this.http.put(BASE_URL + `agreement/send/${id}`, null);
  }

  acceptRenterAgreement(id: number) {
    return this.http.put(BASE_URL + `agreement/accept/${id}`, this.template);
  }

}
