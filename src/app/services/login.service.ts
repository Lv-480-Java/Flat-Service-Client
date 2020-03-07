import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:8080/users/signIn';

  constructor(private http: HttpClient) {
  }

  signIn(userData) {
    return this.http.post<any>(this.url, userData);
  }

}
