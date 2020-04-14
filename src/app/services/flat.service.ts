import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {BASE_URL} from '../utils/constants';
import {RequestForBanFlat} from '../admin-panel/component/RequestForBanFlat';

@Injectable({
  providedIn: 'root'
})
export class FlatService {


  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  getAllPosts(pageNumber: number, pageSize: number, status: string) {
    return this.http.get<RequestForBanFlat[]>(
      BASE_URL + `admin/all/posts?page=${pageNumber}&size=${pageSize}&status=${status}`);
  }

  activatedPost(requestForBan: RequestForBanFlat): Observable<any> {
    return this.http.put<any>(BASE_URL + `admin/flat/activate`, requestForBan);
  }

  deactivatedPost(requestForBan: RequestForBanFlat): Observable<any> {
    return this.http.put<any>(BASE_URL + `admin/flat/deactivate`, requestForBan);
  }

  removePost(id: number): Observable<any> {
    return this.http.delete<any>(BASE_URL + `admin/flat/${id}`);
  }

  addFlatToFavoriteList(id: number): Observable<any> {
    return this.http.post(BASE_URL + `favorite/addToTheList`, id);
  }

  getFavoriteFlats(): Observable<any> {
    return this.http.get(BASE_URL + 'favorite/getFlats');
  }

  removeFlatFromFavoriteList(id: number): Observable<any> {
    return this.http.post(BASE_URL + 'favorite/deleteFromList', id);
  }
}
