import {Injectable} from '@angular/core';
import {BASE_URL} from '../../utils/constants';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentStatitsticsService {


  constructor(private http: HttpClient) {
  }

  countCommentsPostedBetween(start: Date, end: Date): Observable<number> {
    const url = BASE_URL + 'admin/comment-statistics/count-posted-comments';

    let params = new HttpParams();
    params = params.append('start', start.toLocaleDateString());
    params = params.append('end', end.toLocaleDateString());

    return this.http.get<number>(url, {params});
  }

  countUserCommentsPostedBeforeMonth(day: Date): Observable<number> {
    const url = BASE_URL + 'admin/comment-statistics/count-user-comments-posted-before-month';
    let params = new HttpParams();
    params = params.append('month', day.toLocaleDateString());
    return this.http.get<number>(url, {params});
  }

  countFLatCommentsPostedBeforeMonth(day: Date): Observable<number> {
    const url = BASE_URL + 'admin/comment-statistics/count-flat-comments-posted-before-month';
    let params = new HttpParams();
    params = params.append('month', day.toLocaleDateString());
    return this.http.get<number>(url, {params});
  }

  countUserCommnets(): Observable<number> {
    const url = BASE_URL + 'admin/comment-statistics/count-user-comments';
    return this.http.get<number>(url);
  }

  countFlatCommnets(): Observable<number> {
    const url = BASE_URL + 'admin/comment-statistics/count-flat-comments';
    return this.http.get<number>(url);
  }

}
