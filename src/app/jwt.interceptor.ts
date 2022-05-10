import {HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';


import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {UserService} from "./user.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private userService: UserService,
              private toastr: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;
    const token = localStorage.getItem('access_token')
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('login') && error.status === 401) {
        return this.handle401Error(authReq, next);
      }

      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = localStorage.getItem('refresh_token')
      if (this.userService.isLoggedOut()) {
        //refresh token
        let refreshToken = localStorage.getItem('refresh_token')
        // @ts-ignore
        this.userService.refreshToken(refreshToken)
          .subscribe({
            next: res => {
              localStorage.setItem('refresh_token', res.refresh_token)
              localStorage.setItem('access_token', res.access_token)
              console.log('token refreshed')
              return next.handle(this.addTokenHeader(request, res.access_token));
            },
            error: err => console.log(err.error)
          })

      } else {
        //no access
        console.log('Permission denied')
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set("Authorization",
        "Bearer " + token)
    });
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
];
