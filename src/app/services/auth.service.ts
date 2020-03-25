import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../shared/interfaces';
import {Observable, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BASE_URL} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = BASE_URL + 'users/signIn';
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  login(user: User): Observable<any> {
    return this.http.post(this.url, user, {observe: 'response'})
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log("Authentication is working...");
    const {message} = error.error;
    console.log(error);
    if (message instanceof Object) {
      const entries = Object.entries(message);
      this.error$.next(entries[0][0] + " " + entries[0][1]);
    } else {
      this.error$.next(message);
    }
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accesstoken');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      return true;
    }
    return false;
  }
}
