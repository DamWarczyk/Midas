import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, map, Observable, pipe, throwError} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        this._snackBar.open(errorMsg, "OK")
        return throwError(errorMsg);
      })
    )
  }
}
