import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(BASE_URL + 'users/create', user,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  getAllUserByPage(pageNumber: number, pageSize: number) {
    return this.http.get(BASE_URL + `users/all/${pageNumber}/${pageSize}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(BASE_URL + 'users/update/all', user);
  }

  removeUser(id: string): Observable<void> {
    return this.http.delete<void>(BASE_URL + `users/delete/${id}`);
  }

  getUser(id: number): Observable<User> {
    console.log(id);
    return this.http.get<User>(BASE_URL + `users/${id}`);
  }
}
