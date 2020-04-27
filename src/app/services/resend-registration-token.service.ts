import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BASE_URL} from '../utils/constants';
import {ActivationEmail} from '../model/activation-email';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResendRegistrationTokenService {
  constant: string = BASE_URL;
  public error$: Subject<string> = new Subject<string>();
  public error_email$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) {
  }

  public activate(model: ActivationEmail) {
    return this.http.get(this.constant + 'users/resendRegistrationToken/' + model.email)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error;
    console.log(error);
    if (message instanceof Object) {
      if (message.email !== undefined) {
        this.error_email$.next(message.email);
      }
    } else {
      this.error$.next(message);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }
}
