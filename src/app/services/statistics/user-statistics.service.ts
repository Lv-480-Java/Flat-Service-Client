import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../../utils/constants';
import {User} from '../../admin-panel/component/Users';

@Injectable({
  providedIn: 'root'
})
export class UserStatisticsService {

  constructor(private http: HttpClient) {
  }


  countActiveUsers(): Observable<number> {
    const url = BASE_URL + 'admin/user-statistics/count-active-users';
    return this.http.get<number>(url);
  }

  countActiveLandlords(): Observable<number> {
    const url = BASE_URL + 'admin/user-statistics/count-active-landlords';
    return this.http.get<number>(url);
  }

  getAllUsersCount(start, end): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + `admin/statistics/users-dynamics/${end}/${start}`);
  }

  getAllLandlordsCount(start, end): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + `admin/statistics/landlords-dynamics/${end}/${start}`);
  }

  getUsersData(): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/users-landlords');
  }

  countRegisteredUsersByDay(day: Date): Observable<number> {
    const url = BASE_URL + 'admin/user-statistics/count-registered-users';
    let params = new HttpParams();
    params = params.append('day', day.toLocaleDateString());
    return this.http.get<number>(url, {params});
  }
  getTopLandlords(num: number): Observable<Array<User>> {
    const url = BASE_URL + `admin/user-statistics/get-top-landlords?limit=${num}`;
    console.log(url);
    return this.http.get<Array<User>>(url);
  }

  getFlatsOfLandlord(id: string): Observable<number> {
    const url = BASE_URL + `admin/flat-statistics/get-flat-count-of-user?id=${id}`;
    console.log(url);
    return this.http.get<number>(url);
  }

}
