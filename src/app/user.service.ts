import { Injectable } from '@angular/core';
import {RegistrationForm} from "./registration/RegistrationForm";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  registerUser(user: RegistrationForm): Observable<RegistrationForm> {
    return this.http.post<RegistrationForm>("http://localhost:8080/api/user/register", user,this.httpOptions)
  }

}
