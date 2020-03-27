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
    console.log("FlatService is running...")
    return this.http.post(BASE_URL + `favorite/addToTheList`, id);
  }
}
