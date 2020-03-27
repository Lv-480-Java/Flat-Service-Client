import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BASE_URL} from '../utils/constants';
import {Observable, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  url = BASE_URL + 'users/create';
  public error$: Subject<string> = new Subject<string>();
  public error_username$: Subject<string> = new Subject<string>();
  public error_email$: Subject<string> = new Subject<string>();
  public error_phone$: Subject<string> = new Subject<string>();
  public error_password$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  register(userData): Observable<any> {
    return this.http.post(this.url, userData, {observe: 'response'})
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log('Registration is working...');
    const {message} = error.error;
    console.log(error);
    if (message instanceof Object) {
      if (message.username !== undefined) {
        this.error_username$.next(message.username);
      }

      if (message.email !== undefined) {
        this.error_email$.next(message.email);
      }

      if (message.phone !== undefined) {
        this.error_phone$.next(message.phone);
      }

      if (message.password !== undefined) {
        this.error_password$.next(message.password);
      }
    } else {
      this.error$.next(message);
    }

  }
}
