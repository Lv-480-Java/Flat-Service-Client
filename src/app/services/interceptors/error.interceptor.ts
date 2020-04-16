import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
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
        catchError((error: HttpErrorResponse) => {
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
