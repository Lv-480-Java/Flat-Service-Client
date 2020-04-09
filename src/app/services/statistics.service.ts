import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../utils/constants';
import {User} from '../admin-panel/component/Users';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) {
  }

  countActiveFlats(): Observable<number> {
    const url = BASE_URL + 'admin/statistics/count-active-flats';
    return this.http.get<number>(url);
  }

  countActiveUsers(): Observable<number> {
    const url = BASE_URL + 'admin/statistics/count-active-users';
    return this.http.get<number>(url);
  }

  countActiveLandlords(): Observable<number> {
    const url = BASE_URL + 'admin/statistics/count-active-landlords';
    return this.http.get<number>(url);
  }

  getAllUsersCount(start, end): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + `admin/statistics/users-dynamics/${end}/${start}`);
  }

  getAllLandlordsCount(start, end): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + `admin/statistics/landlords-dynamics/${end}/${start}`);
  }

  getMonthNames(start, end): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + `admin/statistics/month-names/${end}/${start}`);
  }

  getUsersData(): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/users-landlords');
  }

  getFlatsData(): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/active-unactive-flats');
  }

  getCommentsData(): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + 'admin/statistics/count-comments');
  }

  countRegisteredUsersByDay(day: Date): Observable<number> {
    const url = BASE_URL + 'admin/statistics/count-registered-users';
    let params = new HttpParams();
    params = params.append('day', day.toLocaleDateString());
    return this.http.get<number>(url, {params});
  }

  countPostedFlatsByDay(day: Date): Observable<number> {
    const url = BASE_URL + 'admin/statistics/count-posted-flats';
    let params = new HttpParams();
    params = params.append('day', day.toLocaleDateString());
    return this.http.get<number>(url, {params});
  }

  getCountOfUserCommentsForWeek(days: number): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + `admin/statistics/user-comments-dynamics/${days}`);
  }

  getCountOfFlatCommentsForWeek(days: number): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + `admin/statistics/flat-comments-dynamics/${days}`);
  }

  countFlatsPostedBetween(start: Date, end: Date): Observable<number> {
    const url = BASE_URL + 'admin/statistics/count-posted-flats';

    let params = new HttpParams();
    params = params.append('start', start.toLocaleDateString());
    params = params.append('end', end.toLocaleDateString());

    return this.http.get<number>(url, {params});
  }

  countCommentsPostedBetween(start: Date, end: Date): Observable<number> {
    const url = BASE_URL + 'admin/statistics/count-posted-comments';

    let params = new HttpParams();
    params = params.append('start', start.toLocaleDateString());
    params = params.append('end', end.toLocaleDateString());

    return this.http.get<number>(url, {params});
  }

  getTopLandlords(num: number): Observable<Array<User>> {
    const url = BASE_URL + `admin/statistics/get-top-landlords?number=${num}`;
    console.log(url);
    return this.http.get<Array<User>>(url);
  }

  getFlatsOfLandlord(id: string): Observable<number> {
    const url = BASE_URL + `admin/statistics/get-flat-count-of-user?id=${id}`;
    console.log(url);
    return this.http.get<number>(url);
  }
}
