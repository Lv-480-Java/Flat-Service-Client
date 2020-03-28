import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  constructor(private http: HttpClient) {
  }

  addFlatToFavoriteList(id: number): Observable<any> {
    return this.http.post(BASE_URL + `favorite/addToTheList`, id);
  }

  getFavoriteFlats(): Observable<any> {
    return this.http.get(BASE_URL + 'favorite/getFlats');
  }

  removeFlatFromFavoriteList(id: number): Observable<any> {
    return this.http.post(BASE_URL + 'favorite/deleteFromList', id)
  }
}
