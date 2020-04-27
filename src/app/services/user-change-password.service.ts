import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BASE_URL} from '../utils/constants';
import {Observable, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserChangePasswordService {
  constant: string;
  public error$: Subject<string> = new Subject<string>();
  public errorPassword$: Subject<string> = new Subject<string>();
  public errorNewPassword$: Subject<string> = new Subject<string>();
  public errorConfirmNewPassword$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
    this.constant = BASE_URL;
  }

  public changePassword(userChangePassword): Observable<any> {
    return this.http.post(this.constant + 'users/changePassword', userChangePassword, {observe: 'response'})
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse) {
    console.log('Registration is working...');
    const {message} = error.error;
    console.log(error);
    if (message instanceof Object) {
      if (message.password !== undefined) {
        this.errorPassword$.next(message.password);
      }
      if (message.newPassword !== undefined) {
        this.errorNewPassword$.next(message.newPassword);
      }
      if (message.confirmNewPassword !== undefined) {
        this.errorConfirmNewPassword$.next(message.confirmNewPassword);
      }
    } else {
      this.error$.next(message);
    }
  }
}
