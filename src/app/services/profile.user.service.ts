import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';
import {Landlord} from './profile.service';

@Injectable({providedIn: 'root'})
export class ProfileUserService {
  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  constructor(private http: HttpClient) {
  }
  private id = () => JSON.parse(localStorage.getItem('user')).userId;

  addUserData(): Observable<User> {
    return this.http.get<User>(BASE_URL + 'users/currentUser');
  }

  updateUserData(userData: User): Observable<User> {
    return this.http.put<User>(BASE_URL + 'users/update/all', JSON.stringify(userData), this.options);
  }

  addPassport(): Observable<Landlord> {
    return this.http.get<Landlord>(BASE_URL + 'passport/getPassport');
  }
}
