import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {StatsDto} from "./statistics/stats-dto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(
    public http: HttpClient
  ) { }

  getStats(): Observable<StatsDto> {
    return this.http.get<StatsDto>('http://localhost:8080/stats');
  }
}
