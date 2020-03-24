import {BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED} from '../http-response-status';
import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {Router} from '@angular/router';
import {BASE_URL} from '../utils/constants';

interface NewTokenPair {
  accessToken: string;
  refreshToken: string;
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

  /**
   * Intercepts all HTTP requests, adds access token to authentication header (except authentication requests),
   * intercepts 401, 403, and 404 error responses.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('signIn') || req.url.includes('Tokens')) {
      return next.handle(req);
    }
    if (this.localStorageService.getAccessToken()) {
      req = this.addAccessTokenToHeader(req, this.localStorageService.getAccessToken());
    }
    // if (!this.localStorageService.getRefreshToken()) {
    //   this.router.navigate(['login']);
    //   return of<HttpEvent<any>>()
    // }
    return next.handle(req);
  }

  /**
   * Handles 401 response. It tries to get new access/refresh token pair with refresh token.
   * All of the rest request are put on hold.
   */
  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.getNewTokenPair(this.localStorageService.getRefreshToken()).pipe(
        catchError((error: HttpErrorResponse) => this.handleRefreshTokenIsNotValid(error)),
        switchMap((newTokenPair: NewTokenPair) => {
          this.localStorageService.setAccessToken(newTokenPair.accessToken);
          this.localStorageService.setRefreshToken(newTokenPair.refreshToken);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(newTokenPair);
          return next.handle(this.addAccessTokenToHeader(req, newTokenPair.accessToken));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((newTokenPair: NewTokenPair) => newTokenPair !== null),
        take(1),
        switchMap((newTokenPair: NewTokenPair) => next.handle(this.addAccessTokenToHeader(req, newTokenPair.accessToken))),
        catchError(() => of<HttpEvent<any>>())
      );
    }
  }

  /**
   * Handles a situation when refresh token is expired.
   */
  private handleRefreshTokenIsNotValid(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    this.isRefreshing = false;
    if (error.status === BAD_REQUEST) {
      this.localStorageService.clear();
      this.router.navigate(['login']).then(r => r);
      return of<HttpEvent<any>>();
    }
    return throwError(error);

  }

  /**
   * Send refresh token in order to get new access/refresh token pair.
   */
  private getNewTokenPair(refreshToken: string): Observable<NewTokenPair> {
    return this.http.get<NewTokenPair>(`${this.updateAccessTokenUrl}`);
  }

  /**
   * Adds access token to authentication header.
   */
  addAccessTokenToHeader(req: HttpRequest<any>, accessToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `${accessToken}`)
    });
  }

  // /**
  //  * Handles 403 HTTP error response, redirects to sign in page.
  //  */
  // private handle403Error(req: HttpRequest<any>): Observable<HttpEvent<any>> {
  //   console.log(`You don't have authorities to access ${req.url}`);
  //   this.router.navigate(['login']).then(r => r);
  //   return of<HttpEvent<any>>();
  // }
  //
  // /**
  //  * Handles 404 HTTP error response, redirects to custom error page.
  //  */
  // private handle404Error(req: HttpRequest<any>): Observable<HttpEvent<any>> {
  //   console.log(`Page does not exist ${req.url}`);
  //   this.router.navigate(['login']).then(r => r);
  //   return of<HttpEvent<any>>();
  // }
}
