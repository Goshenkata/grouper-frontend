import {Injectable} from '@angular/core';
import {RegistrationForm} from "./registration/RegistrationForm";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginForm} from "./login/LoginForm";
import {LoginResponse} from "./login/LoginResponse";
import {RefreshPayload} from "./RefreshPayload";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data; charset=UTF-8'
    })
  };

  constructor(private http: HttpClient) {
  }

  registerUser(user: RegistrationForm): Observable<RegistrationForm> {
    return this.http.post<RegistrationForm>("http://localhost:8080/api/user/register", user, this.httpOptions)
  }


  login(model: LoginForm): Observable<LoginResponse> {
    let formData = new FormData();
    formData.append('username', model.username);
    formData.append('password', model.password);
    return this.http.post<LoginResponse>("http://localhost:8080/login", formData)
  }

  logout(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('expires_at')
  }

  isLoggedOut(): boolean {
    return Date.now() >= Number(localStorage.getItem('expires_at'));
  }

  isLoggedIn(): boolean {
    return !this.isLoggedOut();
  }

  refreshToken(token: string): Observable<RefreshPayload> {
    let httpRefreshHeader = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<RefreshPayload>("http://localhost:8080/api/user/refreshToken", httpRefreshHeader);
  }

  test(): String {
   let end: String = 'fail';
   this.http.get<String>("http://localhost:8080/api/user/test", this.httpOptions)
      .subscribe({next: v => {end = v}})
    console.log(end)
    return end;
  }
}
