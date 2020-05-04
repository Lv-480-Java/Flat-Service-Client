import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';
import {catchError} from 'rxjs/operators';


export interface Landlord {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  birthDate: string;
  birthPlace: string;
  passportType: string;
  nationality: string;
  authority: string;
  dateOfIssue: string;
  expirationDate: string;
  passportNumber: string;
  identificationNumber: number;
}

@Injectable({providedIn: 'root'})
export class ProfileService {

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  public error$: Subject<string> = new Subject<string>();
  public ERROR_FIRSTNAME$: Subject<string> = new Subject<string>();
  public ERROR_LASTNAME$: Subject<string> = new Subject<string>();
  public ERROR_MIDDLENAME$: Subject<string> = new Subject<string>();
  public ERROR_GENDER$: Subject<string> = new Subject<string>();
  public ERROR_BIRTHDATE$: Subject<string> = new Subject<string>();
  public ERROR_BIRTHPLACE$: Subject<string> = new Subject<string>();
  public ERROR_PASSPORTYPE$: Subject<string> = new Subject<string>();
  public ERROR_NATIONALITY$: Subject<string> = new Subject<string>();
  public ERROR_AUTHORITY$: Subject<string> = new Subject<string>();
  public ERROR_DATEOFISSUE$: Subject<string> = new Subject<string>();
  public ERROR_EXPIRATIONDATE$: Subject<string> = new Subject<string>();
  public ERROR_PASSPORTNUMBER$: Subject<string> = new Subject<string>();
  public ERROR_IDENTIFICATIONNUMBER$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  addPassport(): Observable<Landlord> {
    return this.http.get<Landlord>(BASE_URL + 'passport/getPassport');
  }

  addUserInfo(): Observable<User> {
    return this.http.get<User>(BASE_URL + 'users/currentUser');
  }

  getPassportByUser(id: number): Observable<Landlord> {
    return this.http.get<Landlord>(BASE_URL + `passport/get-passport/${id}`);
  }

  getUserInfo(id: number): Observable<User> {
    return this.http.get<User>(BASE_URL + `users/getById/${id}`);
  }

  getUserId(): Observable<any> {
    return this.http.get<any>(BASE_URL + 'users/currentUserId');
  }

  updatePassport(data: Landlord): Observable<Landlord> {
    this.ERROR_FIRSTNAME$.next('');
    this.ERROR_LASTNAME$.next('');
    this.ERROR_MIDDLENAME$.next('');
    this.ERROR_GENDER$.next('');
    this.ERROR_BIRTHDATE$.next('');
    this.ERROR_BIRTHPLACE$.next('');
    this.ERROR_PASSPORTYPE$.next('');
    this.ERROR_NATIONALITY$.next('');
    this.ERROR_AUTHORITY$.next('');
    this.ERROR_DATEOFISSUE$.next('');
    this.ERROR_EXPIRATIONDATE$.next('');
    this.ERROR_PASSPORTNUMBER$.next('');
    this.ERROR_IDENTIFICATIONNUMBER$.next('');

    return this.http.post<Landlord>(BASE_URL + 'passport/update', JSON.stringify(data), this.options)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log('Registration is working...');
    const {message} = error.error;
    console.log(message);
    if (message instanceof Object) {
      if (message.firstName !== undefined) {
        this.ERROR_FIRSTNAME$.next('Please input first name');
      }
      if (message.lastName !== undefined) {
        this.ERROR_LASTNAME$.next('Please input last name');
      }
      if (message.middleName !== undefined) {
        this.ERROR_MIDDLENAME$.next('Please input middle name');
      }
      if (message.gender !== undefined) {
        this.ERROR_GENDER$.next('Please input gender');
      }
      if (message.birthDate !== undefined) {
        this.ERROR_BIRTHDATE$.next('Please input birth date');
      }
      if (message.birthPlace !== undefined) {
        this.ERROR_BIRTHPLACE$.next('Please input birth place');
      }
      if (message.passportType !== undefined) {
        this.ERROR_PASSPORTYPE$.next('Please input passport type');
      }
      if (message.nationality !== undefined) {
        this.ERROR_NATIONALITY$.next('Please input nationality');
      }
      if (message.authority !== undefined) {
        this.ERROR_AUTHORITY$.next('Please input authority');
      }
      if (message.dateOfIssue !== undefined) {
        this.ERROR_DATEOFISSUE$.next('Please input date of issue');
      }
      if (message.expirationDate !== undefined) {
        this.ERROR_EXPIRATIONDATE$.next('Please input expiration date');
      }
      if (message.identificationNumber !== undefined) {
        this.ERROR_IDENTIFICATIONNUMBER$.next('Please input identification number');
      }
      if (message.passportNumber !== undefined) {
        this.ERROR_PASSPORTNUMBER$.next('Please input passport number');
      }
    } else {
      this.error$.next(message);
    }
  }
}
