import {HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';


import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {UserService} from "./user.service";
import {ToastrService} from "ngx-toastr";
import {Router, Routes} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;
    const token = localStorage.getItem('access_token')
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(catchError(err => {
      if (!authReq.url.includes('/login') && (err.status == 401 || err.status == 403)) {
        return this.handle401Error(authReq, next);
      }

      return throwError(err);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      let refreshToken = localStorage.getItem('refresh_token');

      if (this.userService.isLoggedOut()) {
        //refresh token

        if (refreshToken == null) {
          this.router.navigateByUrl('/login');
          return next.handle(request);
        }
        localStorage.removeItem('access_token')
        this.userService.refreshToken(refreshToken)
          .subscribe({
            next: res => {
              localStorage.setItem('refresh_token', res.refresh_token)
              localStorage.setItem('access_token', res.access_token)
              localStorage.setItem('role', res.role.toString())
              localStorage.setItem('expires_at', res.expires_at.toString())
              localStorage.setItem('username', res.username)
              console.log('token refreshed')
              return next.handle(this.addTokenHeader(request, res.access_token));
            },
            error: err => console.log(err.error)
          })

      } else {
        this.router.navigateByUrl('/login');
        return next.handle(request);
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
