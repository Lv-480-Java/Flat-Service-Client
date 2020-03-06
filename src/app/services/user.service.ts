import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/users//create', user);
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/users/all');
  }

  removeUser(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/users/delete/${id}`);
  }
}
