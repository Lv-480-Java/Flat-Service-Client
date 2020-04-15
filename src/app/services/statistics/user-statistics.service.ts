import {Injectable} from '@angular/core';
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

  countActiveModerators(): Observable<number> {
    const url = BASE_URL + 'admin/user-statistics/count-active-moderators';
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

  countRegisteredRentersBeforeMonth(day: Date): Observable<number> {
    const url = BASE_URL + 'admin/user-statistics/count-registered-renters-before-month';
    let params = new HttpParams();
    params = params.append('month', day.toLocaleDateString());
    return this.http.get<number>(url, {params});
  }

  countRegisteredLandlordsBeforeMonth(day: Date): Observable<number> {
    const url = BASE_URL + 'admin/user-statistics/count-registered-landlords-before-month';
    let params = new HttpParams();
    params = params.append('month', day.toLocaleDateString());
    return this.http.get<number>(url, {params});
  }

  countRegisteredUsersByDay(day: Date): Observable<number> {
    const url = BASE_URL + 'admin/user-statistics/count-registered-users-on-day';
    let params = new HttpParams();
    params = params.append('day', day.toLocaleDateString());
    return this.http.get<number>(url, {params});
  }

  getTopLandlords(num: number): Observable<Array<User>> {
    const url = BASE_URL + `admin/user-statistics/get-top-landlords?limit=${num}`;
    console.log(url);
    return this.http.get<Array<User>>(url);
  }

  countUsersRegisteredBetween(start, end) {

    const url = BASE_URL + 'admin/user-statistics/count-users-registered-between-dates';

    let params = new HttpParams();
    params = params.append('start', start.toLocaleDateString());
    params = params.append('end', end.toLocaleDateString());

    return this.http.get<number>(url, {params});
  }
}
