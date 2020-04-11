import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RequestsForFlatVerification} from '../admin-panel/requests/entity/requests-for-flat-verification';
import {Observable} from 'rxjs';
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

  getAllPosts(pageNumber: number, pageSize: number) {
    return this.http.get<RequestsForFlatVerification[]>(
      BASE_URL + `requests/posts/flats?page=${pageNumber}&size=${pageSize}`);
  }

  reviewPost(id: number) {
    return this.http.put<RequestsForFlatVerification>(BASE_URL + `requests/review/flat/${id}`, null);
  }

  activatedPost(id: number): Observable<RequestsForFlatVerification> {
    const url = BASE_URL + `requests/flats/${id}/deactivate`;
    console.log(url);
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  deactivatedPost(id: number): Observable<RequestsForFlatVerification> {
    const url = BASE_URL + `requests/flats/${id}/deactivate`;
    console.log(url);
    return this.http.put<RequestsForFlatVerification>(url, null);
  }

  removePost(id: string): Observable<any> {
    return this.http.delete<any>(BASE_URL + `users/delete/${id}`);
  }
}
