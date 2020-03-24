import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../utils/constants';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) {
  }

  countActiveFlats(): Observable<number> {
    return this.http.get<number>(BASE_URL + 'admin/statistics/active-flats');
  }

  countActiveUsers(): Observable<number> {
    return this.http.get<number>(BASE_URL + 'admin/statistics/active-users');
  }

  countActiveLandlords(): Observable<number> {
    return this.http.get<number>(BASE_URL + 'admin/statistics/active-landlords');
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

  getRegisteredUsersForWeek(days: number): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + `admin/statistics/user-registration-dynamics/${days}`);
  }

  getCreatedFlatsForWeek(days: number): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + `admin/statistics/flat-creation-dynamics/${days}`);
  }

  getCountOfUserCommentsForWeek(days: number): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + `admin/statistics/user-comments-dynamics/${days}`);
  }

  getCountOfFlatCommentsForWeek(days: number): Observable<Array<number>> {
    return this.http.get<Array<number>>(BASE_URL + `admin/statistics/flat-comments-dynamics/${days}`);
  }
}
