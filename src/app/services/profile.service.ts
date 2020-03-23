import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../admin-panel/component/Users';
import {BASE_URL} from '../utils/constants';

export interface Landlord {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: boolean;
  birthDate: string;
  birthPlace: string;
  passportType: boolean;
  nationality: string;
  authority: string;
  dateOfIssue: string;
  expirationDate: string;
  passportNumber: string;
  identificationNumber: number;

}

@Injectable({providedIn: 'root'})
export class ProfileService {
  id = JSON.parse(localStorage.getItem('user')).userId;
  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  constructor(private http: HttpClient) {
  }

  addPassport(): Observable<Landlord> {
    return this.http.get<Landlord>(BASE_URL + 'passport/' + this.id);
  }

  addUserInfo(): Observable<User> {
    return this.http.get<User>(BASE_URL + 'users/' + this.id);
  }

  updatePassport(data: Landlord): Observable<Landlord> {
    return this.http.post<Landlord>(BASE_URL + 'passport/' + this.id, JSON.stringify(data), this.options);

  }
}
