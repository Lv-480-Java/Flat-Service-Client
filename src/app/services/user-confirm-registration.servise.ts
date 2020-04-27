import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BASE_URL} from '../utils/constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserConfirmRegistrationService {
  constant: string;
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) {
    this.constant = BASE_URL;
  }

  public activate(tokenRequest: string) {
    console.log(this.constant + 'users/confirmRegistration/' + tokenRequest);
    return this.http.get(this.constant + 'users/confirmRegistration/' + tokenRequest)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error;
    console.log(error);
    this.openSnackBar(message, 'X');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }
}
