import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ApiErrorResponse } from '../interfaces/libs/api.interface';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 400:
              return this.handleBadRequestError(request, error, next);
            case 401:
              console.error('세션이 만료되었습니다\n 다시 로그인해주세요');
              return this.handleUnAuthError(request, error, next);
            case 409:
              return this.handleConflictError(request, error, next);
            case 500:
              return this.handleInternalServerError(request, error, next);
          }
        }
        return throwError(error);
      }),
      catchError((error) => {
        if (!(error instanceof HttpErrorResponse)) {
          return throwError(error);
        }
        const response = new HttpResponse({
          status: error.status,
          url: error.url || undefined,
          body: error.error,
          headers: error.headers,
          statusText: error.statusText,
        });
        return of(response);
      })
    );
  }

  handleUnAuthError(req: HttpRequest<unknown>, error: HttpErrorResponse, next: HttpHandler): Observable<never> {
    const errorResponse: ApiErrorResponse = error.error;
    return throwError(() => {
      return { ...error, result: errorResponse };
    });
  }

  handleBadRequestError(req: HttpRequest<unknown>, error: HttpErrorResponse, next: HttpHandler): Observable<never> {
    const errorResponse: ApiErrorResponse = error.error;
    return throwError(() => {
      return { ...error, result: errorResponse };
    });
  }

  handleConflictError(req: HttpRequest<unknown>, error: HttpErrorResponse, next: HttpHandler): Observable<never> {
    const errorResponse: ApiErrorResponse = error.error;
    return throwError(() => {
      return { ...error, result: errorResponse };
    });
  }

  handleInternalServerError(req: HttpRequest<unknown>, error: HttpErrorResponse, next: HttpHandler): Observable<never> {
    const errorResponse: ApiErrorResponse = error.error;
    return throwError(() => {
      return { ...error, result: errorResponse };
    });
  }
}
