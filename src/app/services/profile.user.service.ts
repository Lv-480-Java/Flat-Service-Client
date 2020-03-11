import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';

@Injectable({providedIn: 'root'})
export class ProfileUserService {

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  constructor(private http: HttpClient) {
  }

  addUserData(): Observable<User> {
    return this.http.get<User>(BASE_URL + 'user/1');
  }

  updateUserData(userData: User): Observable<User> {
    return this.http.post<User>(BASE_URL + 'userUpdate/1', JSON.stringify(userData), this.options);
  }
}
