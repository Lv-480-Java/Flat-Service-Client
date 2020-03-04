import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {
  constructor(private http: HttpClient) {
  }

  postData(user: User) {
    const body = {
      username: user.username,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber
    };
    return this.http.post('http://localhost:8080/users', body);
  }
}
