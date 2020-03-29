import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private bar: MatSnackBar) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log("Interceptor is working...");
          if (error.error.message == "Runtime exception") {
            this.bar.open("Ops! Something went wrong...", "Ok",
              {
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['snackbar']
              });
          } else {
            return throwError(error);
          }
        })
      )
  }
}
