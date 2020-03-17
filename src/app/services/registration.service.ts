import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  url = BASE_URL + 'users/create';

  constructor(private http: HttpClient) {
  }

  register(userData) {
    return this.http.post<any>(this.url, userData);
  }
}
