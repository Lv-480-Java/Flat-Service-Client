import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';
import {catchError} from 'rxjs/operators';
import {PaymentDto} from '../admin-panel/component/PaymentDto';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public error$: Subject<string> = new Subject<string>();
  public errorUsername$: Subject<string> = new Subject<string>();
  public errorEmail$: Subject<string> = new Subject<string>();
  public errorPhone$: Subject<string> = new Subject<string>();
  public errorPassword$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(BASE_URL + 'users/create', user, {observe: 'response'})
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getAllUserByPage(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(BASE_URL + `users/admin/all?page=${pageNumber}&size=${pageSize}`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(BASE_URL + 'users/admin/update', user, {observe: 'response'})
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  removeUser(id: string): Observable<any> {
    return this.http.delete<any>(BASE_URL + `users/delete/${id}`, {observe: 'response'})
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  searchUserByUsername(username: string, page: number, size: number) {
    return this.http.get(BASE_URL + `users/search/username?page=${page}&size=${size}&username=${username}`);
  }

  searchUserByEmail(email: string, page: number, size: number) {
    return this.http.get(BASE_URL + `users/search/email?page=${page}&size=${size}&email=${email}`);
  }

  searchUserByPhoneNumber(phoneNumber: string, page: number, size: number) {
    return this.http.get(BASE_URL + `users/search/phone?page=${page}&size=${size}&phone=${phoneNumber}`);
  }

  getUser(id: number): Observable<User> {
    console.log(id);
    return this.http.get<User>(BASE_URL + `users/${id}`);
  }

  doPay(): void {
    console.log('Ok');
  }

  private handleError(error: HttpErrorResponse) {
    console.log('Registration is working...');
    const {message} = error.error;
    console.log(error);
    if (message instanceof Object) {
      if (message.username !== undefined) {
        this.errorUsername$.next(message.username);
      }

      if (message.email !== undefined) {
        this.errorEmail$.next(message.email);
      }

      if (message.phone !== undefined) {
        this.errorPhone$.next(message.phone);
      }

      if (message.password !== undefined) {
        this.errorPassword$.next(message.password);
      }
    }

  }
}
