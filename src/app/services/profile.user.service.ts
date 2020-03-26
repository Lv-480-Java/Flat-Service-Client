import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';
import {Landlord} from './profile.service';
import {catchError} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ProfileUserService {
  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  public error$: Subject<string> = new Subject<string>();
  public ERROR_USERNAME$: Subject<string> = new Subject<string>();
  public ERROR_PHONE$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  addUserData(): Observable<User> {
    return this.http.get<User>(BASE_URL + 'users/currentUser');
  }

  updateUserData(userData: User): Observable<User> {
    return this.http.put<User>(BASE_URL + 'users/update/all', JSON.stringify(userData), this.options)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  evaluateToLandlord(dataLand: User): Observable<User> {
    return this.http.post<User>(BASE_URL + 'passport/landlord', JSON.stringify(dataLand), this.options);
  }

  addPassport(): Observable<Landlord> {
    return this.http.get<Landlord>(BASE_URL + 'passport/getPassport');
  }

  private handleError(error: HttpErrorResponse) {
    console.log('Registration is working...');
    const {message} = error.error;
    console.log(error);
    if (message instanceof Object) {
      if (message.username !== undefined) {
        this.ERROR_USERNAME$.next('Please input nick name');
      }
      if (message.phoneNumber !== undefined) {
        this.ERROR_PHONE$.next('Please input correct phone number');
      }
    } else {
      this.error$.next(message);
    }

  }
}
