import {BAD_REQUEST} from '../http-response-status';
import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {Router} from '@angular/router';
import {BASE_URL} from '../utils/constants';

interface NewTokenPair {
  accesstoken: string;
  refreshtoken: string;
}

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<NewTokenPair> = new BehaviorSubject<NewTokenPair>(null);
  private isRefreshing = false;
  private readonly updateAccessTokenUrl: string;
  private readonly applicationUrl: string;

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private router: Router) {
    this.applicationUrl = BASE_URL;
    this.updateAccessTokenUrl = BASE_URL + 'users/refreshTokens';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('signIn') || req.url.includes('refreshTokens')) {
      return next.handle(req);
    }
    if (this.localStorageService.getAccessToken()) {
      req = this.addAccessTokenToHeader(req, this.localStorageService.getAccessToken());
    }
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401 && this.localStorageService.getCurrentUser != null) {
        return this.handle401Error(req, next);
      } else {
        return throwError(error);
      }
    }));
  }

  addAccessTokenToHeader(req: HttpRequest<any>, accesstoken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `${accesstoken}`)
    });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.getNewTokenPair(this.localStorageService.getRefreshToken())
        .pipe(catchError((error: HttpErrorResponse) => this.handleRefreshTokenIsNotValid(error)),
          switchMap((res) => {
            this.localStorageService.setAccessToken(res.headers.get('accesstoken'));
            this.localStorageService.setRefreshToken(res.headers.get('refreshtoken'));
            this.isRefreshing = false;
            this.refreshTokenSubject.next(new class implements NewTokenPair {
              accesstoken: string = res.headers.get('accesstoken');
              refreshtoken: string = res.headers.get('refreshtoken');
            }());
            return next.handle(this.addAccessTokenToHeader(req, this.localStorageService.getAccessToken()));
          })
        );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((newTokenPair: NewTokenPair) => newTokenPair !== null),
        take(1),
        switchMap((newTokenPair: NewTokenPair) => next.handle(this.addAccessTokenToHeader(req, newTokenPair.accesstoken))),
        catchError(() => of<HttpEvent<any>>())
      );
    }
  }

  private handleRefreshTokenIsNotValid(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    this.isRefreshing = false;
    if (error.status === BAD_REQUEST) {
      this.localStorageService.clear();
      this.router.navigate(['login']).then(r => r);
      return of<HttpEvent<any>>();
    }
    return throwError(error);

  }

  private getNewTokenPair(refreshToken: string): Observable<any> {
    return this.http.get(`${this.updateAccessTokenUrl}?refreshToken=${refreshToken}`, {observe: 'response'});
  }
}
