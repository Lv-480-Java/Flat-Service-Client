import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface LandlordUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  photoUrl: string;
}

export interface Landlord {
  id?: number;
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
  constructor(private http: HttpClient) {

  }

  addPassport(): Observable<Landlord[]> {
    return this.http.get<Landlord[]>('http://localhost:8080/passport');
  }

  addUserData(): Observable<LandlordUser[]> {
    return this.http.get<LandlordUser[]>('http://localhost:8080/user');
  }
  updatePassport(): Observable<Landlord> {
    const updatedLandlord: Landlord = {
      authority: '',
      birthDate: '',
      birthPlace: '',
      dateOfIssue: '',
      expirationDate: '',
      firstName: '',
      gender: false,
      identificationNumber: 0,
      lastName: '',
      middleName: '',
      nationality: '',
      passportNumber: '',
      passportType: false

    };
    return this.http.post<Landlord>('https://jsonplaceholder.typicode.com/todos', updatedLandlord);
  }
}
