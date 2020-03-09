import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `/api/users/signIn`;
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
    const {message} = error.error;
    console.log(message);
    switch (message) {
      case 'Email is not valid':
        this.error$.next('Email is not valid');
        break;
      case 'Password is not valid':
        this.error$.next('Password is not valid');
        break;
      default:
        this.error$.next('Email or password is not valid');
    }

    return throwError(error);
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
