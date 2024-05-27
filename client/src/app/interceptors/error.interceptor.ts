// src/app/interceptors/error.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMsg = `Client-side error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMsg = `Bad Request: ${error.message}`;
              break;
            case 401:
              errorMsg = `Unauthorized: ${error.status}`;
              break;
            case 403:
              errorMsg = `Forbidden: ${error.message}`;
              break;
            case 404:
              errorMsg = `Not Found: ${error.message}`;
              break;
            case 500:
              errorMsg = `Internal Server Error: ${error.message}`;
              break;
            default:
              errorMsg = `Unexpected Error: ${error.message}`;
              break;
          }
        }
        this.toastr.error(errorMsg, 'Error', { timeOut: 3000 });
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
