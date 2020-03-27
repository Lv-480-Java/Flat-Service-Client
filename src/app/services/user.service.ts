import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  createUser(user: User) {
    return this.http.post<User>(BASE_URL + 'users/create', user);
  }

  getAllUserByPage(pageNumber: number, pageSize: number) {
    return this.http.get(BASE_URL + `users/all/${pageNumber}/${pageSize}`);
  }

  updateUser(user: User) {
    return this.http.put<User>(BASE_URL + 'users/update/all', user);
  }

  removeUser(id: string): Observable<void> {
    return this.http.delete<void>(BASE_URL + `users/delete/${id}`);
  }

  searchUserByUsername(username: string, page: number, size: number) {
    return this.http.get(BASE_URL + `users/username/${username}/${page}/${size}`);
  }

  searchUserByEmail(email: string, page: number, size: number) {
    return this.http.get(BASE_URL + `users/email/${email}/${page}/${size}`);
  }

  searchUserByPhoneNumber(phoneNumber: string, page: number, size: number) {
    return this.http.get(BASE_URL + `users/phone/${phoneNumber}/${page}/${size}`);
  }
}
