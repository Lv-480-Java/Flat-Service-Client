import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/users/create', user,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  getAllUserByPage(pageNumber: number, pageSize: number) {
    return this.http.get(`http://localhost:8080/users/all/${pageNumber}/${pageSize}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>('http://localhost:8080/users/update/all', user);
  }


  removeUser(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/users/delete/${id}`);
  }
}
