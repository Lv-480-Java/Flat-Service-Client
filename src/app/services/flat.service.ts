import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from "rxjs";
import {BASE_URL} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
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
